import { describe, test, expect } from "bun:test";
import { parse } from "..";

describe("parse", () => {
    test("case '+'", () => {
        const result = parse("+ New todo")
        expect(result).toEqual({
            operation: "+",
            argument: "New todo"
        })
    })
})
