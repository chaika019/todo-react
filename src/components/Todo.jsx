import { useContext } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import Todoinfo from "./ToDoInfo"
import TodoList from "./TodoList"
import Button from "./Button"
import { TasksContext } from "../context/TasksContext"

const Todo = () => {

  const { firstIncompleteTaskRef } = useContext(TasksContext)

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm />
      <SearchTaskForm />
      <Todoinfo />
      <Button
        onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({ behavior: 'smooth' })}
      >
        Show first incomplite task
      </Button>
      <TodoList />
    </div>
  )
}

export default Todo