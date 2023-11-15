import { describe, test, expect, beforeEach, beforeAll } from "bun:test";
import { TaskManager } from "../src/Taskmanager";

describe("add operation", () => {
    let MyTaskManager: TaskManager
    beforeEach(() => {
        MyTaskManager = new TaskManager()
    })
    test("Add one task", () => {
        MyTaskManager.addTask("Learn Java")
        expect(MyTaskManager.tasks).toEqual([{
            id: 1,
            description: "Learn Java",
            status: "to do"
        }])
    })
    test("Add multiple operations", () => {
        const tasks = ["Learn Python", "Learn C#"]
        tasks.forEach(todo => MyTaskManager.addTask(todo))
        expect(MyTaskManager.tasks).toEqual([{
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
        MyTaskManager.tasks = [{
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
        expect(MyTaskManager.tasks).toEqual([
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
        expect(MyTaskManager.tasks).toEqual([])
    })
    test("remove on empty list", () => {
        MyTaskManager.tasks = []
        MyTaskManager.remove(1)
        expect(MyTaskManager.tasks).toEqual([]);
    })
})

describe('markAsDone', () => {

    let MyTaskManager: TaskManager;

    beforeAll(() => {
        MyTaskManager = new TaskManager();
        MyTaskManager.tasks = [{
            id: 1,
            description: "Learn Python",
            status: "to do"
        },
        {
            id: 2,
            description: "Learn C#",
            status: "done"
        }]
    })

    test('Change one task status', () => {
        MyTaskManager.markAsDone(1);
        expect(MyTaskManager.tasks.at(0)).toEqual({
            id: 1,
            description: "Learn Python",
            status: "done"
        })
    })

    test('Set a done task to done again', () => {
        MyTaskManager.markAsDone(2);
        expect(MyTaskManager.tasks.at(1)).toEqual({
            id: 2,
            description: "Learn C#",
            status: "done"
        })
    })
})

describe('markAsTodo', () => {

    let MyTaskManager: TaskManager;

    beforeAll(() => {
        MyTaskManager = new TaskManager();
        MyTaskManager.tasks = [{
            id: 1,
            description: "Learn Python",
            status: "to do"
        },
        {
            id: 2,
            description: "Learn C#",
            status: "done"
        }]
    })

    test('Change one task status', () => {
        MyTaskManager.markAsTodo(2);
        expect(MyTaskManager.tasks.at(1)).toEqual({
            id: 2,
            description: "Learn C#",
            status: "to do"
        })
    })

    test('Set a "to do" task to "to do" again', () => {
        MyTaskManager.markAsTodo(1);
        expect(MyTaskManager.tasks.at(0)).toEqual({
            id: 1,
            description: "Learn Python",
            status: "to do"
        })
    })
})