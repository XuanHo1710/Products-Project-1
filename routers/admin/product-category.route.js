const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/products-category.controller");

const multer = require("multer");
const storageMulter = require("../../helper/storageMulter");
const upload = multer({ storage: storageMulter() });

const validate = require("../../validates/admin/product-category.validate");


router.get("/", controller.index);

router.patch("/change-multi", controller.changeMulti);

router.get("/create", controller.create);


router.post(
  '/create', 
  upload.single("thumbnail"),
  validate.createPost, 
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.createPost,
  controller.editPatch
);



module.exports = router;