import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const CreateRule = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rule_string: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateRuleString = (ruleString) => {
    if (!ruleString.trim()) {
      return 'Rule string is required';
    }

    // Check for balanced parentheses
    let parenCount = 0;
    for (const char of ruleString) {
      if (char === '(') parenCount++;
      if (char === ')') parenCount--;
      if (parenCount < 0) return 'Invalid parentheses placement';
    }
    if (parenCount !== 0) return 'Unmatched parentheses';

    // Check for valid operators
    const validOperators = ['AND', 'OR', '>', '<', '>=', '<=', '='];
    const words = ruleString.split(/\s+/);
    const operators = words.filter(word => 
      word.toUpperCase() === 'AND' || 
      word.toUpperCase() === 'OR' ||
      ['>', '<', '>=', '<=', '='].includes(word)
    );
    
    if (operators.length === 0) {
      return 'Rule must contain at least one operator (AND, OR, >, <, >=, <=, =)';
    }

    return null;
  };

  const handleRuleStringChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, rule_string: value }));
    
    if (errors.rule_string) {
      setErrors(prev => ({ ...prev, rule_string: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate rule string
    const ruleError = validateRuleString(formData.rule_string);
    if (ruleError) {
      setErrors({ rule_string: ruleError });
      setIsSubmitting(false);
      return;
    }

    // Validate description
    if (!formData.description.trim()) {
      setErrors({ description: 'Description is required' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would call your API to save the rule
      // await createRule(formData);
      console.log('Rule created:', formData);
      navigate('/');
    } catch (err) {
      setErrors({ 
        submit: err.message || 'Failed to create rule. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormat = () => {
    try {
      // Simple formatting: add spaces around operators and clean up extra whitespace
      const formatted = formData.rule_string
        .replace(/([()=><])/g, ' $1 ')  // Add spaces around operators and parentheses
        .replace(/\s+/g, ' ')           // Replace multiple spaces with single space
        .replace(/\(\s+/g, '(')         // Remove space after opening parenthesis
        .replace(/\s+\)/g, ')')         // Remove space before closing parenthesis
        .trim();

      setFormData(prev => ({
        ...prev,
        rule_string: formatted
      }));
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        rule_string: 'Unable to format rule: ' + err.message
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Rule</h1>
      
      {errors.submit && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Rule Expression
            </label>
            <button
              type="button"
              onClick={handleFormat}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              Format Rule
            </button>
          </div>
          <textarea
            value={formData.rule_string}
            onChange={handleRuleStringChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
              ${errors.rule_string 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300'}`}
            rows="4"
            placeholder="((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
            required
          />
          {errors.rule_string && (
            <p className="mt-1 text-sm text-red-600">{errors.rule_string}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Enter your rule using conditions and logical operators (AND, OR). Use parentheses to group conditions.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
              ${errors.description 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300'}`}
            placeholder="Enter a description for your rule"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Creating...
              </>
            ) : (
              'Create Rule'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRule;