// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import { useLayoutEngine } from '../context';

export function useWidgetDragDrop(id: string, parentId?: string) {
  const { dispatch } = useLayoutEngine();

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/codernic-widget-move', JSON.stringify({ id, parentId }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('ring-2', 'ring-amber-500');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('ring-2', 'ring-amber-500');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('ring-2', 'ring-amber-500');
    
    const dragDataRaw = e.dataTransfer.getData('application/codernic-widget-move');
    if (dragDataRaw) {
      const dragData = JSON.parse(dragDataRaw);
      if (dragData.id !== id && dragData.parentId === parentId) {
        dispatch({ type: 'SWAP_BLOCKS', payload: { sourceId: dragData.id, targetId: id } });
      }
    }
  };

  return { handleDragStart, handleDragEnter, handleDragOver, handleDragLeave, handleDrop };
}
