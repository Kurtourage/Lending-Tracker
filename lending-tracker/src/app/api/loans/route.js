// pages/api/loans.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const loans = await prisma.loan.findMany({
        include: { borrower: true, transactions: true },
      });
      return res.status(200).json(loans);
    }

    if (req.method === "POST") {
      const { borrowerId, amount, interestRate } = req.body;
      const newLoan = await prisma.loan.create({
        data: {
          borrowerId,
          amount,
          interestRate,
          remainingBalance: amount, // start with full balance
        },
      });
      return res.status(201).json(newLoan);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
