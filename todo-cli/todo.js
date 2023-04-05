const todoList = () => {
  const all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter((item) => !item.completed && new Date(item.dueDate) < new Date());
  };

  const dueToday = () => {
    return all.filter((item) => !item.completed && new Date(item.dueDate).toISOString().split('T')[0] === new Date().toISOString().split('T')[0]);
  };

  const dueLater = () => {
    return all.filter((item) => !item.completed && new Date(item.dueDate) > new Date());
  };

  const toDisplayableList = (list) => {
    return list.map((item) => {
      return `[${item.completed ? 'x' : ' '}] ${item.title} ${formattedDate(new Date(item.dueDate))}`;
    }).join('\n');
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

const formattedDate = (d) => {
  return d.toISOString().split('T')[0];
};

const dateToday = new Date();
const yesterday = formattedDate(new Date(dateToday.setDate(dateToday.getDate() - 1)));
const today = formattedDate(new Date());
const tomorrow = formattedDate(new Date(dateToday.setDate(dateToday.getDate() + 1)));

todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false });
todos.add({ title: 'Pay rent', dueDate: today, completed: true });
todos.add({ title: 'Service vehicle', dueDate: today, completed: false });
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false });
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false });

console.log('My Todo-list\n');

console.log('Overdue');
const overdues = todos.overdue();
const formattedOverdues = todos.toDisplayableList(overdues);
console.log(formattedOverdues);
console.log('\n');

console.log('Due Today');
const itemsDueToday = todos.dueToday();
const formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsDueToday);
console.log('\n');

console.log('Due Later');
const itemsDueLater = todos.dueLater();
const formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
console.log(formattedItemsDueLater);
console.log('\n');
