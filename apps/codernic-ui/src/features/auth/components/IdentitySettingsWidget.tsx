// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

import React, { useEffect, useState } from 'react';
import { Card, Heading, Text, Button } from '@codernic/components';
import { FormProvider, useForm, Input, FieldSet } from '@codernic/components/formular-bridge';
import { useDispatch } from 'react-redux';

interface ProviderTemplate {
  id: string;
  name: string;
  fields: { name: string; label: string; type: string; required: boolean }[];
}

export interface IdentitySettingsWidgetProps {
  className?: string;
}

export const IdentitySettingsWidget = ({ className = '' }: IdentitySettingsWidgetProps): JSX.Element => {
  const [templates, setTemplates] = useState<ProviderTemplate[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dispatch = useDispatch();

  // In a real implementation, you would fetch these templates from the backend
  useEffect(() => {
    // Mock fetch from /api/auth/providers/templates
    const fetchTemplates = async () => {
      try {
        // Simulated response
        const data: ProviderTemplate[] = [
          {
            id: 'github',
            name: 'GitHub OAuth2',
            fields: [
              { name: 'clientId', label: 'Client ID', type: 'text', required: true },
              { name: 'clientSecret', label: 'Client Secret', type: 'password', required: true },
            ]
          },
          {
            id: 'entraid',
            name: 'Microsoft Entra ID (OIDC)',
            fields: [
              { name: 'tenantId', label: 'Tenant ID', type: 'text', required: true },
              { name: 'clientId', label: 'Client ID', type: 'text', required: true },
              { name: 'clientSecret', label: 'Client Secret', type: 'password', required: true },
            ]
          }
        ];
        setTemplates(data);
      } catch (err) {
        console.error('Failed to load provider templates:', err);
      }
    };
    fetchTemplates();
  }, []);

  const currentTemplate = templates.find(t => t.id === selectedProvider);

  // Create a minimal dynamic schema for formular.dev based on the template
  const schema = React.useMemo(() => {
    if (!currentTemplate) return null;
    const properties: Record<string, { type: string; title: string; minLength: number }> = {};
    currentTemplate.fields.forEach(f => {
      properties[f.name] = {
        type: 'string',
        title: f.label,
        minLength: f.required ? 1 : 0
      };
    });
    return {
      type: 'object',
      required: currentTemplate.fields.filter(f => f.required).map(f => f.name),
      properties
    };
  }, [currentTemplate]);

  const form = useForm({
    schema: schema as unknown as Parameters<typeof useForm>[0]['schema'],
  });

  const handleSubmit = () => {
    if (!form.validate()) {
      return;
    }
    
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    
    const payload = {
      providerId: selectedProvider,
      config: form.getValues()
    };
    
    dispatch({
      type: 'auth/setupRequest',
      payload: {
        payload,
        onSuccess: () => {
          setSuccessMsg('Identity Settings saved successfully.');
          setLoading(false);
        },
        onError: (err: string) => {
          setErrorMsg(err);
          setLoading(false);
        }
      }
    });
  };

  return (
    <Card className="p-6 bg-zinc-900 border-zinc-800 flex flex-col gap-6">
      <div>
        <Heading level={3} className="text-white mb-1">Identity Provider Setup</Heading>
        <Text className="text-zinc-400">Configure your external IAM/RBAC provider here.</Text>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-300">Select Provider Template</label>
        <select 
          className="bg-black border border-zinc-800 text-white rounded-md p-2"
          value={selectedProvider} 
          onChange={(e) => {
            setSelectedProvider(e.target.value);
            form.reset();
            setSuccessMsg(null);
            setErrorMsg(null);
          }}
        >
          <option value="" disabled>-- Select an Identity Provider --</option>
          {templates.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      {currentTemplate && schema && (
        <FormProvider form={form}>
          <div className="flex flex-col gap-4 bg-black/40 p-4 rounded-lg border border-zinc-800/50">
            {currentTemplate.fields.map(field => (
              <FieldSet key={field.name} label={field.label} required={field.required}>
                <Input name={field.name} type={field.type} placeholder={`Enter ${field.label}`} />
              </FieldSet>
            ))}
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-md">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-md">
              {successMsg}
            </div>
          )}

          <div className="flex justify-end mt-2">
            <Button 
              onClick={handleSubmit} 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 text-white"
            >
              {loading ? 'Saving...' : 'Save Configuration'}
            </Button>
          </div>
        </FormProvider>
      )}
    </Card>
  );
};
