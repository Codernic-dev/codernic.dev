// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

const { f } = require('@binaryjack/formular.dev');
const schema = f.object({ name: f.string(), age: f.number() });
console.log('JSON Schema for f.object({name: string}):', JSON.stringify(schema.toJSONSchema(), null, 2));

const strSchema = f.string();
console.log('JSON Schema for f.string():', JSON.stringify(strSchema.toJSONSchema(), null, 2));
