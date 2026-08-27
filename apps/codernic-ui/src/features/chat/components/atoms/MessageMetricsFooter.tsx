// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import type { InferenceMetrics } from '../../../../entities/kernel/model/types';

export interface MessageMetricsFooterProps {
  metrics: InferenceMetrics;
}

export function MessageMetricsFooter({ metrics }: MessageMetricsFooterProps): JSX.Element {
  return (
    <div className="flex items-center gap-3 mt-2 pt-1.5 border-t border-dashed border-zinc-800 text-[10px] text-zinc-500 font-mono opacity-80">
      <span title="Tokens Per Second">[{metrics.tokens_per_second.toFixed(1)} tok/s]</span>
      <span title="Time To First Token">[TTFT: {metrics.ttft_ms}ms]</span>
      <span title="Context Window Size">[CTX: {metrics.context_tokens_count.toLocaleString()}]</span>
    </div>
  );
}
