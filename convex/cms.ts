import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// 1. Get Content for a specific section (Public Access)
export const getContent = query({
  args: { section: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cmsContent")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .collect();
  },
});

// 2. Update Content (Admin Only - simplified for now)
export const updateContent = mutation({
  args: {
    section: v.string(),
    key: v.string(),
    value: v.string(),
    type: v.union(v.literal("text"), v.literal("image"), v.literal("json")),
  },
  handler: async (ctx, args) => {
    // Check if exists
    const existing = await ctx.db
      .query("cmsContent")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .filter((q) => q.eq(q.field("key"), args.key))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        value: args.value,
        type: args.type,
      });
    } else {
      await ctx.db.insert("cmsContent", {
        section: args.section,
        key: args.key,
        value: args.value,
        type: args.type,
      });
    }

    // Log Audit
    await ctx.db.insert("auditLog", {
        action: "CMS_UPDATE",
        entityType: "cmsContent",
        entityId: `${args.section}.${args.key}`,
        userId: "system",
        details: `Updated ${args.section}.${args.key}`,
        timestamp: Date.now(),
    });
  },
});

// 3. Initialize Default Content (Seed)
export const seedDefaults = mutation({
    args: {},
    handler: async (ctx) => {
        const defaults = [
            { section: "hero", key: "title", value: "Secure Sovereign Printing", type: "text" as const },
            { section: "hero", key: "subtitle", value: "The official security printer for the Government of Somaliland.", type: "text" as const },
            { section: "announcement", key: "banner", value: "⚠️ Fiscal Year End: All Ministry Requisitions due by Dec 20th.", type: "text" as const },
        ];

        for (const item of defaults) {
            const existing = await ctx.db
                .query("cmsContent")
                .withIndex("by_section", (q) => q.eq("section", item.section))
                .filter((q) => q.eq(q.field("key"), item.key))
                .first();
            
            if (!existing) {
                await ctx.db.insert("cmsContent", item);
            }
        }
    }
});
