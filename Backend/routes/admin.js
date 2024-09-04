const express = require("express")
const router = express.Router();
const z = require("zod");
const { course, Admin } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const authMiddleware = require("../middleware");

const adminSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

router.post("/signup", async (req, res) => {
  const parseSchema = adminSchema.safeParse(req.body);

  if (!parseSchema.success) {
    return res.status(411).json({
      message: "Incorrect inputs.",
    });
  }

  const existingAdmin = await Admin.findOne({
    username: req.body.username,
  });

  if (existingAdmin) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const admin = await Admin.create({
    username: req.body.username,
    password: req.body.password,
  });

  const adminId = admin._id;

  const token = jwt.sign({ adminId }, JWT_SECRET);

  res.json({
    message: "Admin created Successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const validateAdmin = adminSchema.safeParse(req.body);
  if (validateAdmin.success != true) {
    return res.status(411).json({
      message: "Incorrect inputs.",
    });
  }

  const existingAdmin = await Admin.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (existingAdmin) {
    const token = jwt.sign({ adminId: existingAdmin._id }, JWT_SECRET);
    res.json({
      token: token,
    });

    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

router.post("/courses", authMiddleware, async (req, res) => {
  const { title, description, price, image } = req.body;
  
  const newCourse = new course({
    title,
    description,
    price,
    image
  });

  await newCourse.save();

  res.status(201).json({ message: 'Course created successfully', course: newCourse });
});

router.get("/me", authMiddleware, async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, JWT_SECRET);
  const adminId = decodedToken.adminId;
  const admin = await Admin.findOne({ _id: adminId });
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }
  res.json({ admin });
});

router.get("/admin/courses", authMiddleware, async (req, res) => {
  const courses = await course.find({});
  res.json({
    courses: courses,
  });
});



module.exports = router