# @automatons/validator

The validator of openapi schema.

## Usage

```typescript
import {validator} from "@automatons/validator";
import {readSync} from "fs";

const result = validator(readSync('path/to/openapi.json'))
```
