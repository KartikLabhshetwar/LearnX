const { default: mongoose } = require("mongoose");
const db = require("mongoose");
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const userSchema = new db.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            minLength: 3,
            maxLength: 30,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        }, 
        lastName: {
            type:String,
            required: true,
            trim: true,
            maxLength: 50
        },
        purchasedCourses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "course"
        }]
});

const CourseSchema = new db.Schema({
    title: String,
    description: String,
    price: Number,
    image: String
})

const orderSchema = new db.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Changed from "course" to "users"
    required: true,
  },
  courseId: {
    // Added courseId
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  razorpayOrderId: {
    // Added razorpayOrderId
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AdminSchema = new db.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const Admin = db.model("admins", AdminSchema);
const users = db.model("users", userSchema)
const course = db.model("course", CourseSchema)
const orders = db.model("orders", orderSchema)

module.exports = {
    users,
    course,
    orders,
    Admin
}