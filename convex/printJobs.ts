import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Generate job number
const generateJobNumber = () => {
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(Math.random() * 999).toString().padStart(3, '0');
  return `SNPA-PAP-${year}-${random}`;
};

// Get all jobs with filters
export const list = query({
  args: {
    status: v.optional(v.string()),
    clientId: v.optional(v.id("clients")),
    priority: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let results;
    
    if (args.status) {
      results = await ctx.db
        .query("printJobs")
        .withIndex("by_status", (q) => q.eq("status", args.status as any))
        .order("desc")
        .collect();
    } else {
      results = await ctx.db
        .query("printJobs")
        .order("desc")
        .collect();
    }
    
    // Enrich with client data
    return await Promise.all(
      results.map(async (job) => {
        const client = await ctx.db.get(job.clientId);
        const product = await ctx.db.get(job.productId);
        return { ...job, client, product };
      })
    );
  },
});

// Get job by number
export const getByNumber = query({
  args: { jobNumber: v.string() },
  handler: async (ctx, args) => {
    const job = await ctx.db
      .query("printJobs")
      .withIndex("by_jobNumber", (q) => q.eq("jobNumber", args.jobNumber))
      .first();
    
    if (!job) return null;
    
    const client = await ctx.db.get(job.clientId);
    const product = await ctx.db.get(job.productId);
    const qualityChecks = await ctx.db
      .query("qualityChecks")
      .withIndex("by_job", (q) => q.eq("printJobId", job._id))
      .collect();
    
    return { ...job, client, product, qualityChecks };
  },
});

// Create print job
export const create = mutation({
  args: {
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
    deadline: v.string(),
    fileUrl: v.optional(v.string()),
    notes: v.optional(v.string()),
    estimatedCost: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const jobNumber = generateJobNumber();
    
    const jobId = await ctx.db.insert("printJobs", {
      ...args,
      jobNumber,
      status: "Pending",
      createdAt: now,
      updatedAt: now,
    });
    
    // Create audit log
    await ctx.db.insert("auditLog", {
      action: "CREATE_JOB",
      entityType: "printJobs",
      entityId: jobId,
      userId: "system",
      details: `Created job ${jobNumber}`,
      timestamp: now,
    });
    
    return { jobId, jobNumber };
  },
});

// Update job status
export const updateStatus = mutation({
  args: {
    jobId: v.id("printJobs"),
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
  },
  handler: async (ctx, args) => {
    const job = await ctx.db.get(args.jobId);
    if (!job) throw new Error("Job not found");
    
    const now = Date.now();
    await ctx.db.patch(args.jobId, {
      status: args.status,
      updatedAt: now,
    });
    
    await ctx.db.insert("auditLog", {
      action: "UPDATE_STATUS",
      entityType: "printJobs",
      entityId: args.jobId,
      userId: "system",
      details: `Status changed to ${args.status}`,
      timestamp: now,
    });
  },
});

// Get dashboard stats
export const getDashboardStats = query({
  handler: async (ctx) => {
    const jobs = await ctx.db.query("printJobs").collect();
    
    const stats = {
      total: jobs.length,
      pending: jobs.filter(j => j.status === "Pending").length,
      inProgress: jobs.filter(j => ["In Progress", "Pre-Press", "Printing", "Post-Press"].includes(j.status)).length,
      qualityCheck: jobs.filter(j => j.status === "Quality Check").length,
      completed: jobs.filter(j => j.status === "Completed" || j.status === "Delivered").length,
      highPriority: jobs.filter(j => j.priority === "High").length,
      todayDeadlines: jobs.filter(j => {
        const deadline = new Date(j.deadline);
        const today = new Date();
        return deadline.toDateString() === today.toDateString();
      }).length,
    };
    
    return stats;
  },
});
