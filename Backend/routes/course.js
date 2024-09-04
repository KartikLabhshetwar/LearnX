const express = require("express");
const router = express.Router();
const { users, course } = require("../db");
const authMiddleware = require("../middleware");

// Add this route at the top of your file, before any routes with parameters
router.get("/purchasedCourses", authMiddleware, async (req, res) => {
  console.log('Fetching purchased courses');
  console.log('User ID from token:', req.userId); // Change this line
  try {
    const userId = req.userId; // Change this line
    const user = await users.findOne({ _id: userId });
    console.log('User found:', user ? 'Yes' : 'No');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const purchasedCourses = await course.find({ _id: { $in: user.purchasedCourses || [] } });
    console.log('Purchased courses:', purchasedCourses.length);
    res.json({ courses: purchasedCourses });
  } catch (error) {
    console.error("Error fetching purchased courses:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/courses", async (req, res) => {
  try {
    const courses = await course.find({});
    res.json({
      courses: courses,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const foundCourse = await course.findById(courseId);
    if (!foundCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ courses: foundCourse });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/:courseId/purchase", authMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.headers.userId;

  try {
    const user = await users.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const courseExists = await course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (user.purchasedCourses && user.purchasedCourses.includes(courseId)) {
      return res.status(400).json({
        message: "Course already purchased",
      });
    }

    await users.updateOne(
      { _id: userId },
      {
        $addToSet: {
          purchasedCourses: courseId,
        },
      }
    );

    res.json({
      message: "Purchase complete.",
    });
  } catch (error) {
    console.error("Error purchasing course:", error);
    res.status(500).json({ 
      message: "Server error while purchasing course", 
      error: error.message 
    });
  }
});

module.exports = router;
