/**
 * Generates a unique ID by combining a random base-36 string and the current time in milliseconds converted to a base-36 string.
 * @returns {string} A unique identifier.
 */
export const generateUniqueId = (): string => {
  // Create a random number and convert it to a base-36 string (includes numbers and letters)
  const randomPart = Math.random().toString(36).substring(2);

  // Get the current time in milliseconds, converted to a base-36 string
  const timePart = Date.now().toString(36);

  // Combine both parts to form a more unique identifier
  return `${randomPart}${timePart}`;
};
