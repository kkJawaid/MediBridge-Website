import prisma from '../config/db.js';

export const createOrder = async (req, res) => {
  try {
    const { productId, formData, orderType, totalAmount, quantity, startDate, endDate } = req.body;
    const order = await prisma.order.create({
      data: {
        user_id: req.user.userId,
        product_id: productId,
        form_data: formData,
        order_type: orderType,
        total_amount: totalAmount,
        quantity: quantity || 1,
        created_at: new Date(),
      },
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (req.user.userId !== userId && req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
    const orders = await prisma.order.findMany({ where: { user_id: userId }, include: { product: true, payment: true } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const order = await prisma.order.findUnique({ where: { order_id: id }, include: { product: true, payment: true } });
    if (!order) return res.status(404).json({ message: 'Not found' });
    if (order.user_id !== req.user.userId && req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const adminUpdateOrder = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const order = await prisma.order.update({ where: { order_id: id }, data: { status } });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
