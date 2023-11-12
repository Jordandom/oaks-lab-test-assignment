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

type FunFactResponse = {
  text: string;
  [key: string]: string;
};

export async function fetchRandomFact(
  url: string,
  signal: AbortSignal
): Promise<string> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} ${response.statusText}`
    );
  }

  const data: FunFactResponse = await response.json();

  if (typeof data.text !== 'string') {
    throw new Error("Invalid or missing 'text' field in response.");
  }

  return data.text;
}
