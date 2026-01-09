export type Ministry = {
  id: string;
  name: string;
  code: string;
  budget: {
    q1_allocation: number;
    q1_spent: number;
    q1_remaining: number;
  };
  authorized_approver: string;
  tier: "Security-A" | "Service-B" | "Admin-C" | "Tier 1" | "Tier 2";
};

// Based on 'SOMALILAND_MDA_PRINTING_NEEDS_DIRECTORY.md'
export const ministries: Ministry[] = [
    // 🛡️ Type A: Security & Sovereignty
    {
        id: "m_immig",
        name: "Immigration & Border Control",
        code: "ICA",
        authorized_approver: "Col. Mohamed A. (Director)",
        budget: { q1_allocation: 120000, q1_spent: 31250, q1_remaining: 88750 },
        tier: "Security-A"
    },
    {
        id: "m_finance",
        name: "Ministry of Finance Dev",
        code: "MoFD",
        authorized_approver: "Dr. Saad S. (Minister)",
        budget: { q1_allocation: 62500, q1_spent: 45000, q1_remaining: 17500 },
        tier: "Security-A"
    },
    {
        id: "m_nec",
        name: "National Electoral Commission",
        code: "NEC",
        authorized_approver: "Muse H. (Chair)",
        budget: { q1_allocation: 87500, q1_spent: 2500, q1_remaining: 85000 },
        tier: "Security-A"
    },
    
    // 👥 Type B: Public Service
    {
        id: "m_edu",
        name: "Ministry of Education & Science",
        code: "MoES",
        authorized_approver: "Ahmed T. (DG)",
        budget: { q1_allocation: 112500, q1_spent: 80000, q1_remaining: 32500 },
        tier: "Service-B"
    },
    {
        id: "m_health",
        name: "Ministry of Health Dev",
        code: "MoHD",
        authorized_approver: "Dr. Mohamed A. (DG)",
        budget: { q1_allocation: 50000, q1_spent: 36250, q1_remaining: 13750 },
        tier: "Service-B"
    },
    
    // 🏢 Type C: Admin
    {
        id: "m_oop",
        name: "Presidency (Madaxtooyada)",
        code: "OOP",
        authorized_approver: "Mohamed A. (Chief of Cabinet)",
        budget: { q1_allocation: 27500, q1_spent: 16250, q1_remaining: 11250 },
        tier: "Admin-C"
    },
    {
        id: "m_fa",
        name: "Ministry of Foreign Affairs",
        code: "MoFA",
        authorized_approver: "Dr. Essa K. (Minister)",
        budget: { q1_allocation: 18750, q1_spent: 7500, q1_remaining: 11250 },
        tier: "Admin-C"
    }
];
