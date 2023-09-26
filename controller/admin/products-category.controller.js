const ProductCategory = require("../../models/product-category.model");
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require('../../helper/search');
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helper/createTree");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  //Status 
  if (req.query.status){
    find.status = req.query.status;
  }

  //Filter Status 
  const filterStatus = filterStatusHelper(req.query);

  //Search
  const objectSearch = searchHelper(req.query);
  if(objectSearch.regex)
    find.title = objectSearch.regex;

  // Sort
  let sort = {};

  if(req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  // End Sort

  const records = await ProductCategory.find(find).sort(sort);

  const newRecords = createTreeHelper.createTree(records);

  res.render("admin/pages/products-category/index", {
    titlePage: "Danh mục sản phẩm",
    records: newRecords,
    filterStatus: filterStatus,
    objectSearch: objectSearch
  });
};

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false
  };
  const records = await ProductCategory.find(find);

  //Create Tree 
  const newRecords = createTreeHelper.createTree(records);
  //End Create Tree

  res.render("admin/pages/products-category/create", {
    titlePage: "Tạo danh mục sản phẩm",
    records: newRecords
  });
};

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  if(req.body.position == "") {
    const count = await ProductCategory.count();
    req.body.position = count + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }


  if(req.file)
    req.body.thumbnail = `/uploads/${req.file.filename}`;

  const record = new ProductCategory(req.body);
  await record.save();

  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await ProductCategory.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
      break;
    case "inactive":
      await ProductCategory.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
      break;
    case "delete-all":
      await ProductCategory.updateMany(
        { _id: { $in: ids } },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      );
      req.flash("success", `Đã xóa thành công ${ids.length} sản phẩm!`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await ProductCategory.updateOne({ _id: id }, {
          position: position
        });
      }
      req.flash("success", `Đã đổi vị trí thành công ${ids.length} sản phẩm!`);
      break;
    default:
      break;
  }

  res.redirect("back");
};