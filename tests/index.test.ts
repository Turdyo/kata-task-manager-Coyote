import { describe, test, expect, spyOn } from "bun:test";
import { parse, selectOperation } from "../src";
import { TaskManager } from "../src/Taskmanager";

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

describe('selectOperation', () => {
    test('Add a task', () => {
        const spy = spyOn(TaskManager.prototype, 'addTask');
        selectOperation({operation: '+', argument: 'New task'})
        expect(spy).toHaveBeenCalled();
    })

    test('Remove a task', () => {
        const spy = spyOn(TaskManager.prototype, 'remove');
        selectOperation({operation: '-', argument: '1'})
        expect(spy).toHaveBeenCalled();
    })

    test('Set a task to done', () => {
        const spy = spyOn(TaskManager.prototype, 'markAsDone');
        selectOperation({operation: 'x', argument: '1'})
        expect(spy).toHaveBeenCalled();
    })

    test('set a task as "to do"', () => {
        const spy = spyOn(TaskManager.prototype, 'markAsTodo');
        selectOperation({operation: 'o', argument: '1'})
        expect(spy).toHaveBeenCalled();
    })

    test('Exit', () => {
        const spy = spyOn(process, 'exit');
        selectOperation({operation: 'q'})
        expect(spy).toHaveBeenCalled();
    })
})