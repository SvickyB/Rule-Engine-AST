// tests/astUtils.test.js

const { createAST, evaluateAST, Node } = require('../utils/ruleEvaluator');

describe('AST Functions', () => {
    test('should create valid AST from rule string', () => {
        const ruleString = "age > 30 AND department = 'Sales'";
        const ast = createAST(ruleString);
        
        expect(ast).toBeDefined();
        expect(ast.type).toBe('operator');
        expect(ast.value).toBe('AND');
        expect(ast.left.value).toBe('age > 30');
        expect(ast.right.value).toBe("department = 'Sales'");
    });

    test('should evaluate AST correctly', () => {
        const ast = createAST("age > 30 AND department = 'Sales'");
        const data = { age: 35, department: 'Sales' };
        const result = evaluateAST(ast, data);
        expect(result).toBe(true);
    });

    test('should return false for non-matching data', () => {
        const ast = createAST("age > 30 AND department = 'Sales'");
        const data = { age: 25, department: 'Marketing' };
        const result = evaluateAST(ast, data);
        expect(result).toBe(false);
    });
    
    test('should handle invalid rule string gracefully', () => {
        expect(() => createAST("invalid rule")).toThrow("Invalid rule string.");
    });
});
