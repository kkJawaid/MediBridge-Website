import prisma from '../config/db.js';

export const getAnalytics = async (req, res) => {
  try {
    const totalOrders = await prisma.order.count();
    const totalUsers = await prisma.user.count();
    const totalProducts = await prisma.product.count();
    const cancelledOrders = await prisma.order.count({ where: { status: 'cancelled' } });
    const approvedOrders = await prisma.order.count({ where: { status: 'approved' } });

    res.json({ totalOrders, totalUsers, totalProducts, cancelledOrders, approvedOrders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
