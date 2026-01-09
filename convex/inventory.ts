import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get ink levels
export const getInkLevels = query({
  handler: async (ctx) => {
    return await ctx.db.query("inkInventory").collect();
  },
});

// Update ink level
export const updateInkLevel = mutation({
  args: {
    id: v.id("inkInventory"),
    currentLevel: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { currentLevel: args.currentLevel });
  },
});

// Get paper inventory
export const getPaperInventory = query({
  handler: async (ctx) => {
    return await ctx.db.query("paperInventory").collect();
  },
});

// Check low stock items
export const getLowStock = query({
  handler: async (ctx) => {
    const ink = await ctx.db.query("inkInventory").collect();
    const paper = await ctx.db.query("paperInventory").collect();
    
    const lowInk = ink.filter(i => i.currentLevel <= i.reorderLevel);
    const lowPaper = paper.filter(p => p.quantity <= p.reorderLevel);
    
    return {
      lowInk,
      lowPaper,
      totalAlerts: lowInk.length + lowPaper.length,
    };
  },
});

// Initialize default ink inventory
export const initializeInk = mutation({
  handler: async (ctx) => {
    const colors = [
      { color: "Cyan" as const, currentLevel: 75, reorderLevel: 25 },
      { color: "Magenta" as const, currentLevel: 45, reorderLevel: 25 },
      { color: "Yellow" as const, currentLevel: 90, reorderLevel: 25 },
      { color: "Black" as const, currentLevel: 25, reorderLevel: 25 },
    ];
    
    for (const c of colors) {
      const existing = await ctx.db
        .query("inkInventory")
        .withIndex("by_color", (q) => q.eq("color", c.color))
        .first();
      
      if (!existing) {
        await ctx.db.insert("inkInventory", {
          color: c.color,
          currentLevel: c.currentLevel,
          reorderLevel: c.reorderLevel,
          supplier: "Default Supplier",
          lastRefilled: Date.now(),
          unitCost: 150,
        });
      }
    }
  },
});
