const express = require("express");
const { addCart, updateCart, deleteCart, getCart, getCarts } = require("../controllers/cart");
const { protect, verifyTokenAndAuthorization, verifyTokenAndAuthorization1, verifyTokenAndAdmin } = require("../middleware/auth");
const router = express.Router()

router.route("/").post(protect,addCart);
router.route("/:userId/:id").put(verifyTokenAndAuthorization1,updateCart)
router.route("/:userId/:id").delete(verifyTokenAndAuthorization1,deleteCart)
router.route("/find/:userId").get(verifyTokenAndAuthorization1,getCart)
router.route("/").get(verifyTokenAndAdmin,getCarts)



module.exports = router