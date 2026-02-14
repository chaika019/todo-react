import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import useTasksLocalStorage from "./useTasksLocalStorage";

const useTasks = () => {
    const {
        savedTasks,
        saveTasks,
    } = useTasksLocalStorage()

    const [tasks, setTasks] = useState(savedTasks ?? [
            { id: 'task-1', title: 'Поесть', isDone: false },
            { id: 'task-2', title: 'Памыца', isDone: true }
        ])

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const newTaskInputRef = useRef(null)

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm('Are you sure ')

        if (isConfirmed) {
            setTasks([])
        }
    }, [])

    const deleteTask = useCallback((taskId) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId))
    }, [])

    const toggleTaskComplete = useCallback((taskId, isDone) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === taskId ? { ...task, isDone } : task))
        )
    }, [])

    const addTask = useCallback(() => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            }

            setTasks((prevTasks) => [...prevTasks, newTask])
            setNewTaskTitle('')
            setSearchQuery('')
            newTaskInputRef.current.focus()
        }
    }, [newTaskTitle])

    useEffect(() => {
        saveTasks(tasks)
    }, [tasks])

    useEffect(() => {
        newTaskInputRef.current.focus()
    }, [])

    const filteredTasks = useMemo(() => {
        const clearSearchQuery = searchQuery.trim().toLowerCase()

        return clearSearchQuery.length > 0
            ? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
            : null
    }, [searchQuery, tasks])

    return {
        tasks,
        filteredTasks,
        deleteAllTasks,
        deleteTask,
        toggleTaskComplete,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
    }
}

export default useTasks