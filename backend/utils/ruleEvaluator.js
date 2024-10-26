class RuleEvaluator {
    constructor() {
        this.currentPosition = 0;
        this.tokens = [];
    }

    static tokenize(ruleString) {
        const regex = /('[^']*'|\(|\)|\bAND\b|\bOR\b|>=|<=|!=|>|<|=|\s+|\w+|\d+)/g;
        return ruleString.match(regex)
            .map(token => token.trim())
            .filter(token => token.length > 0);
    }

    static createAST(ruleString) {
        const evaluator = new RuleEvaluator();
        return evaluator._createAST(ruleString);
    }

    _createAST(ruleString) {
        this.tokens = RuleEvaluator.tokenize(ruleString);
        this.currentPosition = 0;
        const ast = this.parseExpression();
        
        if (this.currentPosition < this.tokens.length) {
            throw new Error('Unexpected tokens after expression');
        }
        
        return ast;
    }

    parseExpression() {
        let left = this.parseCondition();

        while (this.currentPosition < this.tokens.length) {
            const operator = this.tokens[this.currentPosition];
            if (operator !== 'AND' && operator !== 'OR') {
                break;
            }
            this.currentPosition++;

            const right = this.parseCondition();
            left = {
                type: 'logical',
                operator: operator,
                left: left,
                right: right
            };
        }

        return left;
    }

    parseCondition() {
        if (this.tokens[this.currentPosition] === '(') {
            this.currentPosition++;
            const expr = this.parseExpression();
            
            if (this.currentPosition >= this.tokens.length || this.tokens[this.currentPosition] !== ')') {
                throw new Error('Missing closing parenthesis');
            }
            this.currentPosition++;
            return expr;
        }

        const left = this.tokens[this.currentPosition++];
        const operator = this.tokens[this.currentPosition++];
        const right = this.tokens[this.currentPosition++];

        if (!left || !operator || !right) {
            throw new Error('Invalid comparison expression');
        }

        return {
            type: 'comparison',
            left,
            operator,
            right: this.parseValue(right)
        };
    }

    parseValue(value) {
        if (value.startsWith("'") && value.endsWith("'")) {
            return value.slice(1, -1);
        }
        const num = parseFloat(value);
        return isNaN(num) ? value : num;
    }

    static evaluate(ast, data, debug = false) {
        if (debug) {
            console.log('Evaluating AST:', JSON.stringify(ast, null, 2));
            console.log('With data:', data);
        }

        if (!ast) return false;

        if (ast.type === 'comparison') {
            const leftValue = data[ast.left];
            const result = this.evaluateComparison(leftValue, ast.operator, ast.right);
            
            if (debug) {
                console.log(`Comparison: ${ast.left} ${ast.operator} ${ast.right}`);
                console.log(`Values: ${leftValue} ${ast.operator} ${ast.right}`);
                console.log(`Result: ${result}`);
            }
            
            return result;
        }

        if (ast.type === 'logical') {
            const leftResult = this.evaluate(ast.left, data, debug);
            const rightResult = this.evaluate(ast.right, data, debug);
            
            if (debug) {
                console.log(`${ast.operator} operation:`, leftResult, ast.operator, rightResult);
            }

            return ast.operator === 'AND' ? 
                leftResult && rightResult : 
                leftResult || rightResult;
        }

        throw new Error(`Invalid AST node type: ${ast.type}`);
    }

    static evaluateComparison(leftValue, operator, rightValue) {
        // Handle undefined or null values
        if (leftValue === undefined || leftValue === null) {
            return false;
        }

        // Convert to numbers for numeric comparisons
        const leftNum = Number(leftValue);
        const rightNum = Number(rightValue);

        // String comparison
        if (typeof rightValue === 'string') {
            const leftStr = String(leftValue);
            switch (operator) {
                case '=':
                case '==':
                    return leftStr === rightValue;
                case '!=':
                    return leftStr !== rightValue;
                default:
                    return false;
            }
        }

        // Numeric comparison
        if (!isNaN(leftNum) && !isNaN(rightNum)) {
            switch (operator) {
                case '>': return leftNum > rightNum;
                case '<': return leftNum < rightNum;
                case '>=': return leftNum >= rightNum;
                case '<=': return leftNum <= rightNum;
                case '=':
                case '==': return leftNum === rightNum;
                case '!=': return leftNum !== rightNum;
                default:
                    throw new Error(`Invalid operator: ${operator}`);
            }
        }

        return false;
    }
}

module.exports = RuleEvaluator;