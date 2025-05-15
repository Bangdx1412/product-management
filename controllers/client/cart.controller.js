const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
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
