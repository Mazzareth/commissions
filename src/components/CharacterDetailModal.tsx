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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-gray-900/95 rounded-xl shadow-xl w-full max-w-lg p-8 relative glass animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-blue-300 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="material-icons" style={{ fontSize: 24 }}>close</span>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-100">
          {character?.edit ? "Edit Character" : "Character Details"}
        </h2>
        {character ? (
          character.edit ? (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Name</label>
                <input
                  className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                  value={editData.name}
                  onChange={e => setEditData(d => ({ ...d, name: e.target.value }))}
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Description</label>
                <textarea
                  className="w-full min-h-[60px] p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                  value={editData.description}
                  onChange={e => setEditData(d => ({ ...d, description: e.target.value }))}
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Image URL</label>
                <input
                  className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                  value={editData.imageUrl}
                  onChange={e => setEditData(d => ({ ...d, imageUrl: e.target.value }))}
                  disabled={loading}
                />
              </div>
              {error && <div className="text-red-400 text-xs mt-2">{error}</div>}
            </div>
          ) : (
            <div className="space-y-2">
              <div>
                <span className="font-semibold text-gray-300">Name:</span> {character.name}
              </div>
              {character.description && (
                <div>
                  <span className="font-semibold text-gray-300">Description:</span> {character.description}
                </div>
              )}
              {character.imageUrl && (
                <div>
                  <span className="font-semibold text-gray-300">Image URL:</span> {character.imageUrl}
                </div>
              )}
            </div>
          )
        ) : (
          <p className="mb-4 text-gray-500">No character selected.</p>
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