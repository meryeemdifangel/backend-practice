const Product = require("./../Modals/Product");
const router = require("express").Router();
const { addProduct , updateProduct , deleteProduct , getProduct , getProducts } = require("../controllers/product");
const { protect, verifyTokenAndAdmin } = require("../middleware/auth");

router.route("/").post( verifyTokenAndAdmin,addProduct);
router.route("/:id").put(verifyTokenAndAdmin , updateProduct )
router.route("/:id").delete(verifyTokenAndAdmin , deleteProduct )
router.route("/:id").get(getProduct)
router.route("/").get(getProducts)


module.exports = router;