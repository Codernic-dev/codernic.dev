// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { selectActiveToasts, removeActiveToast } from '../../../entities/notifications/model/notifications-slice';
import { Toast } from '@codernic/components';

export function ToastsContainer() {
  const toasts = useSelector(selectActiveToasts);
  const dispatch = useDispatch();

  const handleClose = (id: string) => {
    dispatch(removeActiveToast(id));
  };

  const content = (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast data-testid={`${typeof currentId !== 'undefined' ? currentId : 'toasts-item'}-toast`} 
            level={toast.level} 
            message={toast.message} 
            onClose={() => handleClose(toast.id)} 
          />
        </div>
      ))}
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
}
