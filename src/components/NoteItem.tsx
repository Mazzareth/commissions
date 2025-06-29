import React from 'react';

type Note = {
  id: number;
  content: string;
  createdAt: string;
};

interface NoteItemProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit, onDelete }) => {
  return (
    <div className="glass p-4 rounded-lg shadow-lg flex items-start justify-between group animate-fadeIn">
      <div>
        <p className="text-gray-200">{note.content}</p>
        <p className="text-xs text-gray-500 mt-2">
          Added on <span className="text-gray-300">{new Date(note.createdAt).toLocaleDateString()}</span>
        </p>
      </div>
      <div className="flex flex-col gap-1 items-center ml-4">
        <button
          className="text-gray-400 hover:text-green-400 transition-colors"
          title="Edit Note"
          onClick={onEdit}
        >
          <span className="material-icons" style={{ fontSize: 20 }}>edit</span>
        </button>
        <button
          className="text-gray-400 hover:text-red-400 transition-colors"
          title="Delete Note"
          onClick={onDelete}
        >
          <span className="material-icons" style={{ fontSize: 20 }}>delete</span>
        </button>
      </div>
    </div>
  );
};

export default NoteItem;