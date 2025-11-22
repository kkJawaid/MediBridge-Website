import prisma from '../config/db.js';

export const getAnalytics = async (req, res) => {
  try {
    const totalOrders = await prisma.order.count();
    const totalUsers = await prisma.user.count();
    const totalProducts = await prisma.product.count();
    const cancelledOrders = await prisma.order.count({ where: { status: 'cancelled' } });
    const completedOrders = await prisma.order.count({ where: { status: 'completed' } });

    res.json({ totalOrders, totalUsers, totalProducts, cancelledOrders, completedOrders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

function normalizeBigInts(obj) {
  return JSON.parse(
    JSON.stringify(obj, (_, v) => (typeof v === "bigint" ? Number(v) : v))
  );
}

export const getChartsData = async (req, res) => {
  try {
    // 1. Monthly Sales Revenue
    const monthlySales = await prisma.$queryRaw`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', created_at), 'YYYY-MM') AS month,
        SUM(total_amount) AS total_amount
      FROM "Order"
      WHERE status IN ('completed', 'dispatched')
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month;
    `;
    console.log("monthly sales: ", monthlySales);
    // 2. Monthly Orders Count
    const monthlyOrders = await prisma.$queryRaw`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', created_at), 'YYYY-MM') AS month,
        COUNT(*) AS order_count
      FROM "Order"
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month;
    `;
    console.log("monthly orders: ", monthlyOrders);
    //merging monthly sales and orders into one
    const monthlySalesMap = {};
    monthlySales.forEach(row => {
      monthlySalesMap[row.month] = { month: row.month, total_amount: Number(row.total_amount) };
    });

    monthlyOrders.forEach(row => {
      if (!monthlySalesMap[row.month]) {
        monthlySalesMap[row.month] = { month: row.month };
      }
      monthlySalesMap[row.month].order_count = Number(row.order_count);
    });

    const mergedMonthlyData = Object.values(monthlySalesMap);
    // 3. Product Orders per Category
    const productOrders = await prisma.$queryRaw`
      SELECT 
        p.category,
        COUNT(poj."product_id") AS order_count
      FROM "Product" p
      LEFT JOIN "ProductOrderJunction" poj ON poj.product_id = p.product_id
      GROUP BY p.category;
    `;

    // 4. Product Bookmarks per Category
    const productBookmarks = await prisma.$queryRaw`
      SELECT 
        p.category,
        COUNT(b.product_id) AS bookmark_count
      FROM "Product" p
      LEFT JOIN "Bookmark" b ON b.product_id = p.product_id
      GROUP BY p.category;
    `;

    res.json(normalizeBigInts({
      // monthlySales,
      // monthlyOrders,
      monthlySales: mergedMonthlyData,
      productOrders,
      productBookmarks
    }));

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};