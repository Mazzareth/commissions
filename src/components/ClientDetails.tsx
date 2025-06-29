'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import { Pencil, Trash, RefreshCw } from "lucide-react";

type ClientWithDetails = {
  id: number;
  name: string;
  discordId: string | null;
  commissions: Commission[];
  characters: Character[];
  notes: Note[];
};

type Commission = {
  id: number;
  title: string;
  description: string | null;
  price: number;
  status: string;
  startDate: string;
  dueDate: string | null;
  completedAt: string | null;
  clientId: number;
};

type Character = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  clientId: number;
};

type Note = {
  id: number;
  content: string;
  clientId: number;
  createdAt: string;
};

interface ClientDetailsProps {
  client: ClientWithDetails;
  loading: boolean;
  onRefresh: () => void;
  onDeleted: () => void;
}

export default function ClientDetails({
  client,
  loading,
  onRefresh,
  onDeleted,
}: ClientDetailsProps) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card border border-border shadow-lg rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-foreground">
          {client.name}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEdit(true)}
            disabled={loading}
            title="Edit Client"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onDeleted}
            disabled={loading}
            title="Delete Client"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-muted-foreground text-sm mb-1">
        Discord: {client.discordId || <span className="italic text-muted-foreground">none</span>}
      </div>
      {/* ...commissions, characters, notes, etc... */}
      {/* Placeholder for brevity */}
      <div className="mt-4 flex gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          Refresh
        </Button>
      </div>
    </div>
  );
}
}