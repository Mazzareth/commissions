'use client';

import { useState } from 'react';

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
  const [handle, setHandle] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setHandle('');
    setNote('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !handle.trim()) {
      setError('Name and handle are required.');
      return;
    }
    setLoading(true);
    try {
      const payload: any = {
        name: name.trim(),
        handle: handle.trim(),
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
        <h2 className="text-xl font-bold mb-4 text-gray-100">Add Client</h2>
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
              Handle <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none"
              value={handle}
              onChange={e => setHandle(e.target.value)}
              disabled={loading}
              required
              placeholder="@handle"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Optional Note</label>
            <textarea
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none"
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={2}
              disabled={loading}
              placeholder="Add a note for this client (optional)"
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
                '+'
              )}
              {loading ? 'Adding...' : 'Add Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}