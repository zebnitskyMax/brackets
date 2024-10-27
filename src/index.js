module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openingBrackets = {};

  // Create a map for the opening brackets
  for (const [open, close] of bracketsConfig) {
    openingBrackets[open] = close;
  }

  // Iterate over each character in the string
  for (const char of str) {
    // If the character is an opening bracket
    if (openingBrackets[char]) {
      // Check if it is the same as the last opening bracket in stack for special cases (like '||')
      if (char === openingBrackets[char] && stack.length > 0 && stack[stack.length - 1] === char) {
        stack.pop(); // Pop the matching pair
      } else {
        stack.push(char); // Push the opening bracket onto the stack
      }
    } else {
      // If it is a closing bracket, check if it matches the top of the stack
      const last = stack.pop();
      if (openingBrackets[last] !== char) {
        return false; // If not matching, return false
      }
    }
  }

  // If the stack is empty, the brackets are correctly balanced
  return stack.length === 0;
}