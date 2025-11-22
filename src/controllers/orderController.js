import prisma from '../config/db.js';

export const createOrder = async (req, res) => {
  try {
    const { productId, formData, orderType, totalAmount } = req.body;
    const order = await prisma.order.create({
      data: {
        user_id: req.user.userId,
        form_data: formData,
        order_type: orderType,
        total_amount: totalAmount,
        created_at: new Date(),
      },
    });
    const productOrder = await prisma.productOrderJunction.create({
      data: {
        order_id: order.order_id,
        product_id: productId
      }
    });
    res.json({ order, productOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (req.user.userId !== userId && req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
    const orders = await prisma.order.findMany({ where: { user_id: userId }, include: { productorder: { include: { product: true } }, payment: true } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const order = await prisma.order.findUnique({ where: { order_id: id }, include: { productorder: { include: { product: true } }, payment: true } });
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
    console.log("Status: ", status);
    const order = await prisma.order.update({ where: { order_id: id }, data: { status } });
    console.log("Status 2 ", status);
    //getting user id 
    const userId = await prisma.order.findFirst({ where: { order_id: id }, select: { user_id: true } });
    res.json(order);
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ error: err.message });
  }
};

export const viewAllOrders = async (req, res) => {
  try {
    const allOrders = await prisma.order.findMany({ include: {user: true, payment: true}});
    res.json(allOrders);
  } catch (err) {
    res.status(500).json({ err: error.message });
  }
}

export const viewOrder = async (req, res) => {
  try {
    const id = parseInt(req.user.userId);
    const orderId = parseInt(req.params.id);
    const specificOrder = await prisma.order.findFirst({ where: { user_id: id, order_id: orderId } });
    res.json(specificOrder);
  } catch (err) {
    res.status(500).json({ err: error.message });
  }
}