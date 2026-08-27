// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

type ClassValue = string | false | null | undefined | 0

export const cx = (...args: ClassValue[]): string =>
  args.filter(Boolean).join(' ')
