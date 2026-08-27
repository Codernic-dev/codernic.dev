// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

export class AppFactory {
  static createDispatchActions() {
    return [
      {
        type: 'app/setWorkspaceName',
        payload: 'Demo Workspace'
      },
      {
        type: 'app/setDaemonIsLoaded',
        payload: true
      }
    ];
  }
}
