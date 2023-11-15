import { Database } from "bun:sqlite"

const db = new Database("db.sqlite")

type Todo = {
    id: number
    description: string
    status: "done" | "to do"
}

export function parse(input: string): { operation: string, argument?: string } {
    const operation = input.at(0) as string
    if (input.length === 1) return { operation }
    const argument = input.slice(2)
    return { operation, argument }
}

export class TaskManager {
    todos: Todo[] = []
    id: number = 1

    addTodo(description: string) {
        this.todos.push({
            description,
            id: this.id,
            status: "to do"
        })
        this.id = this.id + 1
    }
    
    remove(id: number) {
        this.todos = this.todos.filter(todo => todo.id !== id)
    }

    markAsDone(id: number) {
        this.todos = this.todos.map(todo => {
            if (todo.id !== id) return todo
            return {
                ...todo,
                status: "done"
            }
        })
    }

    markAsTodo(id: number) {
        this.todos = this.todos.map(todo => {
            if (todo.id !== id) return todo
            return {
                ...todo,
                status: "to do"
            }
        })
    }
}