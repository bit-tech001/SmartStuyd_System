export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Common Fields
    if (req.body.name !== undefined)
      user.name = req.body.name;

    if (req.body.phone !== undefined)
      user.phone = req.body.phone;

    if (req.body.bio !== undefined)
      user.bio = req.body.bio;

    // Student Fields
    if (user.role === "student") {
      if (req.body.department !== undefined)
        user.department = req.body.department;

      if (req.body.semester !== undefined)
        user.semester = req.body.semester;

      if (req.body.rollNumber !== undefined)
        user.rollNumber = req.body.rollNumber;

      if (req.body.course !== undefined)
        user.course = req.body.course;
    }

    // Faculty Fields
    if (user.role === "faculty") {
      if (req.body.department !== undefined)
        user.department = req.body.department;

      if (req.body.designation !== undefined)
        user.designation = req.body.designation;

      if (req.body.specialization !== undefined)
        user.specialization =
          req.body.specialization;

      if (req.body.qualification !== undefined)
        user.qualification =
          req.body.qualification;
    }

    const updatedUser = await user.save();

    const safeUser = updatedUser.toObject();
    delete safeUser.password;

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: safeUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};