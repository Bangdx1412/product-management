const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const Order = require("../../models/order.model");
const productHelper = require("../../helpers/products.js");
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({
    _id: cartId,
  });
  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const productId = item.product_id;
      const productInfo = await Product.findOne({ _id: productId }).select(
        "title thumbnail slug price discountPercentage"
      );
      productInfo.priceNew = productHelper.priceNewProduct(productInfo);
      item.productInfo = productInfo;
      item.totalPrice = item.quantity * productInfo.priceNew;
    }
  }
  cart.totalPrice = cart.products.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  res.render("client/pages/checkout/index", {
    pageTitle: "Đặt hàng",
    cartDetail: cart,
  });
};
module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfo = req.body;
  const cart = await Cart.findOne({
    _id: cartId,
  });
  const products = [];
  for (const product of cart.products) {
    const objectProduct = {
      product_id: product.product_id,
      quantity: product.quantity,
      price: 0,
      discountPercentage: 0,
    };
    const productInfo = await Product.findOne({
      _id: product.product_id,
    }).select("price discountPercentage");
    objectProduct.price = productInfo.price;
    objectProduct.discountPercentage = productInfo.discountPercentage;

    products.push(objectProduct);
  }
  const orderInfo = {
    cart_id: cartId,
    userInfo: userInfo,
    products: products,
  };
  const order = new Order(orderInfo);
  await order.save();

  await Cart.updateOne(
    { _id: cartId },
    {
      products: [],
    }
  );
  res.redirect(`/checkout/success/${order._id}`);
};
module.exports.success = async (req, res) => {
  console.log(req.params.orderId);
  res.render("client/pages/checkout/success", {
    pageTitle: "Đặt hàng thành công",
  });
};
