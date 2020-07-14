const {
  createTask,
  getAllTasksForUser,
  deleteTask,
} = require("../services/task.service");

module.exports = {
  createTask: (req, res) => {
    const body = req.body;
    // If there is no group of tasks set, then set it to null
    !body.group && (body.group = null);
    createTask(body, (error, results) => {
      if (error) {
        console.error(error);
        return res.json({
          success: false,
          message: "Something went wrong",
        });
      }
      return res.json({
        success: true,
        data: results,
        message: "Task created successfully",
      });
    });
  },
  getAllTasksForUser: (req, res) => {
    const userId = req.params.userId;
    getAllTasksForUser(userId, (error, results) => {
      if (error) {
        console.error(error);
        return res.json({
          success: false,
          message: "Something went wrong",
        });
      }
      if (!results) {
        return res.json({ success: false, message: "Tasks not found" });
      }
      return res.json({ success: true, data: results });
    });
  },
  deleteTask: (req, res) => {
    const taskId = req.body.taskId;
    deleteTask(taskId, (error, results) => {
      if (error) {
        console.error(error);
        return res.json({
          success: false,
          message: "Something went wrong",
        });
      }
      console.log(results);
      if (!results)
        return res.json({ success: false, message: "Task not found" });
      return res.json({
        success: true,
        message: "Task deleted successfully",
        data: results,
      });
    });
  },
};