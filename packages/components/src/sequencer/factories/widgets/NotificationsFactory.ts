// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

export class NotificationsFactory {
  static createDispatchActions() {
    return [
      {
        type: 'notifications/pushNotification',
        payload: {
          id: 'demo-notif-1',
          message: 'System initialization complete.',
          level: 'success',
          is_read: false,
          created_at: Date.now() - 60000
        }
      },
      {
        type: 'notifications/pushNotification',
        payload: {
          id: 'demo-notif-2',
          message: 'High latency detected in vector store.',
          level: 'error',
          is_read: false,
          created_at: Date.now() - 5000
        }
      }
    ];
  }
}
