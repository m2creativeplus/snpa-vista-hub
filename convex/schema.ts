import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Product Catalog
  products: defineTable({
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
    isActive: v.boolean(),
  }).index("by_category", ["category"])
    .index("by_slug", ["slug"]),

  // Clients
  clients: defineTable({
    name: v.string(),
    code: v.string(),
    type: v.union(v.literal("government"), v.literal("private"), v.literal("ngo")),
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
    address: v.optional(v.string()),
    ministry: v.optional(v.string()),
    creditLimit: v.optional(v.number()),
    balance: v.number(),
    isActive: v.boolean(),
  }).index("by_code", ["code"])
    .index("by_type", ["type"]),

  // Print Jobs (Core Operations)
  printJobs: defineTable({
    jobNumber: v.string(), // SNPA-PAP-XX-XXX format
    clientId: v.id("clients"),
    productId: v.id("products"),
    jobName: v.string(),
    quantity: v.number(),
    paperType: v.string(),
    paperGsm: v.number(),
    color: v.union(v.literal("CMYK"), v.literal("BW"), v.literal("Spot")),
    size: v.string(),
    finish: v.optional(v.string()),
    priority: v.union(v.literal("High"), v.literal("Medium"), v.literal("Low")),
    status: v.union(
      v.literal("Pending"),
      v.literal("In Progress"),
      v.literal("Pre-Press"),
      v.literal("Printing"),
      v.literal("Post-Press"),
      v.literal("Quality Check"),
      v.literal("Completed"),
      v.literal("Delivered")
    ),
    estimatedCost: v.number(),
    actualCost: v.optional(v.number()),
    deadline: v.string(),
    fileUrl: v.optional(v.string()),
    notes: v.optional(v.string()),
    assignedTo: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_status", ["status"])
    .index("by_client", ["clientId"])
    .index("by_priority", ["priority"])
    .index("by_jobNumber", ["jobNumber"]),

  // Quality Control - ISO Compliance
  qualityChecks: defineTable({
    printJobId: v.id("printJobs"),
    checkType: v.union(
      v.literal("ISO_9001"),
      v.literal("ISO_12647"),
      v.literal("ISO_14001"),
      v.literal("Color_Calibration"),
      v.literal("Paper_Quality"),
      v.literal("Final_Inspection")
    ),
    score: v.number(), // 0-100
    target: v.number(),
    status: v.union(v.literal("Pass"), v.literal("Fail"), v.literal("Pending")),
    inspector: v.string(),
    notes: v.optional(v.string()),
    timestamp: v.number(),
  }).index("by_job", ["printJobId"])
    .index("by_type", ["checkType"]),

  // Press Color Logs
  pressColorLogs: defineTable({
    printJobId: v.optional(v.id("printJobs")),
    pressNumber: v.number(),
    inkColor: v.union(v.literal("Cyan"), v.literal("Magenta"), v.literal("Yellow"), v.literal("Black")),
    deltaE: v.number(), // Color difference value
    status: v.union(v.literal("Pass"), v.literal("Fail")),
    timestamp: v.number(),
    operator: v.string(),
  }).index("by_job", ["printJobId"])
    .index("by_press", ["pressNumber"]),

  // Ink & Materials Inventory
  inkInventory: defineTable({
    color: v.union(v.literal("Cyan"), v.literal("Magenta"), v.literal("Yellow"), v.literal("Black"), v.literal("Spot")),
    spotColorName: v.optional(v.string()),
    currentLevel: v.number(), // percentage
    reorderLevel: v.number(),
    supplier: v.string(),
    lastRefilled: v.number(),
    unitCost: v.number(),
  }).index("by_color", ["color"]),

  paperInventory: defineTable({
    name: v.string(),
    gsm: v.number(),
    size: v.string(),
    quantity: v.number(), // sheets
    reorderLevel: v.number(),
    unitCost: v.number(),
    supplier: v.string(),
  }).index("by_gsm", ["gsm"]),

  // Packaging Module
  packagingOrders: defineTable({
    printJobId: v.optional(v.id("printJobs")),
    boxSize: v.union(v.literal("Small"), v.literal("Medium"), v.literal("Large"), v.literal("Custom")),
    dimensions: v.object({
      length: v.number(),
      width: v.number(),
      height: v.number(),
    }),
    quantity: v.number(),
    labelDesignUrl: v.optional(v.string()),
    status: v.union(v.literal("Pending"), v.literal("InProgress"), v.literal("Completed")),
    createdAt: v.number(),
  }).index("by_status", ["status"]),

  // Pricing Templates
  pricingTemplates: defineTable({
    productId: v.id("products"),
    name: v.string(),
    quantityBreaks: v.array(v.object({
      minQty: v.number(),
      maxQty: v.number(),
      pricePerUnit: v.number()
    })),
    rushMultiplier: v.number(),
    isActive: v.boolean(),
  }).index("by_product", ["productId"]),

  // Audit Log for ISO compliance
  auditLog: defineTable({
    action: v.string(),
    entityType: v.string(),
    entityId: v.string(),
    userId: v.string(),
    details: v.optional(v.string()),
    timestamp: v.number(),
  }).index("by_entity", ["entityType", "entityId"])
    .index("by_timestamp", ["timestamp"]),

  // ISBN Portal - Pre-registrations and Full Registrations
  isbnRegistrations: defineTable({
    bookTitle: v.string(),
    authorName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    language: v.union(v.literal("Somali"), v.literal("English"), v.literal("Arabic"), v.literal("Other")),
    genre: v.optional(v.string()),
    expectedPublishDate: v.optional(v.string()),
    status: v.union(
      v.literal("pre_registered"),
      v.literal("pending_payment"),
      v.literal("paid"),
      v.literal("isbn_assigned"),
      v.literal("published")
    ),
    isbn: v.optional(v.string()), // Assigned after payment
    preRegistrationCode: v.string(), // Temporary code
    paymentMethod: v.optional(v.union(v.literal("zaad"), v.literal("edahab"), v.literal("bank"), v.literal("cash"))),
    paymentReference: v.optional(v.string()),
    amountPaid: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_isbn", ["isbn"])
    .index("by_preRegistrationCode", ["preRegistrationCode"]),

  // ISBN Search Analytics - Track what users search for
  isbnSearches: defineTable({
    query: v.string(),
    resultType: v.union(v.literal("available"), v.literal("taken"), v.literal("error")),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    convertedToRegistration: v.boolean(),
    timestamp: v.number(),
  }).index("by_query", ["query"])
    .index("by_timestamp", ["timestamp"]),

  // ISBN Catalog - Published books with assigned ISBNs
  isbnCatalog: defineTable({
    isbn: v.string(),
    registrationId: v.id("isbnRegistrations"),
    title: v.string(),
    author: v.string(),
    publisher: v.string(),
    language: v.string(),
    pages: v.optional(v.number()),
    bindingType: v.optional(v.string()),
    publicationDate: v.string(),
    isActive: v.boolean(),
    createdAt: v.number(),
  }).index("by_isbn", ["isbn"])
    .index("by_author", ["author"])
    .index("by_title", ["title"]),
});
