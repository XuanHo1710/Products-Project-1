const express = require('express');
const router = express.Router();
const productsController = require('../../controller/admin/products.controller');
const multer = require("multer");
const storageMulter = require("../../helper/storageMulter");
const upload = multer({ storage: storageMulter() });

const validate = require("../../validates/admin/product.validate");

router.get('/', productsController.index);

router.patch("/change-status/:status/:id", productsController.changeStatus);
router.patch("/change-multi", productsController.changeMulti);

router.delete("/delete/:id", productsController.deleteItem);


router.get('/create', productsController.create);
router.post(
            '/create', 
            upload.single("thumbnail"),
            validate.createPost, 
            productsController.createPost
  );

router.get("/edit/:id", productsController.edit);
router.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    validate.createPost,
    productsController.editPatch
);

router.get("/detail/:id", productsController.detail);

module.exports = router;