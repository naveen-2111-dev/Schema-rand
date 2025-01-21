# **Schema-Rand** ![schema-rand](https://img.shields.io/badge/schema--rand-v1.0.4-blue)

`schema-rand` is a lightweight Node.js package for generating random mock data based on a given schema. It’s designed to simplify the process of creating test data for development and testing purposes.

---

## **Features**
- 🛠️ **Easy to Use**: Define a schema and get random data in seconds.
- 🎲 **Randomized Values**: Generates random numbers, strings, booleans, and arrays.
- 🔄 **Supports Nested Schemas**: Handles deeply nested objects.
- 🚀 **Lightweight**: Simple and focused on testing needs.

---

## **Installation**

Install the package via npm:

```bash
npm install schema-rand
```

### example
```shell
const GetRand = require("schema-rand");

const schema = {
  id: "number",
  name: "string",
  isActive: "boolean",
  profile: {
    bio: "string",
    age: "number",
    address: {
      city: "string",
      zip: "number",
    },
  },
  tags: ["string"],
};

const result = GetRand(schema);

console.log("Size of Schema:", result.size);
console.log("Random Data:", result.randomValues);
```
### output

```bash
Size of Schema: 7
Random Data: {
  id: 42,
  name: "abc123",
  isActive: true,
  profile: {
    bio: "xyz456",
    age: 29,
    address: {
      city: "qwe789",
      zip: 65
    }
  },
  tags: ["lmn101"]
}
```

### How it works ?

Define a schema with key-value pairs.
The values should be the expected data type (**number**, **string**, **boolean**, **array**, or **object**).
Pass the schema to the GetRand function.
Receive an object with randomly generated data matching the schema structure.

### Limitations

Not suitable for production use.
Does not validate schemas or ensure strict typing.
Limited to basic types (number, string, boolean, array, object).

# Acknowledgments
Thank you for using schema-rand. If you find it helpful, consider sharing it with others or giving it a ⭐ on npm!