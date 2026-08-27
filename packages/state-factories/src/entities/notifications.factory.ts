// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { f, type IInfer } from '@binaryjack/formular.dev';

export const NotificationSchema = f.object({
  id: f.string(),
  message: f.string(),
  level: f.enum(['info', 'success', 'error']),
  is_read: f.boolean(),
  created_at: f.number(),
});

export const NotificationsStateSchema = f.object({
  items: f.array(NotificationSchema),
  activeToasts: f.array(NotificationSchema),
});

export type Notification = IInfer<typeof NotificationSchema>;
export type NotificationsState = IInfer<typeof NotificationsStateSchema>;

export function createNotificationsState(partial: Partial<NotificationsState> = {}): NotificationsState {
  const defaultState: NotificationsState = {
    items: [],
    activeToasts: [],
  };
  return { ...defaultState, ...partial } as IInfer<typeof NotificationsStateSchema>;
}
