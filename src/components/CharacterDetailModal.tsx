import React, { useState } from "react";
import Button from "./ui/Button";

type Character = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  clientId: number;
  edit?: boolean;
};

interface CharacterDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  character?: Character;
  onUpdated?: () => void;
  onDeleted?: () => void;
}

const CharacterDetailModal: React.FC<CharacterDetailModalProps> = ({
  isOpen,
  onClose,
  character,
  onUpdated = () => {},
  onDeleted = () => {},
}) => {
  const [editData, setEditData] = useState({
    name: character?.name || "",
    description: character?.description || "",
    imageUrl: character?.imageUrl || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    setEditData({
      name: character?.name || "",
      description: character?.description || "",
      imageUrl: character?.imageUrl || "",
    });
    setError(null);
  }, [character, isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!character) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/characters/${character.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || "Failed to update character");
      }
      onUpdated();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update character");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-lg p-8 relative animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          {/* Use lucide-react X icon if desired, otherwise keep times symbol */}
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          {character?.edit ? "Edit Character" : "Character Details"}
        </h2>
        {character ? (
          character.edit ? (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-muted-foreground mb-1">Name</label>
                <input
                  className="w-full p-2 rounded bg-background text-foreground border border-border focus:outline-none"
                  value={editData.name}
                  onChange={e => setEditData(d => ({ ...d, name: e.target.value }))}
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block font-semibold text-muted-foreground mb-1">Description</label>
                <textarea
                  className="w-full min-h-[60px] p-2 rounded bg-background text-foreground border border-border focus:outline-none"
                  value={editData.description}
                  onChange={e => setEditData(d => ({ ...d, description: e.target.value }))}
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block font-semibold text-muted-foreground mb-1">Image URL</label>
                <input
                  className="w-full p-2 rounded bg-background text-foreground border border-border focus:outline-none"
                  value={editData.imageUrl}
                  onChange={e => setEditData(d => ({ ...d, imageUrl: e.target.value }))}
                  disabled={loading}
                />
              </div>
              {error && <div className="text-destructive text-xs mt-2">{error}</div>}
            </div>
          ) : (
            <div className="space-y-2">
              <div>
                <span className="font-semibold text-muted-foreground">Name:</span> <span className="text-foreground">{character.name}</span>
              </div>
              {character.description && (
                <div>
                  <span className="font-semibold text-muted-foreground">Description:</span> <span className="text-foreground">{character.description}</span>
                </div>
              )}
              {character.imageUrl && (
                <div>
                  <span className="font-semibold text-muted-foreground">Image URL:</span> <span className="text-foreground">{character.imageUrl}</span>
                </div>
              )}
            </div>
          )
        ) : (
          <p className="mb-4 text-muted-foreground">No character selected.</p>
        )}
        <div className="flex gap-2 mt-8 justify-end">
          {character?.edit ? (
            <Button variant="primary" onClick={handleSave} loading={loading}>
              Save
            </Button>
          ) : (
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          )}
          {character && (
            <Button
              variant="danger"
              onClick={() => {
                if (onDeleted) onDeleted();
                onClose();
              }}
              disabled={loading}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailModal;