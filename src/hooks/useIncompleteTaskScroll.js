import { useRef, useMemo } from "react"

const useIncompleteTaskScroll = (tasks) => {
    const firstIncompleteTaskRef = useRef(null)
    const firstIncompleteTaskId = useMemo(() => {
        return tasks.find(({ isDone }) => !isDone)?.id
    }, [tasks])

    return {
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
    }
}

export default useIncompleteTaskScroll