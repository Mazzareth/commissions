'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/Button';

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
  client: {
    id: number;
    name: string;
    discordId: string | null;
  };
}

export default function EditClientModal({
  isOpen,
  onClose,
  onUpdated,
  client,
}: EditClientModalProps) {
  const [name, setName] = useState(client.name);
  const [discordId, setDiscordId] = useState(client.discordId || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !discordId.trim()) {
      setError('Name and Discord ID are required.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/clients/${client.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          discordId: discordId.trim(),
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update client');
      }
      onUpdated();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-card border border-border rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fadeIn">
        <button
          className="absolute top-3 right-4 text-muted-foreground hover:text-foreground text-2xl"
          onClick={onClose}
          aria-label="Close"
          disabled={loading}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Edit Client</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">
              Name <span className="text-destructive">*</span>
            </label>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={loading}
              required
              placeholder="Name"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Discord ID <span className="text-destructive">*</span>
            </label>
            <Input
              value={discordId}
              onChange={e => setDiscordId(e.target.value)}
              disabled={loading}
              required
              placeholder="@user#1234"
            />
          </div>
          {error && (
            <div className="text-destructive text-sm">{error}</div>
          )}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-4"
              loading={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}