import React from 'react';
import { Button } from './ui/Button';
import { Pencil, Trash } from "lucide-react";

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
    <div className="bg-card border border-border p-4 rounded-lg shadow-lg flex items-start justify-between group animate-fadeIn">
      <div>
        <p className="text-foreground">{note.content}</p>
        <p className="text-xs text-muted-foreground mt-2">
          Added on <span className="text-muted-foreground">{new Date(note.createdAt).toLocaleDateString()}</span>
        </p>
      </div>
      <div className="flex flex-col gap-1 items-center ml-4">
        <Button
          variant="ghost"
          size="sm"
          title="Edit Note"
          onClick={onEdit}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="danger"
          size="sm"
          title="Delete Note"
          onClick={onDelete}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default NoteItem;