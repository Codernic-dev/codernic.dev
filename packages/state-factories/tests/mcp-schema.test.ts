// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { describe, it, expect } from 'vitest';
import { ChatStateSchema } from '../src/features/chat.factory';
import { ChatMsgSchema } from '../src/shared/types.schema';

describe('MCP Schema Validation with Formular', () => {
  it('should generate a valid JSON format for MCP tool consumption', () => {
    const schema = ChatMsgSchema;
    
    if (typeof (schema as any).toJSONSchema === 'function') {
      const json = (schema as any).toJSONSchema();
      console.log('JSON Schema:', JSON.stringify(json, null, 2));
      expect(json).toBeDefined();
    } else if (typeof (schema as any).toJSONFormat === 'function') {
      const json = (schema as any).toJSONFormat();
      console.log('JSON Format:', JSON.stringify(json, null, 2));
      expect(json).toBeDefined();
    } else {
      console.log('Available methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(schema)));
      throw new Error('No toJSONFormat or toJSONSchema found on Formular object');
    }
  });

  it('should rigorously parse and reject hallucinated data', () => {
    const invalidPayload = {
      messages: [
        {
          id: 123,
          role: 'hallucinated_role',
          text: 'Hello'
        }
      ]
    };
    
    expect(() => {
      ChatStateSchema.parse(invalidPayload as any);
    }).toThrow();
  });
});
