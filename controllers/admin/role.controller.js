const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
// [GET] /admin/dashboard
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/pages/roles/index", {
    pageTitle: "Nhóm quyền",
    records: records,
  });
};
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Create Quyen",
  });
};
module.exports.createPost = async (req, res) => {
  const records = new Role(req.body);
  await records.save();
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Role.findOne({ _id: id, deleted: false });

    res.render("admin/pages/roles/edit", {
      pageTitle: "Edit Quyen",
      data: data,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    await Role.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật trạng thái thành công");
    res.redirect(req.get("Referrer") || "/");
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};
