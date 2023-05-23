import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";

async function getProducts(req, res) {
  try {
    const products = await Product.find();

    const productWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });

        return {
          ...product._doc,
          stat,
        };
      })
    );
    return res.status(200).json(productWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export { getProducts };
