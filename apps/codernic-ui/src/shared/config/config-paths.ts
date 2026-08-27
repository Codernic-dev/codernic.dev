// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as yaml from 'yaml';

export interface FrontendEngineConfig {
  network: {
    daemon_ws_port: number;
    ui_dev_port: number;
  };
  systemPaths: {
    codernicapp: string;
  };
}

export class FrontendConfigManager {
  static getEngineConfig(): FrontendEngineConfig {
    const defaultCodernicApp = path.join(os.homedir() || '.', 'codernicapp');
    
    const defaults: FrontendEngineConfig = {
      network: {
        daemon_ws_port: 47321,
        ui_dev_port: 5173,
      },
      systemPaths: {
        codernicapp: defaultCodernicApp,
      },
    };

    try {
      const engineYamlPath = path.join(defaultCodernicApp, 'engine.yaml');
      
      let parsedConfig: any = null;
      if (fs.existsSync(engineYamlPath)) {
        const content = fs.readFileSync(engineYamlPath, 'utf8');
        parsedConfig = yaml.parse(content);
      }

      if (parsedConfig) {
        if (parsedConfig.network) {
          defaults.network = { ...defaults.network, ...parsedConfig.network };
        }
        if (parsedConfig.systemPaths) {
          defaults.systemPaths = { ...defaults.systemPaths, ...parsedConfig.systemPaths };
        }
      }
    } catch (e) {
      // Default fallback applies
    }
    
    return defaults;
  }
}
