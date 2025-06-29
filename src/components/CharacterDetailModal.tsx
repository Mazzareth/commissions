import React from "react";

interface CharacterDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  character?: any; // Replace 'any' with a proper type when available
}

const CharacterDetailModal: React.FC<CharacterDetailModalProps> = ({
  isOpen,
  onClose,
  character
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[300px] max-w-lg">
        <h2 className="text-xl font-bold mb-4">Character Detail</h2>
        {character ? (
          <pre className="mb-4">{JSON.stringify(character, null, 2)}</pre>
        ) : (
          <p className="mb-4 text-gray-500">No character selected.</p>
        )}
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CharacterDetailModal;