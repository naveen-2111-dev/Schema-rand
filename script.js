/**
 * GetRand - Generates random values based on a schema.
 *
 * This function takes a schema object as input and returns a result containing:
 * 1. The number of keys processed (size).
 * 2. Randomly generated values matching the schema structure.
 *
 * @param {object} schema - The schema object to generate random data.
 * @returns {object} - An object containing the size and random values.
 * @throws {Error} - Throws an error if the schema is invalid or empty.
 */

const GetRand = (schema) => {
  // Validate input schema
  if (typeof schema !== "object" || schema === null) {
    throw new Error("Invalid schema: Schema must be a non-null object.");
  }
  if (Object.keys(schema).length === 0) {
    throw new Error("Invalid schema: Schema cannot be empty.");
  }

  let size = 0; // Tracks the number of keys processed
  const keyTypes = {}; // Keeps track of data types for each key

  /**
   * Generates a random value based on the provided type.
   *
   * @param {string} type - The data type (e.g., "number", "string", etc.).
   * @returns {any} - A random value matching the type.
   */
  const getRandomValue = (type) => {
    switch (type) {
      case "number":
        return Math.floor(Math.random() * 100); // Random number between 0-99
      case "string":
        return Math.random().toString(36).substring(2); // Random alphanumeric string
      case "boolean":
        return Math.random() > 0.5; // Random true/false
      case "array":
        return [Math.random().toString(36).substring(2)]; // Single random string in an array
      case "object":
        return {}; // Empty object (default for nested schemas)
      default:
        console.warn(
          `Warning: Unsupported data type "${type}". Returning null.`
        );
        return null; // Fallback for unsupported types
    }
  };

  /**
   * Recursively traverses the schema to generate random values.
   *
   * @param {object} obj - The current level of the schema.
   * @param {object} result - The result object being constructed.
   */
  const traverse = (obj, result) => {
    for (const key in obj) {
      size++; // Increment key count
      const value = obj[key];

      try {
        if (Array.isArray(value)) {
          // Handle arrays
          keyTypes[key] = "array";
          result[key] = getRandomValue("array");
        } else if (typeof value === "object" && value !== null) {
          // Handle nested objects
          keyTypes[key] = "object";
          result[key] = {};
          traverse(value, result[key]); // Recursive call, so that it can traverse again into the nested object
        } else if (typeof value === "string") {
          // Handle primitive types
          keyTypes[key] = value;
          result[key] = getRandomValue(value);
        } else {
          // Handle invalid schema entries
          throw new Error(
            `Invalid schema value for key "${key}". Expected a valid type or nested object.`
          );
        }
      } catch (error) {
        // Log and handle errors gracefully
        console.error(`Error processing key "${key}": ${error.message}`);
        result[key] = null; // Assign fallback value
      }
    }
  };

  // Final result object to store generated values
  const resultValues = {};
  traverse(schema, resultValues);

  // Return the size and generated random values
  return { size, randomValues: resultValues };
};

module.exports = GetRand;