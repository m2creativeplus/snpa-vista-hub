import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get quality checks for a job
export const getByJob = query({
  args: { printJobId: v.id("printJobs") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("qualityChecks")
      .withIndex("by_job", (q) => q.eq("printJobId", args.printJobId))
      .collect();
  },
});

// Get ISO compliance scores
export const getISOScores = query({
  handler: async (ctx) => {
    const checks = await ctx.db.query("qualityChecks").collect();
    
    const isoTypes = ["ISO_9001", "ISO_12647", "ISO_14001"];
    const scores = isoTypes.map(type => {
      const typeChecks = checks.filter(c => c.checkType === type);
      const avgScore = typeChecks.length > 0
        ? typeChecks.reduce((sum, c) => sum + c.score, 0) / typeChecks.length
        : 0;
      const target = typeChecks[0]?.target || 90;
      
      return {
        type,
        score: Math.round(avgScore),
        target,
        passRate: typeChecks.length > 0
          ? Math.round((typeChecks.filter(c => c.status === "Pass").length / typeChecks.length) * 100)
          : 0,
      };
    });
    
    return scores;
  },
});

// Create quality check
export const create = mutation({
  args: {
    printJobId: v.id("printJobs"),
    checkType: v.union(
      v.literal("ISO_9001"),
      v.literal("ISO_12647"),
      v.literal("ISO_14001"),
      v.literal("Color_Calibration"),
      v.literal("Paper_Quality"),
      v.literal("Final_Inspection")
    ),
    score: v.number(),
    target: v.number(),
    inspector: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const status = args.score >= args.target ? "Pass" : "Fail";
    
    return await ctx.db.insert("qualityChecks", {
      ...args,
      status,
      timestamp: Date.now(),
    });
  },
});

// Get press color logs
export const getPressColorLogs = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("pressColorLogs")
      .order("desc")
      .take(20);
  },
});

// Add press color log
export const addPressColorLog = mutation({
  args: {
    printJobId: v.optional(v.id("printJobs")),
    pressNumber: v.number(),
    inkColor: v.union(v.literal("Cyan"), v.literal("Magenta"), v.literal("Yellow"), v.literal("Black")),
    deltaE: v.number(),
    operator: v.string(),
  },
  handler: async (ctx, args) => {
    // Delta E < 2 is generally acceptable for commercial printing
    const status = args.deltaE <= 2 ? "Pass" : "Fail";
    
    return await ctx.db.insert("pressColorLogs", {
      ...args,
      status,
      timestamp: Date.now(),
    });
  },
});
