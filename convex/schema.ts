import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users (RBAC)
  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("approver"), v.literal("requestor")),
    ministryId: v.optional(v.string()), // Link to ministry table
    tokenIdentifier: v.string(), // Clerk/Auth Identity
  }).index("by_token", ["tokenIdentifier"]),

  // Government Entities
  ministries: defineTable({
    name: v.string(),     // e.g. "Ministry of Health"
    code: v.string(),     // e.g. "MoH"
    budgetLimit: v.number(), // Annual Allocation
    budgetSpent: v.number(), // Real-time Spend
    budgetFrozen: v.number(), // Pending Approvals
    logoUrl: v.optional(v.string()),
  }),

  // Orders (Requisitions)
  requisitions: defineTable({
    ministryId: v.id("ministries"),
    userId: v.id("users"),
    items: v.array(v.object({
      name: v.string(),
      quantity: v.number(),
      unitPrice: v.number(),
      total: v.number(),
    })),
    totalAmount: v.number(),
    status: v.union(
      v.literal("pending_approval"), 
      v.literal("approved"), 
      v.literal("rejected"), 
      v.literal("in_production"),
      v.literal("delivered")
    ),
    rejectionReason: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_ministry", ["ministryId"]),

  // Security Scoring Engine
  security_audits: defineTable({
    userId: v.id("users"),
    fileName: v.string(),
    score: v.number(), // 0-100
    level: v.string(), // "Critical", "High", "Medium", "Low"
    missingFeatures: v.array(v.string()), // ["Watermark", "UV Ink"]
    createdAt: v.number(),
  }),
  // Products Module
  products: defineTable({
    name: v.string(),
    slug: v.string(),
    category: v.string(),
    basePrice: v.number(),
    minQuantity: v.number(),
    description: v.string(),
    isActive: v.boolean(),
    // Flexible fields for options
    subcategory: v.optional(v.string()),
    image: v.optional(v.string()),
    paperOptions: v.any(),
    sizeOptions: v.any(),
    finishOptions: v.any(),
    turnaroundDays: v.any(),
  }).index("by_category", ["category"]).index("by_slug", ["slug"]),

  // Clients Module
  clients: defineTable({
    name: v.string(),
    code: v.string(), 
    type: v.string(), // "government" | "private" | ...
    isActive: v.boolean(),
    balance: v.number(),
    // Flexible contact info
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
    address: v.optional(v.string()),
    ministry: v.optional(v.string()),
    creditLimit: v.optional(v.number()),
  }).index("by_type", ["type"]).index("by_code", ["code"]),

  // Print Jobs (Production)
  printJobs: defineTable({
    jobNumber: v.string(),
    clientId: v.id("clients"),
    productId: v.id("products"),
    status: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    // Job details
    jobName: v.string(),
    quantity: v.number(),
    estimatedCost: v.number(),
    priority: v.string(),
    deadline: v.string(),
    // Specs
    paperType: v.string(),
    paperGsm: v.number(),
    color: v.string(),
    size: v.string(),
    finish: v.optional(v.string()),
    fileUrl: v.optional(v.string()),
    notes: v.optional(v.string()),
  }).index("by_status", ["status"]).index("by_jobNumber", ["jobNumber"]),

  // Quality Control
  qualityChecks: defineTable({
    printJobId: v.id("printJobs"),
    checkType: v.string(),
    status: v.string(), // "Pass" | "Fail"
    score: v.number(),
    target: v.number(),
    timestamp: v.number(),
    inspector: v.string(),
    notes: v.optional(v.string()),
  }).index("by_job", ["printJobId"]),

  pressColorLogs: defineTable({
    printJobId: v.optional(v.id("printJobs")),
    pressNumber: v.number(),
    inkColor: v.string(),
    deltaE: v.number(),
    status: v.string(),
    operator: v.string(),
    timestamp: v.number(),
  }),

  // Inventory
  inkInventory: defineTable({
    color: v.string(),
    currentLevel: v.number(),
    reorderLevel: v.number(),
    supplier: v.optional(v.string()),
    lastRefilled: v.number(),
    unitCost: v.optional(v.number()),
  }).index("by_color", ["color"]),

  paperInventory: defineTable({
    type: v.optional(v.string()),
    quantity: v.number(),
    reorderLevel: v.number(),
    gsm: v.optional(v.number()),
  }),

  // ISBN Portal
  isbnRegistrations: defineTable({
    preRegistrationCode: v.string(),
    bookTitle: v.string(),
    authorName: v.string(),
    email: v.string(),
    status: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    // Optional / Workflow fields
    phone: v.optional(v.string()),
    language: v.optional(v.string()),
    genre: v.optional(v.string()),
    expectedPublishDate: v.optional(v.string()),
    isbn: v.optional(v.string()),
    paymentMethod: v.optional(v.string()),
    paymentReference: v.optional(v.string()),
    amountPaid: v.optional(v.number()),
  }).index("by_preRegistrationCode", ["preRegistrationCode"]),

  isbnCatalog: defineTable({
    isbn: v.string(),
    isActive: v.boolean(),
    title: v.optional(v.string()),
    publisher: v.optional(v.string()),
  }),

  isbnSearches: defineTable({
    query: v.string(),
    resultType: v.string(),
    timestamp: v.number(),
    convertedToRegistration: v.boolean(),
  }),

  // System
  auditLog: defineTable({
    action: v.string(),
    entityType: v.string(),
    entityId: v.union(v.string(), v.id("printJobs")), // Flexible ID
    userId: v.string(),
    details: v.string(),
    timestamp: v.number(),
  }),

  // CMS Content (Key-Value Store for Dynamic Site Content)
  cmsContent: defineTable({
    section: v.string(), // "hero", "about", "announcement"
    key: v.string(),     // "title", "subtitle", "banner_url"
    value: v.string(),   // The actual text or image URL
    type: v.union(v.literal("text"), v.literal("image"), v.literal("json")),
    lastUpdatedBy: v.optional(v.id("users")),
  }).index("by_section", ["section"]),
});
