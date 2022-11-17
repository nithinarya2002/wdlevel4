/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markComplete, add, overdue, dueLater, dueToday } = todoList();
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
let dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);
describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: today,
    });
  });
  test("Should add new todo", () => {
    add(
      {
        title: "Test todo",
        completed: false,
        dueDate: tomorrow,
        //console.log(dueDate),
      },
      {
        title: "Test todo",
        completed: false,
        dueDate: yesterday,
      }
    );
    const todoItemCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: yesterday,
    });

    expect(all.length).toBe(todoItemCount + 1);
  });
  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Should check retrieval of overdue items", () => {
    let listosTodos = overdue();
    expect(
      listosTodos.every((todo) => {
        let datecheck = todo.dueDate < today;
        return datecheck;
      })
    ).toBe(true);
  });
  test("Should check retrieval of duetoday items", () => {
    let listosTodos = dueToday();
    expect(
      listosTodos.every((todo) => {
        let datecheck = todo.dueDate === today;
        return datecheck;
      })
    ).toBe(true);
  });
  test("Should check retrieval of due later items", () => {
    let listosTodos = dueLater();
    expect(
      listosTodos.every((todo) => {
        let datecheck = todo.dueDate > today;
        return datecheck;
      })
    ).toBe(true);
  });
});
