const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
  },
  { timestamps: { createdAt: "createdAt" } }
);

let Task = mongoose.model("tasks", taskSchema);
module.exports = Task;
