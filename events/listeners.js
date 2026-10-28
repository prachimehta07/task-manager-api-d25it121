const taskEvents = require("./taskEvents");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

taskEvents.on("task-created", async (task) => {
  try {
    console.log(`[Listener] task-created started at ${new Date().toISOString()}`);
    await delay(2000); // simulates a slow notification (email, push, etc.)
    console.log(
      `[Notification] Task "${task.title}" created by user ${task.user} at ${new Date().toISOString()}`
    );
  } catch (err) {
    taskEvents.emit("error", err);
  }
});

taskEvents.on("task-deleted", (task) => {
  console.log(`[Notification] Task "${task.title}" deleted at ${new Date().toISOString()}`);
});

taskEvents.on("error", (err) => {
  console.error(`[Event Error] ${err.message}`);
});