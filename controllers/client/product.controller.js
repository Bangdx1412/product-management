const ProductCategory = require("../../models/products-category.model");
const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");
const productCategoryHelper = require("../../helpers/product-category");
// [GET] /products
module.exports.index = async (req, res) => {
  // Get all products
  try {
    const products = await Product.find({
      status: "active",
      deleted: false,
    });
    const productNew = productsHelper.priceNewProducts(products);
    res.render("client/pages/products/index", {
      pageTitle: "Trang danh sach san pham",
      products: productNew,
    });
  } catch (error) {
    res.redirect(`/`);
  }
};
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slugProduct,
      status: "active",
    };
    const product = await Product.findOne(find).select("-updatedBy");
    // console.log(product);
    
    if(product.product_category_id){
      const category = await ProductCategory.findOne({
        _id: product.product_category_id,
        status:"active",
        deleted:false
      })
      // console.log(category);
      
      product.category = category;
    }
    // console.log(product);
   product.priceNew = productsHelper.priceNewProduct(product)
    
    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect(`/products`);
  }
};
module.exports.category = async (req, res) => {
  const category = await ProductCategory.findOne({
    slug: req.params.slugCategory,
    status:"active",
    deleted: false,
  });
  
  const listSubCategory = await productCategoryHelper.getSubCategory(category.id);
  const listSubCategoryId = listSubCategory.map(item=>item.id)
  const products = await Product.find({
    product_category_id: { $in: [category.id, ...listSubCategoryId] },
    deleted: false,
  }).sort({ position: "desc" });
  const productNew = productsHelper.priceNewProducts(products);
  res.render("client/pages/products/index", {
    pageTitle: category.title,
    products: productNew,
  });
};
