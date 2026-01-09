import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all clients
export const list = query({
  args: { type: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.type) {
      return await ctx.db
        .query("clients")
        .withIndex("by_type", (q) => q.eq("type", args.type as any))
        .filter((q) => q.eq(q.field("isActive"), true))
        .collect();
    }
    return await ctx.db
      .query("clients")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Create client
export const create = mutation({
  args: {
    name: v.string(),
    code: v.string(),
    type: v.union(v.literal("government"), v.literal("private"), v.literal("ngo")),
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
    address: v.optional(v.string()),
    ministry: v.optional(v.string()),
    creditLimit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("clients", {
      ...args,
      balance: 0,
      isActive: true,
    });
  },
});

// Initialize sample clients
export const initializeSampleClients = mutation({
  handler: async (ctx) => {
    const clients = [
      { name: "Ministry of Education", code: "MOE", type: "government" as const, ministry: "Education Ministry" },
      { name: "Ministry of Finance", code: "MOF", type: "government" as const, ministry: "Finance Ministry" },
      { name: "Ministry of Health", code: "MOH", type: "government" as const, ministry: "Health Ministry" },
      { name: "Dahabshiil Bank", code: "DHB", type: "private" as const },
      { name: "Telesom Company", code: "TLS", type: "private" as const },
    ];
    
    for (const c of clients) {
      const existing = await ctx.db
        .query("clients")
        .withIndex("by_code", (q) => q.eq("code", c.code))
        .first();
      
      if (!existing) {
        await ctx.db.insert("clients", {
          ...c,
          balance: 0,
          isActive: true,
        });
      }
    }
  },
});
