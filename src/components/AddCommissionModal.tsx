'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/Button';

interface AddCommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
  clientId: number;
}

export default function AddCommissionModal({
  isOpen,
  onClose,
  onCreated,
  clientId,
}: AddCommissionModalProps) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle('');
    setDesc('');
    setPrice('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !price.trim()) {
      setError('Title and price are required.');
      return;
    }
    setLoading(true);
    try {
      const payload: any = {
        title: title.trim(),
        description: desc.trim(),
        price: parseFloat(price),
        clientId,
      };
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
        <h2 className="text-xl font-bold mb-4">Add Commission</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">
              Title <span className="text-destructive">*</span>
            </label>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={loading}
              required
              placeholder="Title"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Description
            </label>
            <Textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              rows={2}
              disabled={loading}
              placeholder="Commission details"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Price <span className="text-destructive">*</span>
            </label>
            <Input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              disabled={loading}
              required
              min={0}
              step="0.01"
              placeholder="0.00"
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
              {loading ? 'Adding...' : 'Add Commission'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
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