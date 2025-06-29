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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-md p-7 relative animate-fadeIn">
        <button
          className="absolute top-3 right-3 text-muted-foreground hover:text-primary transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          {/* Use lucide-react X icon if desired, otherwise keep times symbol */}
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          {note ? 'Edit Note' : 'Add Note'}
        </h2>
        <textarea
          className="w-full min-h-[90px] max-h-52 p-2 rounded bg-background text-foreground border border-border focus:outline-none"
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
          <div className="text-destructive text-xs mt-2">{error}</div>
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