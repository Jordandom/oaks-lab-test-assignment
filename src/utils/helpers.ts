/**
 * Generates a unique ID by combining a random base-36 string and the current time in milliseconds converted to a base-36 string.
 * @returns {string} A unique identifier.
 */
export const generateId = (): string => {
  // Create a random number and convert it to a base-36 string (includes numbers and letters)
  const randomPart = Math.random().toString(36).substring(2);

  // Get the current time in milliseconds, converted to a base-36 string
  const timePart = Date.now().toString(36);

  // Combine both parts to form a more unique identifier
  return `${randomPart}${timePart}`;
};

type FunFactResponse = {
  text: string;
  // Index signature stating that the object may have any number of properties with unknown content.
  [key: string]: string;
};

export async function fetchFunFact(
  url: string = 'https://uselessfacts.jsph.pl/random.json',
  signal?: AbortSignal
): Promise<string> {
  try {
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.statusText}`);
    }

    const data: FunFactResponse = await response.json();

    if (!data.text) {
      throw new Error("Property 'text' not found in the response.");
    }

    return data.text;
  } catch (error) {
    if (signal?.aborted) {
      // Log or handle aborting differently if needed
      console.log('Fetch was aborted');
    }
    throw error; // Re-throw the error to be handled by the caller
  }
}
