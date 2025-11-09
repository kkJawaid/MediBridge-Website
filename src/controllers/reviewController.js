import prisma from '../config/db.js';

export const createReview = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { comment } = req.body;
    const review = await prisma.review.create({
      data: {
        user_id: req.user.userId,
        product_id: productId,
        comment
      },
      include: {
       user: { select: { user_id: true, full_name: true }  }
      }
    });
res.json(review);
  } catch (err) {
  console.log(err);
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

export const getUserReviews = async (req, res) => {
  try {
    const userId = parseInt(req.user.userId);
    const reviews = await prisma.review.findMany({
      where: { user_id: userId }, include: {
        product: {
          select: { name: true, category: true, price: true, is_available: true }
        }
      }
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const deleteReview = async (req, res) => {
  try {
    const reviewId = parseInt(req.body.id);
    const reviews = await prisma.review.delete({ where: { review_id: reviewId } });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
