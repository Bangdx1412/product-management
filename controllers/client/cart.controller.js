const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productHelper = require("../../helpers/products.js");
module.exports.add = async (req, res) => {
  const productID = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({ _id: cartId });
  // Check if the product exists
  //   Đây là hàm find trong js nó sử dụng để tìm kiếm trong cái object đã tồn tại sản phẩm chưa
  const existsProductInCart = cart.products.find(
    (item) => item.product_id == productID
  );
  if (existsProductInCart) {
    // Cập nhật lại object
    const newQuantity = quantity + existsProductInCart.quantity;
    await Cart.updateOne(
      { _id: cartId, "products.product_id": productID },
      {
        $set: {
          "products.$.quantity": newQuantity,
        },
      }
    );
  } else {
    const objectCart = {
      product_id: productID,
      quantity: quantity,
    };
    await Cart.updateOne(
      { _id: cartId },
      {
        $push: {
          products: objectCart,
        },
      }
    );
  }
  req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công");
  res.redirect(req.get("Referrer") || "/");
};
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
  cart.totalPrice = cart.products.reduce((total, item) => total + item.quantity*item.totalPrice, 0);

  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng",
    cartDetail: cart,
  });
};
