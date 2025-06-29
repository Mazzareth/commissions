import React, { useState, useEffect } from 'react';
import Button from './ui/Button';

type Note = {
  id: number;
  content: string;
  createdAt: string;
  clientId: number;
};

interface NoteModalProps {
  clientId: number;
  note?: Note;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

/**
 * Modal to create or edit a note.
 * If note prop present, acts as edit.
 */
const NoteModal: React.FC<NoteModalProps> = ({
  clientId,
  note,
  isOpen,
  onClose,
  onSaved,
}) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (note) setContent(note.content);
    else setContent('');
    setTouched(false);
    setError(null);
  }, [note, isOpen]);

  const handleSave = async () => {
    setTouched(true);
    if (!content.trim()) {
      setError('Please enter note content.');
      return;
    }
    setLoading(true);
    try {
      const method = note ? 'PUT' : 'POST';
      const url = note ? `/api/notes/${note.id}` : '/api/notes';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          clientId,
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || 'Failed to save note');
      }
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save note');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-gray-900/95 rounded-xl shadow-2xl w-full max-w-md p-7 relative animate-fadeIn glass">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-blue-300 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="material-icons" style={{ fontSize: 24 }}>close</span>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-100">
          {note ? 'Edit Note' : 'Add Note'}
        </h2>
        <textarea
          className="w-full min-h-[90px] max-h-52 p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Enter your note here..."
          value={content}
          onChange={e => {
            setContent(e.target.value);
            setTouched(true);
            if (error) setError(null);
          }}
          onBlur={() => setTouched(true)}
          disabled={loading}
          maxLength={1000}
        />
        {touched && error && (
          <div className="text-red-400 text-xs mt-2">{error}</div>
        )}
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button variant="success" onClick={handleSave} loading={loading}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;