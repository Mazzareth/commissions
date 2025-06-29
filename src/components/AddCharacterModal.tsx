'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/Button';

interface AddCharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
  clientId: number;
}

export default function AddCharacterModal({
  isOpen,
  onClose,
  onCreated,
  clientId,
}: AddCharacterModalProps) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setDesc('');
    setImageUrl('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    setLoading(true);
    try {
      const payload: any = {
        name: name.trim(),
        description: desc.trim(),
        imageUrl: imageUrl.trim(),
        clientId,
      };
      const res = await fetch('/api/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create character');
      }
      resetForm();
      onCreated();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create character');
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
        <h2 className="text-xl font-bold mb-4">Add Character</h2>
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
              Description
            </label>
            <Textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              rows={2}
              disabled={loading}
              placeholder="A short description"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Image URL
            </label>
            <Input
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              disabled={loading}
              placeholder="https://example.com/image.png"
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
              {loading ? 'Adding...' : 'Add Character'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}