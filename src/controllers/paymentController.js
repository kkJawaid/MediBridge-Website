import prisma from '../config/db.js';

export const createPayment = async (req, res) => {
  try {
    const { order_id, method = 'COD', reference = null } = req.body;
    const payment = await prisma.payment.create({
      data: {
        order_id,
        payment_method: method,
        transaction_reference: reference,
        payment_status: 'completed'
      }
    });

    await prisma.order.update({
      where: { order_id },
      data: { status: 'approved' }
    });

    res.json({ payment, message: 'Payment processed (mock)' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
