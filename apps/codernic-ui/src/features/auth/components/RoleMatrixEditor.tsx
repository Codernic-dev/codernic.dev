// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Heading, Text, Button } from '@codernic/components';

// Mock types
type Permission = 'codebase_read' | 'codebase_write' | 'admin_read' | 'admin_write' | 'billing_manage';
type IdpRole = string; // e.g. 'github_org_member', 'github_org_admin'

export interface RoleMatrixEditorProps {
  className?: string;
}

export const RoleMatrixEditor = ({ className = '' }: RoleMatrixEditorProps): JSX.Element => {
  const dispatch = useDispatch();
  const [permissions] = useState<Permission[]>([
    'codebase_read', 'codebase_write', 'admin_read', 'admin_write', 'billing_manage'
  ]);
  
  const [idpRoles, setIdpRoles] = useState<IdpRole[]>([
    'github/developer',
    'github/admin',
    'entraid/Reader',
    'entraid/Contributor'
  ]);

  // Record mapping IDP Role -> Set of Permissions
  const [matrix, setMatrix] = useState<Record<IdpRole, Set<Permission>>>({
    'github/developer': new Set<Permission>(['codebase_read', 'codebase_write']),
    'github/admin': new Set<Permission>(['codebase_read', 'codebase_write', 'admin_read', 'admin_write', 'billing_manage']),
    'entraid/Reader': new Set<Permission>(['codebase_read']),
    'entraid/Contributor': new Set<Permission>(['codebase_read', 'codebase_write']),
  });

  const [newRoleInput, setNewRoleInput] = useState('');
  const [saving, setSaving] = useState(false);

  const togglePermission = (role: IdpRole, perm: Permission) => {
    setMatrix(prev => {
      const next = { ...prev };
      const rolePerms = new Set(next[role] || []);
      if (rolePerms.has(perm)) {
        rolePerms.delete(perm);
      } else {
        rolePerms.add(perm);
      }
      next[role] = rolePerms;
      return next;
    });
  };

  const handleAddRole = () => {
    const role = newRoleInput.trim();
    if (role && !idpRoles.includes(role)) {
      setIdpRoles(prev => [...prev, role]);
      setMatrix(prev => ({ ...prev, [role]: new Set<Permission>() }));
      setNewRoleInput('');
    }
  };

  const handleSave = () => {
    setSaving(true);
    
    // Convert sets to arrays for serialization
    const payload: Record<IdpRole, Permission[]> = {};
    for (const role of idpRoles) {
      payload[role] = Array.from(matrix[role] || []);
    }
    
    dispatch({
      type: 'auth/saveRoleMatrixRequest',
      payload: {
        payload,
        onSuccess: () => {
          alert('Role Matrix saved successfully!');
          setSaving(false);
        },
        onError: (err: string) => {
          console.error(err);
          alert('Failed to save Role Matrix.');
          setSaving(false);
        }
      }
    });
  };

  return (
    <Card className="p-0 bg-zinc-900 border-zinc-800 flex flex-col overflow-hidden">
      <div className="p-6 border-b border-zinc-800 flex justify-between items-start">
        <div>
          <Heading level={3} className="text-white mb-1">Role Mapping Matrix</Heading>
          <Text className="text-zinc-400">Map your external Identity Provider roles to internal Codernic permissions.</Text>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-amber-600 hover:bg-amber-500 text-white"
        >
          {saving ? 'Saving...' : 'Save Matrix'}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-950 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 text-sm font-medium text-zinc-300 w-1/4">IDP Role</th>
              {permissions.map(perm => (
                <th key={perm} className="px-4 py-4 text-xs font-medium text-zinc-400 text-center tracking-wider uppercase">
                  {perm.replace('_', ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {idpRoles.map(role => (
              <tr key={role} className="hover:bg-zinc-800/25 transition-colors group">
                <td className="px-6 py-4 font-medium text-zinc-200">
                  <div className="flex items-center gap-2">
                    <span className="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded text-xs font-mono border border-zinc-700">
                      {role.split('/')[0]}
                    </span>
                    <span>{role.split('/')[1] || role}</span>
                  </div>
                </td>
                {permissions.map(perm => {
                  const isChecked = matrix[role]?.has(perm);
                  return (
                    <td key={perm} className="px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => togglePermission(role, perm)}
                        className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500 focus:ring-offset-zinc-900"
                        title={`Assign ${perm} to ${role}`}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
            
            {/* Add New Role Row */}
            <tr className="bg-zinc-950/50">
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newRoleInput}
                    onChange={e => setNewRoleInput(e.target.value)}
                    placeholder="e.g. google/viewer" 
                    className="flex-1 bg-black border border-zinc-800 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                  <Button 
                    onClick={handleAddRole} 
                    disabled={!newRoleInput.trim()}
                    className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 h-auto"
                  >
                    Add
                  </Button>
                </div>
              </td>
              <td colSpan={permissions.length} className="px-4 py-4 text-center text-zinc-600 text-sm italic">
                Add a new external role to map permissions
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};
