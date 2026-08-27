// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

export type ModuleLogoProps = {
  moduleId: string;
  className?: string;
};

const moduleToLogoMap: Record<string, string> = {
  "full": "/ai-agencee-logo-dark.svg",
  "pirsig_shield": "/pirsig-logo.svg",
  "ragtime_node": "/ragtime-logo.svg",
  "galileus_ci": "/galileus-logo.svg",
  "deming_node": "/deming-logo.svg",
  "ockham_proxy": "/ockham-logo.svg",
  "cosa_watcher": "/cosa-logo.svg",
};

export function ModuleLogo({ moduleId, className = "" }: ModuleLogoProps) {
  const src = moduleToLogoMap[moduleId] || "/ai-agencee-logo-dark.svg";
  
  return (
    <img src={src} alt={`${moduleId} logo`} className={className} />
  );
}
