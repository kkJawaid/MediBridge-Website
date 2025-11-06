import { parse } from 'dotenv';
import prisma from '../config/db.js';

export const getProducts = async (req, res) => {
  const { category, search } = req.query;
  const where = {};
  if (category) where.category = category;
  if (search) where.name = { contains: search, mode: 'insensitive' };

  const products = await prisma.product.findMany({ where });
  res.json(products);
};

export const getProductById = async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await prisma.product.findUnique({ where: { product_id: id } });
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, category, type, price, stock, image_url } = req.body;
    const product = await prisma.product.create({
      data: { name, description, category, type, price: parseFloat(price), stock: parseInt(stock), image_url },
    });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, category, type, price, stock, image_url, is_available } = req.body;
    const product = await prisma.product.update({
      where: { product_id: id },
      data: { name, description, category, type, price: parseFloat(price), stock: parseInt(stock), image_url, is_available },
    });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.product.delete({ where: { product_id: id } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const addBookmark = async(req, res) => {
  try {
    const id = parseInt(req.user.userId);
    const productId = parseInt(req.params.id);
    const addedBookmark = await prisma.bookmark.create({ data: {user_id: id, product_id: productId}});
    res.json(addedBookmark);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeBookmark = async(req, res) => {
  try {
    const id = parseInt(req.user.userId);
    const productId = parseInt(req.params.id);
    //finding bookmark id first
    const bookmark = await prisma.bookmark.findFirst( {where: {user_id: id, product_id: productId}} );
    //now deleting
    const deletedBookmark = await prisma.bookmark.delete( {where: {b_id: bookmark.b_id}});
    res.json(deletedBookmark);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

export const viewBookmarks = async(req, res) => {
  try {
    const id = parseInt(req.user.userId);
    const bookmarks = await prisma.bookmark.findMany({ where: {user_id: id}});
    res.json(bookmarks);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}