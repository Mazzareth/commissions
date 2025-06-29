'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/Button';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function AddClientModal({
  isOpen,
  onClose,
  onCreated,
}: AddClientModalProps) {
  const [name, setName] = useState('');
  const [discordId, setDiscordId] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setDiscordId('');
    setNote('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !discordId.trim()) {
      setError('Name and Discord ID are required.');
      return;
    }
    setLoading(true);
    try {
      const payload: any = {
        name: name.trim(),
        discordId: discordId.trim(),
      };
      if (note.trim()) {
        payload.note = note.trim();
      }
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create client');
      }
      resetForm();
      onCreated();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create client');
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
        <h2 className="text-xl font-bold mb-4">Add Client</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">
              Name <span className="text-destructive">*</span>
            </label>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
              disabled={loading}
              required
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
          <div>
            <label className="block mb-1">Optional Note</label>
            <Textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={2}
              disabled={loading}
              placeholder="Add a note for this client (optional)"
            />
          </div>
          {error && (
            <div className="text-destructive text-sm">{error}</div>
          )}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-4"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin inline-block mr-2">&#9696;</span>
              ) : (
                '+'
              )}
              {loading ? 'Adding...' : 'Add Client'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}