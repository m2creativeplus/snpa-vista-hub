import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all jobs grouped by status for Kanban view
export const getJobsByStatus = query({
  args: {},
  handler: async (ctx) => {
    const allJobs = await ctx.db.query("printJobs").collect();
    
    const grouped = {
      pending: allJobs.filter(j => j.status === "pending"),
      in_progress: allJobs.filter(j => j.status === "in_progress"),
      quality_check: allJobs.filter(j => j.status === "quality_check"),
      complete: allJobs.filter(j => j.status === "complete"),
    };
    
    return grouped;
  },
});

// Update job status (for Kanban drag-and-drop)
export const updateJobStatus = mutation({
  args: {
    jobId: v.id("printJobs"),
    newStatus: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.jobId, {
      status: args.newStatus,
      updatedAt: Date.now(),
    });
    
    // Audit log
    await ctx.db.insert("auditLog", {
      action: "JOB_STATUS_UPDATE",
      entityType: "printJobs",
      entityId: args.jobId,
      userId: "system",
      details: `Job moved to ${args.newStatus}`,
      timestamp: Date.now(),
    });
  },
});

// Get job details
export const getJob = query({
  args: { jobId: v.id("printJobs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.jobId);
  },
});

// Create a new print job
export const createJob = mutation({
  args: {
    jobName: v.string(),
    clientId: v.id("clients"),
    productId: v.id("products"),
    quantity: v.number(),
    priority: v.string(),
    deadline: v.string(),
    paperType: v.string(),
    paperGsm: v.number(),
    color: v.string(),
    size: v.string(),
  },
  handler: async (ctx, args) => {
    const jobNumber = `JOB-${Date.now().toString(36).toUpperCase()}`;
    
    const jobId = await ctx.db.insert("printJobs", {
      jobNumber,
      clientId: args.clientId,
      productId: args.productId,
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      jobName: args.jobName,
      quantity: args.quantity,
      estimatedCost: 0,
      priority: args.priority,
      deadline: args.deadline,
      paperType: args.paperType,
      paperGsm: args.paperGsm,
      color: args.color,
      size: args.size,
    });
    
    return { jobId, jobNumber };
  },
});
