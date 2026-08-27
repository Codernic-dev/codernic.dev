// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { createArtifactsState } from '@binaryjack/state-factories';

export class ArtifactsFactory {
  static createPopulateAction() {
    const state = createArtifactsState({
      list: [
        'demo-session_architecture.md',
        'demo-session_api-spec.md',
        'demo-session_database-schema.md',
        'demo-analyst-session_deployment-plan.md',
        'demo-analyst-session_test-cases.md',
        'demo-analyst-session_security-audit.md',
        'demo-analyst-session_ux-wireframes.md'
      ]
    });

    return {
      type: 'artifacts/fetchArtifactsSuccess',
      payload: state.list
    };
  }
}
