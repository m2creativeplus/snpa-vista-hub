import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submitRequisition = mutation({
  args: {
    ministryId: v.id("ministries"),
    userId: v.id("users"), // In real app, get from auth context
    items: v.array(v.object({
      name: v.string(),
      quantity: v.number(),
      unitPrice: v.number(),
      total: v.number(),
    })),
    totalAmount: v.number(),
  },
  handler: async (ctx, args) => {
    const ministry = await ctx.db.get(args.ministryId);
    if (!ministry) throw new Error("Ministry not found");

    // 1. Double Check Budget (Iron Dome)
    const available = ministry.budgetLimit - (ministry.budgetSpent + ministry.budgetFrozen);
    if (available < args.totalAmount) {
      throw new Error(`Budget Exceeded! Shortfall: $${args.totalAmount - available}`);
    }

    // 2. Create Requisition
    const reqId = await ctx.db.insert("requisitions", {
      ministryId: args.ministryId,
      userId: args.userId,
      items: args.items,
      totalAmount: args.totalAmount,
      status: "pending_approval",
      createdAt: Date.now(),
    });

    // 3. Freeze Funds
    await ctx.db.patch(args.ministryId, {
      budgetFrozen: ministry.budgetFrozen + args.totalAmount,
    });

    return reqId;
  },
});

export const getPendingRequisitions = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("requisitions")
      .filter((q) => q.eq(q.field("status"), "pending_approval"))
      .collect();
  },
});

export const approveRequisition = mutation({
  args: { requisitionId: v.id("requisitions") },
  handler: async (ctx, args) => {
    const req = await ctx.db.get(args.requisitionId);
    if (!req) throw new Error("Requisition not found");
    if (req.status !== "pending_approval") throw new Error("Invalid status");

    const ministry = await ctx.db.get(req.ministryId);
    if (!ministry) throw new Error("Ministry missing");

    // Move Funds: Frozen -> Spent
    await ctx.db.patch(req.ministryId, {
      budgetFrozen: ministry.budgetFrozen - req.totalAmount,
      budgetSpent: ministry.budgetSpent + req.totalAmount,
    });

    await ctx.db.patch(args.requisitionId, { status: "approved" });
  },
});
