
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    // Common Fields
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['student', 'faculty'],
      default: 'student',
    },

    phone: {
      type: String,
      default: '',
    },

    bio: {
      type: String,
      default: '',
    },

    profileImage: {
      type: String,
      default: '',
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Student Fields
    department: {
      type: String,
      default: '',
    },

    semester: {
      type: String,
      default: '',
    },

    rollNumber: {
      type: String,
      default: '',
    },

    course: {
      type: String,
      default: '',
    },

    attendance: {
      type: Number,
      default: 0,
    },

    averageScore: {
      type: Number,
      default: 0,
    },

    assignmentCount: {
      type: Number,
      default: 0,
    },

    examCount: {
      type: Number,
      default: 0,
    },

    // Faculty Fields
    designation: {
      type: String,
      default: '',
    },

    specialization: {
      type: String,
      default: '',
    },

    qualification: {
      type: String,
      default: '',
    },

    experience: {
      type: Number,
      default: 0,
    },

    subjects: [
      {
        type: String,
      },
    ],

    employeeId: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Hash Password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );
});
// Compare Password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);

