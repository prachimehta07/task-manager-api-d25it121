let tasks = [
  { id: 1, title: "Set up Express server", completed: true },
  { id: 2, title: "Build CRUD routes", completed: false },
];

let nextId = 3;

module.exports = { tasks, getNextId: () => nextId++ };