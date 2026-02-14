import { createContext, useMemo } from "react";
import useTasks from "../hooks/useTasks";
import useIncompleteTaskScroll from "../hooks/useIncompleteTaskScroll";

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
    const { children } = props

    const tasksData = useTasks();

    const { tasks } = tasksData;
    
    const contextValue = useMemo(() => ({
        ...tasksData
    }), [tasksData]);

    const {} = useIncompleteTaskScroll(tasks)

    return (
        <TasksContext.Provider value={contextValue}>
            {children}
        </TasksContext.Provider>
    )
}