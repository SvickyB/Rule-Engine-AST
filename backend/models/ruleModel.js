const pool = require('../db/config');

const RuleModel = {
    // Create a new rule
    createRule: async (ruleString) => {
        const res = await pool.query('INSERT INTO rules (rule_string) VALUES ($1) RETURNING *', [ruleString]);
        return res.rows[0];
    },

    // Get all rules
    getRules: async () => {
        const res = await pool.query('SELECT * FROM rules');
        return res.rows;
    },

    // Combine rules into a single string (for simplicity)
    combineRules: async (ruleIds) => {
        const ruleQueries = ruleIds.map(id => pool.query('SELECT rule_string FROM rules WHERE id = $1', [id]));
        const results = await Promise.all(ruleQueries);
        const combinedRules = results.map(result => result.rows[0]?.rule_string).filter(Boolean);
        return combinedRules.join(' AND '); // Combine with AND; you can customize this
    },

    // Evaluate a specific rule against provided data
    evaluateRule: async (ruleId, data) => {
        const res = await pool.query('SELECT rule_string FROM rules WHERE id = $1', [ruleId]);
        const ruleString = res.rows[0]?.rule_string;

        if (!ruleString) {
            throw new Error('Rule not found');
        }

        const ast = createAST(ruleString); // Assuming createAST is available here
        return evaluateAST(ast, data); // Assuming evaluateAST is available here
    }
};

module.exports = RuleModel;
