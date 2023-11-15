import { Task } from "./type"

export class TaskManager {
    tasks: Task[] = []
    id: number = 1

    addTask(description: string) {
        this.tasks.push({
            description,
            id: this.id,
            status: "to do"
        })
        this.id = this.id + 1
    }
    
    remove(id: number) {
        this.tasks = this.tasks.filter(todo => todo.id !== id)
    }

    markAsDone(id: number) {
        this.tasks = this.tasks.map(todo => {
            if (todo.id !== id) return todo
            return {
                ...todo,
                status: "done"
            }
        })
    }

    markAsTodo(id: number) {
        this.tasks = this.tasks.map(todo => {
            if (todo.id !== id) return todo
            return {
                ...todo,
                status: "to do"
            }
        })
    }
}