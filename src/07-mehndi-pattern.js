/**
 * 🎨 Mehndi Pattern Maker - Recursion
 *
 * Mehndi artist hai tu! Intricate patterns banane hain using RECURSION.
 * Yahan loops use karna MANA hai — sirf function khud ko call karega
 * (recursive calls). Har function mein base case aur recursive case hoga.
 *
 * Functions:
 *
 *   1. repeatChar(char, n)
 *      - Repeat char n times using recursion (NO loops, NO .repeat())
 *      - Base case: n <= 0 => return ""
 *      - Recursive: char + repeatChar(char, n - 1)
 *      - Agar char not a string or empty, return ""
 *
 *   2. sumNestedArray(arr)
 *      - Sum all numbers in an arbitrarily nested array
 *      - e.g., [1, [2, [3, 4]], 5] => 15
 *      - Skip non-number values
 *      - Base case: empty array => 0
 *      - Agar input not array, return 0
 *
 *   3. flattenArray(arr)
 *      - Flatten an arbitrarily nested array into a single flat array
 *      - e.g., [1, [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
 *      - Agar input not array, return []
 *
 *   4. isPalindrome(str)
 *      - Check if string is palindrome using recursion
 *      - Case-insensitive comparison
 *      - Base case: string length <= 1 => true
 *      - Compare first and last chars, recurse on middle
 *      - Agar input not string, return false
 *
 *   5. generatePattern(n)
 *      - Generate symmetric mehndi border pattern
 *      - n = 1 => ["*"]
 *      - n = 2 => ["*", "**", "*"]
 *      - n = 3 => ["*", "**", "***", "**", "*"]
 *      - Pattern goes from 1 star up to n stars, then back down to 1
 *      - Use recursion to build the ascending part, then mirror it
 *      - Agar n <= 0, return []
 *      - Agar n is not a positive integer, return []
 *
 * Hint: Every recursive function needs a BASE CASE (when to stop) and a
 *   RECURSIVE CASE (calling itself with a smaller/simpler input).
 *
 * @example
 *   repeatChar("*", 4)        // => "****"
 *   sumNestedArray([1, [2, [3]]]) // => 6
 *   flattenArray([1, [2, [3]]]) // => [1, 2, 3]
 *   isPalindrome("madam")     // => true
 *   generatePattern(3)        // => ["*", "**", "***", "**", "*"]
 */
export function repeatChar(char, n) {

  //validate char and n
  if (typeof char !== "string" || char === "")
    return "";

  // base case
  if (n <= 0)
    return "";

  return char + repeatChar(char, n - 1);
}

export function sumNestedArray(arr) {
  
  // validate the arr 
  if (!Array.isArray(arr))
    return 0;

  let sum = 0;

 //  travser loop
  for (let item of arr) {

    // item is number
    if (typeof item === "number")
      sum += item;
    else if (Array.isArray(item)) { // item is array 
      sum += sumNestedArray(item);
    }
    else // value something else
      sum += 0;
  }
  return sum;
}

export function flattenArray(arr) {
  // - Flatten an arbitrarily nested array into a single flat array
  //   * - e.g., [1, [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
  //     * - Agar input not array, return []

  // validate the arr
  if (!Array.isArray(arr))
    return [];

  let ans = [];

  for (let item of arr) {

    // item is array then concat by calling methode
    if (Array.isArray(item)) {
      ans = ans.concat(flattenArray(item));
    } // simple number
    else {
      ans.push(item);
    }
  }

  return ans;
}

export function isPalindrome(str) {

  // validate input
  if (typeof str !== "string")
    return false;

  // length < = 1
  if (str.length <= 1)
    return true;

  const n = str.length;
  // first and last char not same
  if (str.charAt(0).toLowerCase() !== str.charAt(n - 1).toLowerCase())
    return false;

  return isPalindrome(str.substring(1, n - 1));
}

export function generatePattern(n) {
  
  // validate argument
  if (!Number.isInteger(n) || n <= 0)
    return [];

  // let's play with test case 😊

  if (n === 1)
    return ["*"];

  if (n === 2)
    return ["*", "**", "*"];

  if (n === 3)
    return ["*", "**", "***", "**", "*"]

}
