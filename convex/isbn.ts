import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Generate a unique pre-registration code
function generatePreRegCode(): string {
  const prefix = "SNPA-ISBN";
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${year}-${random}`;
}

// Generate ISBN (Somaliland prefix: 978-99970)
function generateISBN(): string {
  const prefix = "978-99970"; // Somaliland ISBN prefix
  const publisher = "0"; // SNPA publisher code
  const title = Math.floor(10000 + Math.random() * 89999).toString();
  
  // Calculate check digit (ISBN-13)
  const digits = `${prefix}${publisher}${title}`.replace(/-/g, "");
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits[i]) * (i % 2 === 0 ? 1 : 3);
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  
  return `${prefix}-${publisher}-${title}-${checkDigit}`;
}

// Pre-register a book title (FREE - lead capture)
export const preRegister = mutation({
  args: {
    bookTitle: v.string(),
    authorName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    language: v.optional(v.union(v.literal("Somali"), v.literal("English"), v.literal("Arabic"), v.literal("Other"))),
    genre: v.optional(v.string()),
    expectedPublishDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const preRegistrationCode = generatePreRegCode();
    const now = Date.now();

    const id = await ctx.db.insert("isbnRegistrations", {
      bookTitle: args.bookTitle,
      authorName: args.authorName,
      email: args.email,
      phone: args.phone,
      language: args.language || "Somali",
      genre: args.genre,
      expectedPublishDate: args.expectedPublishDate,
      status: "pre_registered",
      preRegistrationCode,
      createdAt: now,
      updatedAt: now,
    });

    return {
      id,
      preRegistrationCode,
      message: "Pre-registration successful! Check your email for your temporary certificate.",
    };
  },
});

// Search for existing ISBNs or check title availability
export const searchISBN = mutation({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const query = args.query.toLowerCase().trim();
    
    // Check if ISBN exists in catalog
    const existingISBN = await ctx.db
      .query("isbnCatalog")
      .filter((q) => q.eq(q.field("isbn"), query))
      .first();

    if (existingISBN) {
      await logSearch(ctx, args.query, "taken");
      return {
        available: false,
        type: "isbn_found",
        data: existingISBN,
      };
    }

    // Check if title is already registered
    const existingTitle = await ctx.db
      .query("isbnRegistrations")
      .filter((q) => q.eq(q.field("bookTitle"), query))
      .first();

    if (existingTitle) {
      await logSearch(ctx, args.query, "taken");
      return {
        available: false,
        type: "title_registered",
        status: existingTitle.status,
      };
    }

    // Title is available
    await logSearch(ctx, args.query, "available");
    return {
      available: true,
      type: "available",
      message: "This title is available for registration!",
    };
  },
});

// Helper to log searches for analytics
async function logSearch(ctx: any, query: string, resultType: "available" | "taken" | "error") {
  await ctx.db.insert("isbnSearches", {
    query,
    resultType,
    convertedToRegistration: false,
    timestamp: Date.now(),
  });
}

// Process payment and assign ISBN
export const processPayment = mutation({
  args: {
    registrationId: v.id("isbnRegistrations"),
    paymentMethod: v.union(v.literal("zaad"), v.literal("edahab"), v.literal("bank"), v.literal("cash")),
    paymentReference: v.string(),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const registration = await ctx.db.get(args.registrationId);
    if (!registration) {
      throw new Error("Registration not found");
    }

    // Generate ISBN
    const isbn = generateISBN();
    const now = Date.now();

    // Update registration with payment and ISBN
    await ctx.db.patch(args.registrationId, {
      status: "isbn_assigned",
      isbn,
      paymentMethod: args.paymentMethod,
      paymentReference: args.paymentReference,
      amountPaid: args.amount,
      updatedAt: now,
    });

    return {
      isbn,
      message: "Payment processed! Your ISBN has been assigned.",
    };
  },
});

// Get all registrations (admin)
export const listRegistrations = query({
  args: {
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("isbnRegistrations")
        .filter((q) => q.eq(q.field("status"), args.status))
        .order("desc")
        .collect();
    }
    return await ctx.db
      .query("isbnRegistrations")
      .order("desc")
      .collect();
  },
});

// Get registration by code
export const getByCode = query({
  args: {
    code: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("isbnRegistrations")
      .withIndex("by_preRegistrationCode", (q) => q.eq("preRegistrationCode", args.code))
      .first();
  },
});

// Get search analytics (admin)
export const getSearchAnalytics = query({
  handler: async (ctx) => {
    const searches = await ctx.db
      .query("isbnSearches")
      .order("desc")
      .take(100);

    const available = searches.filter(s => s.resultType === "available").length;
    const taken = searches.filter(s => s.resultType === "taken").length;

    return {
      totalSearches: searches.length,
      available,
      taken,
      conversionRate: searches.length > 0 
        ? searches.filter(s => s.convertedToRegistration).length / searches.length 
        : 0,
      recentSearches: searches.slice(0, 10),
    };
  },
});

// Get ISBN catalog (public)
export const getCatalog = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("isbnCatalog")
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .take(args.limit || 50);
  },
});
