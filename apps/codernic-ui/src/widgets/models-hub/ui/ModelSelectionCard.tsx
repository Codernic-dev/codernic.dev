// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { ModelCompatibilityCard } from '@codernic/components';
import { SsrmWidget } from '../../ssrm-manager/ui/SsrmWidget';

export interface CoreHealthPayload {
  vram_used_gb?: number;
  memory_lock_limit?: string;
  total_ram_gb: number;
  has_cuda: boolean;
  has_rocm: boolean;
  has_metal: boolean;
}

export interface LocalModel {
  id: string;
  name: string;
  parameters: string;
  quantization: string;
  estimated_vram_gb: number;
  estimated_ram_gb: number;
}

export interface ModelSelectionCardProps {
  model: LocalModel;
  systemHealth: CoreHealthPayload | null;
  onSelect: (modelId: string) => void;
  isLoading?: boolean;
}

export function ModelSelectionCard({
  model,
  systemHealth,
  onSelect,
  isLoading = false,
}: ModelSelectionCardProps): JSX.Element {
  const hasDedicatedVram = Boolean(systemHealth?.has_cuda || systemHealth?.has_rocm);
  const availableVram = hasDedicatedVram
    ? systemHealth?.vram_used_gb || 0
    : systemHealth?.has_metal
    ? systemHealth?.total_ram_gb || 0
    : 0;

  return (
    <ModelCompatibilityCard
      modelName={model.name}
      parameters={model.parameters}
      quantization={model.quantization}
      requiredVramGb={model.estimated_vram_gb}
      requiredRamGb={model.estimated_ram_gb}
      availableVramGb={availableVram}
      totalRamGb={systemHealth?.total_ram_gb || 0}
      hasDedicatedGpu={hasDedicatedVram || Boolean(systemHealth?.has_metal)}
      onLoad={() => onSelect(model.id)}
      isLoading={isLoading}
      extraContent={<SsrmWidget modelId={model.id} />}
    />
  );
}
