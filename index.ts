import { TaskManager } from "./Taskmanager"
import { Input, Operations } from "./type"

const MyTaskManager = new TaskManager()

export function parse(input: string): Input {
    const operation = input.at(0)
    if (operation === "q") return { operation }
    const argument = input.slice(2)
    return {
        operation: operation as Operations,
        argument
    }
}

export function selectOperation(input: Input) {
    if (input.operation === "+") {
        MyTaskManager.addTask(input.argument)
    } else if (input.operation === "-") {
        MyTaskManager.remove(parseInt(input.argument))
    } else if (input.operation === "x") {
        MyTaskManager.markAsDone(parseInt(input.argument))
    } else if (input.operation === "o") {
        MyTaskManager.markAsTodo(parseInt(input.argument))
    } else if (input.operation === "q") {
        process.exit()
    }
}

async function main() {
    MyTaskManager.tasks.forEach(task => console.write(`${task.id} [${task.status === "done" ? "X" : " "}] ${task.description}`))
    const promptMessage = "Enter prompt (+, -, o, x, q) : "
    process.stdout.write(promptMessage)
    
    for await (const line of console) {
        const parsedInput = parse(line)
        selectOperation(parsedInput)
        MyTaskManager.tasks.forEach(task => console.write(`${task.id} [${task.status === "done" ? "X" : " "}] ${task.description}\n`))
        process.stdout.write(promptMessage)
    }
}

main()