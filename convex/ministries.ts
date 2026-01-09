import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// The "Iron Dome" Logic
export const checkBudget = query({
  args: { ministryId: v.id("ministries"), amount: v.number() },
  handler: async (ctx, args) => {
    const ministry = await ctx.db.get(args.ministryId);
    if (!ministry) throw new Error("Ministry not found");

    const available = ministry.budgetLimit - (ministry.budgetSpent + ministry.budgetFrozen);
    return {
      allowed: available >= args.amount,
      balance: available,
      shortfall: args.amount - available
    };
  },
});

export const getMinistries = query({
  handler: async (ctx) => {
    return await ctx.db.query("ministries").collect();
  },
});

export const seedMinistries = mutation({
  handler: async (ctx) => {
    // Check if empty
    const existing = await ctx.db.query("ministries").first();
    if (existing) return "Already seeded";

    // 🛡️ Type A: Sovereignty & Security (The "Big 5")
    await ctx.db.insert("ministries", {
      name: "Immigration & Border Control Agency",
      code: "ICA",
      budgetLimit: 480000, 
      budgetSpent: 125000,
      budgetFrozen: 15000,
    }); // Est: $480k (Passports)

    await ctx.db.insert("ministries", {
      name: "National Electoral Commission (NEC)",
      code: "NEC",
      budgetLimit: 350000, 
      budgetSpent: 10000,
      budgetFrozen: 0,
    }); // Est: $350k (Voter Cards)

    await ctx.db.insert("ministries", {
      name: "Ministry of Finance Development",
      code: "MoFD",
      budgetLimit: 250000, 
      budgetSpent: 180000,
      budgetFrozen: 5000,
    }); // Est: $250k (Tax Stamps)

    await ctx.db.insert("ministries", {
      name: "Ministry of Transport & Road Dev",
      code: "MoTRD",
      budgetLimit: 200000, 
      budgetSpent: 95000,
      budgetFrozen: 12000,
    }); // Est: $200k (Plates/Licenses)

    await ctx.db.insert("ministries", {
      name: "Ministry of Interior",
      code: "MoI",
      budgetLimit: 150000, 
      budgetSpent: 85000,
      budgetFrozen: 22000,
    }); // Est: $150k (Civil IDs)

    // 👥 Type B: Mass Public Service
    await ctx.db.insert("ministries", {
      name: "Ministry of Education & Science",
      code: "MoES",
      budgetLimit: 450000, 
      budgetSpent: 320000,
      budgetFrozen: 45000,
    }); // Est: $450k (Textbooks)

    await ctx.db.insert("ministries", {
      name: "Ministry of Health Development",
      code: "MoHD",
      budgetLimit: 200000, 
      budgetSpent: 145000,
      budgetFrozen: 10000,
    }); // Est: $200k (Patient Forms)

    // 🏢 Type C: Admins (Top Pick)
    await ctx.db.insert("ministries", {
      name: "Presidency (Madaxtooyada)",
      code: "OOP",
      budgetLimit: 110000, 
      budgetSpent: 65000,
      budgetFrozen: 5000,
    }); // Est: $110k

    return "Seeded 8 Strategic MDAs from Directory";
  },
});
