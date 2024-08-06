interface TodoItem {
    id: number,
    title: string,
    status: StatusEnum,
    completedOn?: Date
}

enum StatusEnum {
    DONE = "done",
    INPROGRESS = "in-progress",
    TODO = "todo"
}

const todoItems: TodoItem[] = [
    { id: 1, title: "Learn HTML", status: StatusEnum.DONE, completedOn: new Date("2021-09-11") },
    { id: 2, title: "Learn TypeScript", status: StatusEnum.INPROGRESS },
    { id: 3, title: "Write the best app in the world", status: StatusEnum.TODO },
]

function addTodoItem(todo: string): TodoItem {
    const id = getNextId(todoItems)

    const newTodo = {
        id,
        title: todo,
        status: StatusEnum.TODO,
    }

    todoItems.push(newTodo)

    return newTodo
}

function getNextId(items: TodoItem[]): number {
    return items.reduce((max, x) => x.id > max ? x.id : max, 0) + 1
}

const newTodo = addTodoItem("Buy lots of stuff with all the money we make from the app")

console.log(JSON.stringify(newTodo))
