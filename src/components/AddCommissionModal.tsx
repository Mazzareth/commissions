'use client';

import { useState } from 'react';

interface AddCommissionModalProps {
  clientId: number;
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void; // callback to refresh parent once commission is saved
}

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

export default function AddCommissionModal({
  clientId,
  isOpen,
  onClose,
  onCreated,
}: AddCommissionModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [completedAt, setCompletedAt] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Don't render if modal not open
  if (!isOpen) return null;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setStatus('pending');
    setDueDate('');
    setCompletedAt('');
    setNote('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    setLoading(true);
    try {
      const payload: any = {
        title: title.trim(),
        description: description.trim() || null,
        price: price ? Number(price) : undefined,
        status,
        clientId,
        dueDate: dueDate || null,
        note: note.trim() || undefined,
      };
      // Add startDate (now)
      payload.startDate = new Date().toISOString();
      // Only include completedAt if status is completed and date is provided
      if (status === 'completed' && completedAt) {
        payload.completedAt = completedAt;
      }

      const res = await fetch('/api/commissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create commission');
      }
      resetForm();
      onCreated();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create commission');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center">
      <div className="bg-gray-900 rounded-xl shadow-2xl glass p-8 w-full max-w-md relative animate-fadeIn">
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-100 text-2xl"
          onClick={onClose}
          aria-label="Close"
          disabled={loading}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-100">Add Commission</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1 font-medium">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              disabled={loading}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-gray-300 mb-1">Price ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none"
                value={price}
                onChange={e => setPrice(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-300 mb-1">Status</label>
              <select
                className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none"
                value={status}
                onChange={e => setStatus(e.target.value)}
                disabled={loading}
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Due Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              disabled={loading}
            />
          </div>
          {status === 'completed' && (
            <div>
              <label className="block text-gray-300 mb-1">Completed At</label>
              <input
                type="date"
                className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none"
                value={completedAt}
                onChange={e => setCompletedAt(e.target.value)}
                disabled={loading}
              />
            </div>
          )}
          <div>
            <label className="block text-gray-300 mb-1">Optional Note</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none"
              value={note}
              onChange={e => setNote(e.target.value)}
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
              {loading ? 'Adding...' : 'Add Commission'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}