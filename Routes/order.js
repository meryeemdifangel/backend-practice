const express = require("express")
const { addOrder, updateOrder, deleteOrder, getOrder, getOrders } = require("../controllers/order")
const { verifyTokenAndAuthorization1, protect, verifyTokenAndAdmin } = require("../middleware/auth")
const router = express.Router()

router.route("/").post(protect,addOrder);
router.route("/:id").put(verifyTokenAndAdmin,updateOrder);
router.route("/:id").delete(verifyTokenAndAdmin,deleteOrder);
router.route("/find/:userId").get(verifyTokenAndAuthorization1,getOrder);
router.route("/").get(verifyTokenAndAdmin,getOrders);

module.exports = router