import { describe, test, expect, beforeEach } from "bun:test";
import { TaskManager, parse } from "..";

describe("parse", () => {
    test("case '+'", () => {
        const result = parse("+ New todo")
        expect(result).toEqual({
            operation: "+",
            argument: "New todo"
        })
    })
    test("case 'q'", () => {
        const result = parse("q")
        expect(result).toEqual({
            operation: "q"
        })
    })
})

describe("add operation", () => {
    let MyTaskManager: TaskManager
    beforeEach(() => {
        MyTaskManager = new TaskManager()
    })
    test("normal case", () => {
        MyTaskManager.addTodo("Learn Java")
        expect(MyTaskManager.todos).toEqual([{
            id: 1,
            description: "Learn Java",
            status: "to do"
        }])
    })
    test("multiple todos", () => {
        const todos = ["Learn Python", "Learn C#"]
        todos.forEach(todo => MyTaskManager.addTodo(todo))
        expect(MyTaskManager.todos).toEqual([{
            id: 1,
            description: "Learn Python",
            status: "to do"
        },
        {
            id: 2,
            description: "Learn C#",
            status: "to do"
        }])
    })
})

describe('remove operation', () => {
    let MyTaskManager: TaskManager;
    beforeEach(() => {
        MyTaskManager = new TaskManager();
        MyTaskManager.todos = [{
            id: 1,
            description: "Learn Python",
            status: "to do",
        },
        {
            id: 2,
            description: "Learn C#",
            status: "to do"
        }] 
    })
    test("remove 1", () => {
        MyTaskManager.remove(1)
        expect(MyTaskManager.todos).toEqual([
        {
            id: 2,
            description: "Learn C#",
            status: "to do"
        }])
    })
    test("remove multiple", () => {
        [1, 2].forEach(id => {
            MyTaskManager.remove(id)
        })
        expect(MyTaskManager.todos).toEqual([])
    })
    test("remove on empty list", () => {
        MyTaskManager.todos = []
        MyTaskManager.remove(1)
        expect(MyTaskManager.todos).toEqual([]);
    })
})