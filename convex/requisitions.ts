import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all requisitions
export const getRequisitions = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("requisitions").order("desc").collect();
  },
});

// Get requisitions by ministry
export const getRequisitionsByMinistry = query({
  args: { ministryId: v.id("ministries") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("requisitions")
      .withIndex("by_ministry", (q) => q.eq("ministryId", args.ministryId))
      .order("desc")
      .collect();
  },
});

// Update requisition status
export const updateRequisitionStatus = mutation({
  args: {
    requisitionId: v.id("requisitions"),
    newStatus: v.string(),
    rejectionReason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.requisitionId, {
      status: args.newStatus as any,
      rejectionReason: args.rejectionReason,
    });

    await ctx.db.insert("auditLog", {
      action: "REQUISITION_STATUS_UPDATE",
      entityType: "requisitions",
      entityId: args.requisitionId,
      userId: "system",
      details: `Requisition status changed to ${args.newStatus}`,
      timestamp: Date.now(),
    });
  },
});

// Submit new requisition
export const submitRequisition = mutation({
  args: {
    ministryId: v.id("ministries"),
    userId: v.id("users"),
    items: v.array(
      v.object({
        name: v.string(),
        quantity: v.number(),
        unitPrice: v.number(),
        total: v.number(),
      })
    ),
    totalAmount: v.number(),
  },
  handler: async (ctx, args) => {
    const requisitionId = await ctx.db.insert("requisitions", {
      ministryId: args.ministryId,
      userId: args.userId,
      items: args.items,
      totalAmount: args.totalAmount,
      status: "pending_approval",
      createdAt: Date.now(),
    });

    // Freeze budget
    const ministry = await ctx.db.get(args.ministryId);
    if (ministry) {
      await ctx.db.patch(args.ministryId, {
        budgetFrozen: (ministry.budgetFrozen || 0) + args.totalAmount,
      });
    }

    await ctx.db.insert("auditLog", {
      action: "REQUISITION_SUBMITTED",
      entityType: "requisitions",
      entityId: requisitionId,
      userId: args.userId,
      details: `New requisition submitted for $${args.totalAmount}`,
      timestamp: Date.now(),
    });

    return requisitionId;
  },
});
