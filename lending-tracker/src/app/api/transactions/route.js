// pages/api/transactions.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const transactions = await prisma.transaction.findMany({
        include: { loan: true },
      });
      return res.status(200).json(transactions);
    }

    if (req.method === "POST") {
      const { loanId, amount } = req.body;

      const newTransaction = await prisma.transaction.create({
        data: { loanId, amount },
      });

      // update remaining balance
      await prisma.loan.update({
        where: { id: loanId },
        data: {
          remainingBalance: {
            decrement: amount,
          },
        },
      });

      return res.status(201).json(newTransaction);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
