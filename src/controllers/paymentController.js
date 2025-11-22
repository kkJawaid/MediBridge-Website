import prisma from '../config/db.js';

export const getAllPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({});
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

