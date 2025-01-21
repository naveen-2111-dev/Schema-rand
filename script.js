const GetRand = (schema) => {
  let size = 0;
  const keyTypes = {};
  const getRandomValue = (type) => {
    switch (type) {
      case "number":
        return Math.floor(Math.random() * 100);
      case "string":
        return Math.random().toString(36).substring(1);
      case "boolean":
        return Math.random() > 0.5;
      case "array":
        return [Math.random().toString(36).substring(1)];
      case "object":
        return {};
      default:
        return null;
    }
  };

  const traverse = (obj, result) => {
    for (const key in obj) {
      size++;
      const value = obj[key];

      if (Array.isArray(value)) {
        keyTypes[key] = "array";
        result[key] = getRandomValue("array");
      } else if (typeof value === "object" && value !== null) {
        keyTypes[key] = "object";
        result[key] = {};
        traverse(value, result[key]);
      } else {
        keyTypes[key] = value;
        result[key] = getRandomValue(value);
      }
    }
  };

  const resultValues = {};
  traverse(schema, resultValues);

  return { size, randomValues: resultValues };
};


module.exports = GetRand;