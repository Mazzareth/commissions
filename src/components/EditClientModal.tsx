'use client';

import { useState, useEffect } from 'react';

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: {
    id: number;
    name: string;
    discordId: string | null;
  };
  onUpdated: () => void;
}

export default function EditClientModal({
  isOpen,
  onClose,
  client,
  onUpdated,
}: EditClientModalProps) {
  const [name, setName] = useState('');
  const [discordId, setDiscordId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && client) {
      setName(client.name ?? '');
      setDiscordId(client.discordId ?? '');
      setError(null);
    }
  }, [isOpen, client]);

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
      const payload: any = {
        name: name.trim(),
        discordId: discordId.trim(),
      };
      const res = await fetch(`/api/clients/${client.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-gray-900 rounded-xl shadow-2xl glass p-8 w-full max-w-md relative animate-fadeIn">
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-100 text-2xl"
          onClick={onClose}
          aria-label="Close"
          disabled={loading}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-100">Edit Client</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1 font-medium">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1 font-medium">
              Discord ID <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none"
              value={discordId}
              onChange={e => setDiscordId(e.target.value)}
              disabled={loading}
              required
              placeholder="@user#1234"
            />
          </div>
          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors shadow disabled:opacity-60"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin inline-block mr-2">&#9696;</span>
              ) : (
                '✎'
              )}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}