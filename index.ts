import { Database } from "bun:sqlite"

const db = new Database("db.sqlite")

export function parse(input: string): { operation: string, argument?: string } {
    const operation = input.at(0) as string
    if (input.length === 1) return { operation }

    const argument = input.slice(2)
    console.log(argument)

    return { operation, argument }
}