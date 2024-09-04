const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const RazorPay = require("razorpay");
const { orders, users } = require("../db");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/orders", async (req, res) => {
  try {
    const instance = new RazorPay({
      key_id: process.env.RAZORPAY_ID_KEY,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, async (error, order) => {
      if (error) {
        console.log("Error creating order:", error);
        return res.status(500).json({
          message: "Error creating order. Please try again.",
        });
      }

      const { userId, courseId } = req.body;

      const newOrder = new orders({
        userId,
        courseId,
        amount: req.body.amount,
        paymentStatus: "pending",
        razorpayOrderId: order.id,
      });

      try {
        const savedOrder = await newOrder.save();
        res.status(200).json({
          data: { ...order, dbOrderId: savedOrder._id },
        });
      } catch (error) {
        console.log("Error saving order:", error);
        return res.status(500).json({
          message: "Error saving order. Please try again.",
        });
      }
    });
  } catch (e) {
    console.log("Error:", e);
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      console.log(
        "Attempting to update order with razorpayOrderId:",
        razorpay_order_id
      );

      const updatedOrder = await orders.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { paymentStatus: "success" },
        { new: true }
      );

      if (updatedOrder) {
        console.log("Order updated successfully:", updatedOrder);

        // Update user's purchasedCourses
        try {
          await users.findByIdAndUpdate(updatedOrder.userId, {
            $addToSet: { purchasedCourses: updatedOrder.courseId },
          });
          console.log("User's purchasedCourses updated successfully");
        } catch (userUpdateError) {
          console.error(
            "Error updating user's purchasedCourses:",
            userUpdateError
          );
          // Note: We're not failing the whole process if this update fails
        }

        res.status(200).json({
          message: "Payment verified successfully.",
          order: updatedOrder,
        });
      } else {
        console.log("Order not found with razorpayOrderId:", razorpay_order_id);
        res.status(404).json({
          message: "Order not found.",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid Signature sent!",
      });
    }
  } catch (e) {
    console.log("Error in /verify route:", e);
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

module.exports = router;
