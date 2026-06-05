# @automatons/validator

The validator of openapi schema.

Since v2 this package is **ESM-only** and requires **Node.js >= 22**.

## Usage

```typescript
import {validator} from "@automatons/validator";
import {readFileSync} from "node:fs";

const result = await validator(JSON.parse(readFileSync("path/to/openapi.json", "utf-8")));
// result.valid: boolean, result.errors: { keyword, rule, location }[]
```
