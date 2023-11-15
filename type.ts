export type Task = {
    id: number
    description: string
    status: "done" | "to do"
}

export type Operations = "+" | "-" | "x" | "o"

export type Input = { operation: Operations, argument: string } | { operation: "q" }