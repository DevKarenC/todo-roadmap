import { localStorageTodoLists } from './TodoList';
import { navListContainer, renderTodoList } from './AddTodoList';
import { showImageOnLoad } from './ShowImageOnLoad';
import { renderNewTodo } from './AddTodo';
import { editTodo } from './EditTodo';

const main = document.querySelector('main');
const todoListMain = document.createElement('div');
const todoListHeading = document.createElement('div');
const todoListName = document.createElement('div');
const todoListInput = document.createElement('input');
const taskContainer = document.createElement('div');
const addNewTask = document.createElement('div');
const button = document.createElement('button');
const plusSpan = document.createElement('span');
const todoForm = document.createElement('form');
const todoInput = document.createElement('input');

todoListMain.classList.add('todo-list-main');
todoListHeading.classList.add('todo-list-heading');
todoListName.classList.add('todo-list-name');
taskContainer.classList.add('task-container');
addNewTask.classList.add('add-new-task');
todoForm.name = 'todoForm';
todoInput.name = 'todoInput';

let currentTodoList;

function renderTodoListPage(e) {
  todoListInput.value = e.target.textContent;
  plusSpan.textContent = '+';
  todoInput.type = 'text';
  todoInput.placeholder = 'Add a Todo';
  todoForm.append(todoInput);
  button.append(plusSpan, todoForm);
  addNewTask.append(button);
  todoListName.append(todoListInput);
  todoListHeading.append(todoListName);
  todoListMain.append(todoListHeading, taskContainer, addNewTask);
  main.append(todoListMain);
}

function removeTodoListPage() {
  main.querySelectorAll('*').forEach((child) => child.remove());
}

function handleDisplayPage(e) {
  if (e.target.tagName === 'A') {
    currentTodoList = localStorageTodoLists[e.target.dataset.index];
    const currentTodos = currentTodoList.todos;
    removeTodoListPage();
    renderTodoListPage(e);
    renderNewTodo(currentTodos, taskContainer);
    editTodo(currentTodos);
  } else if (e.target.tagName === 'I') {
    removeTodoListPage();
    showImageOnLoad();
  }
}

function displayPage() {
  navListContainer.addEventListener('click', (e) => {
    handleDisplayPage(e);
  });
  plusSpan.addEventListener('click', () => {
    const todoTitle = document.todoForm.todoInput.value;
    const currentTodos = currentTodoList.todos;
    if (todoTitle) {
      currentTodoList.addTodo(0, todoTitle, false, '', false, '');
      renderNewTodo(currentTodos, taskContainer);
      localStorage.setItem('todoLists', JSON.stringify(localStorageTodoLists));
      editTodo(currentTodos);
      document.todoForm.reset();
    }
  });
  todoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const todoTitle = this.todoInput.value;
    const currentTodos = currentTodoList.todos;
    if (todoTitle) {
      currentTodoList.addTodo(0, todoTitle, false, '', false, '');
      renderNewTodo(currentTodos, taskContainer);
      localStorage.setItem('todoLists', JSON.stringify(localStorageTodoLists));
      editTodo(currentTodos);
      this.reset();
    }
  });
}

todoListInput.addEventListener('change', (e) => {
  currentTodoList.renameTodoList(e.target.value);
  renderTodoList(localStorageTodoLists, navListContainer);
  localStorage.setItem('todoLists', JSON.stringify(localStorageTodoLists));
});

export { displayPage };
