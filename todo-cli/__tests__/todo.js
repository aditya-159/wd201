const todoList = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("Todo List Test suite", () => {
  // Before starting all tests
  beforeAll(() => {
    add({
      title: "First Checking",
      dueDate: new Date().toISOString().slice(0,10),
      completed: false,
    });
  });

  // checking if the add function is working
  test("Adding a new item", () => {
    const todoLength = all.length;
    add({
      title: "tests item",
      dueDate: new Date().toISOString().slice(0,10),
      completed: false,
    });
    expect(all.length).toBe(todoLength + 1);
  });

  // checking if the markAsComplete function is working
  test("markasComplete", () => {
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  // checking if the overdue function is working
  test("Overdue", () => {
    add({
      title: "all the test overdued",
      dueDate: new Date(
        new Date().setDate(new Date().getDate() - 2)
      ).toISOString().slice(0,10),
      completed: false,
    });
    expect(overdue().length).toBe(1);
  });

  // checking if the dueToday function is working
  test("Today is the day", () => {
    expect(dueToday().length).toBe(2);
  });

  // checking if the dueLater function is working
  test("later items", () => {
    add({
      title: "Later work",
      dueDate: new Date(
        new Date().setDate(new Date().getDate() + 2)
      ).toISOString().slice(0,10),
      completed: false,
    });
    expect(dueLater().length).toBe(1);
  });
});