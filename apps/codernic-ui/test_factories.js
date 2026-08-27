// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { getSchemaFormat } from '@atomos-web/structura';
console.log('--- appSettings ---');
console.log(getSchemaFormat('appSettings', 'TSinMD'));
console.log('--- DAGExchange ---');
console.log(getSchemaFormat('DAGExchange', 'TSinMD'));
console.log('--- SchemaModel ---');
console.log(getSchemaFormat('SchemaModel', 'TSinMD'));
