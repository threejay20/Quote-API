// Define a function named getRandomElement that takes an array as an argument
const getRandomElement = arr => {
  // Check if the input is an array; if not, throw an error
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  
  // Generate a random index within the length of the array
  const randomIndex = Math.floor(Math.random() * arr.length);
  
  // Return the element at the randomly generated index
  return arr[randomIndex];
}

// Export the getRandomElement function so it can be used in other files
module.exports = {
  getRandomElement
};
