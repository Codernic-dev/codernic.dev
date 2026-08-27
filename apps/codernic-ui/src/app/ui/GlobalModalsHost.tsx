// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { AgnosticModalProvider } from '../../features/modal/ui/AgnosticModalProvider';
import { ApprovalModal } from '../../widgets/dag-pipeline/ui/ApprovalModal';
import { ErathosDiffModal } from '../../widgets/dag-pipeline/ui/ErathosDiffModal';
import { ArtifactModal } from '../../features/artifact-negotiation/ArtifactModal';
import { ContextualHelpModal } from '../../features/help/ContextualHelpModal';

export interface GlobalModalsHostProps {
  helpModalInfo: {
    isOpen: boolean;
    widgetName?: string;
    docUrl?: string;
  };
  onCloseHelpModal: () => void;
}

export function GlobalModalsHost({
  helpModalInfo,
  onCloseHelpModal,
}: GlobalModalsHostProps): JSX.Element {
  return (
    <>
      <AgnosticModalProvider />
      <ApprovalModal />
      <ErathosDiffModal />
      <ArtifactModal />
      <ContextualHelpModal
        isOpen={helpModalInfo.isOpen}
        widgetName={helpModalInfo.widgetName}
        docUrl={helpModalInfo.docUrl}
        onClose={onCloseHelpModal}
      />
    </>
  );
}
