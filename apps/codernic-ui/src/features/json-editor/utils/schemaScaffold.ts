// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

export function scaffoldFromSchema(schema: any): any {
  if (!schema || typeof schema !== 'object') return {};
  if (schema.type === 'array') return [];
  if (!schema.properties) return {};

  const result: any = {};
  for (const [key, prop] of Object.entries(schema.properties)) {
    const p = prop as any;
    if (p.default !== undefined) {
      result[key] = p.default;
    } else if (p.type === 'array') {
      result[key] = [];
    } else if (p.type === 'object') {
      result[key] = p.properties ? scaffoldFromSchema(p) : {};
    } else if (p.type === 'string') {
      result[key] = '';
    } else if (p.type === 'boolean') {
      result[key] = false;
    } else if (p.type === 'number') {
      result[key] = 0;
    }
  }
  return result;
}
