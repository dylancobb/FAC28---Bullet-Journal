function test(name, testFunction) {
  console.group(name);
  testFunction();
  console.groupEnd(name);
}

function equal(actual, expected, message) {
  if (actual === expected) {
    const defaultMessage = `Expected ${expected} and received ${actual}`;
    console.info("Pass: " + (message || defaultMessage));
  } else {
    const defaultMessage = `Expected ${expected} but received ${actual} instead`;
    console.error("Fail: " + (message || defaultMessage));
  }
}

function notEqual(actual, expected, message) {
  if (actual !== expected) {
    const defaultMessage = `${expected} is different to ${actual}`;
    console.info("Pass: " + (message || defaultMessage));
  } else {
    const defaultMessage = `${expected} is the same as ${actual}`;
    console.error("Fail: " + (message || defaultMessage));
  }
}

// test('Submitting a task should add task to list', () => {
//   // Get all inputs
//   const toDoContainer = document.getElementById('to-do-container');
//   const taskInput = document.getElementById('task-input');
//   // Write the task
//   taskInput.value = 'testing 123';

//   // Submit the task
//   const submitButton = document.querySelector('button[type="submit"]');
//   submitButton.click();

//   // Check that the task was added
//   const result = toDoContainer.firstChild;
//   equal(result.textContent, 'testing 123');
// })

test("Adding tasks", () => {
  // Get all inputs
  const toDoContainer = document.getElementById("to-do-container");
  const taskInput = document.getElementById("task-input");
  // Write the task
  taskInput.value = "testing 123";

  // Submit the task
  const submitButton = document.querySelector('button[type="submit"]');
  submitButton.click();

  // Check that the task was added
  const result = toDoContainer.getElementsByTagName("li")[0];
  equal(result.textContent, "testing 123");

  // Add another task
  taskInput.value = "testing 456";

  // Submit the task
  const submitButton2 = document.querySelector('button[type="submit"]');
  submitButton2.click();

  // Check that the task was added
  const result2 = toDoContainer.getElementsByTagName("li")[1];
  equal(result2.textContent, "testing 456");

  //Check total number of tasks
  equal(toDoContainer.getElementsByTagName("li").length, 2);

  // Remove the second task
  result2.remove();
});

test("Clicking on a task should strike it through", () => {
  // Get all inputs
  const testTask = document.toDoContainer.getElementsByTagName("li")[0];

  // Click on the task
  testTask.click();

  // Check that the task was striked through
  const result = testTask.classList.contains("strike-through");
  equal(result, true);

  // Click again
  testTask.click();

  // Check that the task is not striked through
  const result2 = testTask.classList.contains("strike-through");
  equal(result2, false);

  // Remove the task
  testTask.remove();
});
