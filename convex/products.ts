import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all products
export const list = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.category !== undefined) {
      return await ctx.db
        .query("products")
        .withIndex("by_category", (q) => q.eq("category", args.category as string))
        .filter((q) => q.eq(q.field("isActive"), true))
        .collect();
    }
    return await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Get product by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Create product
export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    category: v.string(),
    subcategory: v.optional(v.string()),
    description: v.string(),
    basePrice: v.number(),
    minQuantity: v.number(),
    image: v.optional(v.string()),
    paperOptions: v.array(v.object({
      name: v.string(),
      gsm: v.number(),
      priceMultiplier: v.number()
    })),
    sizeOptions: v.array(v.object({
      name: v.string(),
      width: v.number(),
      height: v.number(),
      unit: v.string(),
      priceMultiplier: v.number()
    })),
    finishOptions: v.array(v.string()),
    turnaroundDays: v.array(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", {
      ...args,
      isActive: true,
    });
  },
});

// Get categories summary
export const getCategories = query({
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    const categories = new Map<string, number>();
    products.forEach((p) => {
      const count = categories.get(p.category) || 0;
      categories.set(p.category, count + 1);
    });
    return Array.from(categories.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  },
});
