// src/utils/ruleEvaluator.js
class RuleEvaluator {
    static parseCondition(conditionStr) {
        const match = conditionStr.match(/(\w+)\s*([<>=!]+)\s*(['"]?\w+['"]?)/);
        if (!match) throw new Error(`Invalid condition: ${conditionStr}`);

        const [_, field, operator, rawValue] = match;
        const value = rawValue.replace(/['"]/g, '');
        
        return { field, operator, value };
    }

    static createAST(ruleString) {
        const tokens = ruleString.split(/\s+(AND|OR)\s+/);
        if (tokens.length === 1) {
            return {
                type: 'condition',
                value: this.parseCondition(tokens[0])
            };
        }

        const conditions = [];
        const operators = [];

        for (let i = 0; i < tokens.length; i++) {
            if (i % 2 === 0) {
                conditions.push({
                    type: 'condition',
                    value: this.parseCondition(tokens[i])
                });
            } else {
                operators.push(tokens[i]);
            }
        }

        let root = conditions[0];
        for (let i = 0; i < operators.length; i++) {
            root = {
                type: 'operator',
                value: operators[i],
                left: root,
                right: conditions[i + 1]
            };
        }

        return root;
    }

    static evaluate(ast, data) {
        if (!ast) return false;

        if (ast.type === 'operator') {
            const leftResult = this.evaluate(ast.left, data);
            const rightResult = this.evaluate(ast.right, data);
            return ast.value === 'AND' ? leftResult && rightResult : leftResult || rightResult;
        }

        if (ast.type === 'condition') {
            const { field, operator, value } = ast.value;
            const fieldValue = data[field];
            
            const numValue = !isNaN(value) ? Number(value) : value;
            const numFieldValue = !isNaN(fieldValue) ? Number(fieldValue) : fieldValue;

            switch (operator) {
                case '>': return numFieldValue > numValue;
                case '<': return numFieldValue < numValue;
                case '>=': return numFieldValue >= numValue;
                case '<=': return numFieldValue <= numValue;
                case '=': return String(fieldValue) === String(value);
                case '!=': return String(fieldValue) !== String(value);
                default:
                    throw new Error(`Unknown operator: ${operator}`);
            }
        }

        return false;
    }
}

module.exports = RuleEvaluator; // Ensure this export is present
