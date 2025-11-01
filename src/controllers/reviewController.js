import prisma from '../config/db.js';

export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const review = await prisma.review.create({
      data: {
        user_id: req.user.userId,
        product_id: productId,
        rating,
        comment
      }
    });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const reviews = await prisma.review.findMany({ where: { product_id: productId }, include: { user: { select: { user_id: true, full_name: true } } } });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
