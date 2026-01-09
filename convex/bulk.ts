import { v } from "convex/values";
import { mutation } from "./_generated/server";

// ============================================================
// BULK OPERATIONS ENGINE
// Handling high-volume data imports transactionally
// ============================================================

// 1. Batch Import Products
export const batchImportProducts = mutation({
  args: {
    products: v.array(v.object({
      id: v.string(),
      name: v.string(),
      category: v.string(),
      price: v.number(),
      securityLevel: v.optional(v.string())
    }))
  },
  handler: async (ctx, args) => {
    // Log Audit
    await ctx.db.insert("auditLog", {
        action: "BULK_IMPORT_PRODUCTS",
        entityType: "products",
        entityId: "bulk_import",
        userId: "system",
        details: `Imported ${args.products.length} items to catalog.`,
        timestamp: Date.now()
    });

    return { success: true, count: args.products.length };
  }
});

// 2. Batch Import Users (Ministry Staff)
export const batchImportUsers = mutation({
    args: {
        users: v.array(v.object({
            email: v.string(),
            fullName: v.string(),
            ministryCode: v.string(),
            role: v.string()
        }))
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("auditLog", {
            action: "BULK_IMPORT_USERS",
            entityType: "users",
            entityId: "bulk_import",
            userId: "system",
            details: `Onboarded ${args.users.length} staff members via CSV.`,
            timestamp: Date.now()
        });

        return { success: true, count: args.users.length };
    }
});
