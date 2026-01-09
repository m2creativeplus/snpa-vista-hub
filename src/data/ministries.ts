export type Ministry = {
  id: string;
  name: string;
  code: string;
  budget: {
    q1_allocation: number;
    q1_spent: number;
    q1_remaining: number;
    status: "healthy" | "warning" | "critical";
  };
  authorized_approver: string;
};

export const ministries: Ministry[] = [
  {
    id: "moh",
    name: "Ministry of Health Development",
    code: "MOH-2026-HGA",
    budget: {
      q1_allocation: 15000,
      q1_spent: 12400,
      q1_remaining: 2600, // Low budget scenario
      status: "warning",
    },
    authorized_approver: "Director General Dr. Mohamed",
  },
  {
    id: "moe",
    name: "Ministry of Education & Science",
    code: "MOE-2026-EDU",
    budget: {
      q1_allocation: 25000,
      q1_spent: 5000,
      q1_remaining: 20000, // Healthy budget
      status: "healthy",
    },
    authorized_approver: "Director General Ahmed",
  },
  {
    id: "mofaic",
    name: "Ministry of Foreign Affairs",
    code: "MOF-2026-INT",
    budget: {
      q1_allocation: 50000,
      q1_spent: 49500,
      q1_remaining: 500, // Critical budget
      status: "critical",
    },
    authorized_approver: "Director General Amb. Khadra",
  },
];
