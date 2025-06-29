'use client';

import { useState } from 'react';
import AddCommissionModal from './AddCommissionModal';
import AddCharacterModal from './AddCharacterModal';

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

type Client = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  commissions: Commission[];
  characters: Character[];
  notes: Note[];
};

type ClientDetailsProps = {
  client: Client;
  loading: boolean;
  onRefresh: () => void;
};

export default function ClientDetails({ client, loading, onRefresh }: ClientDetailsProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [showAddCharacter, setShowAddCharacter] = useState(false);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-700/40 rounded w-1/4"></div>
          <div className="h-4 bg-gray-700/40 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700/40 rounded w-1/3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700/40 rounded"></div>
            <div className="h-4 bg-gray-700/40 rounded"></div>
            <div className="h-4 bg-gray-700/40 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Format date function
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-600/20 text-green-300';
      case 'in-progress':
        return 'bg-blue-600/20 text-blue-300';
      case 'pending':
        return 'bg-yellow-600/20 text-yellow-300';
      default:
        return 'bg-gray-700/40 text-gray-300';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-200">{client.name}</h1>
        <div className="mt-2 text-gray-400">
          {client.email && <p>Email: {client.email}</p>}
          {client.phone && <p>Phone: {client.phone}</p>}
        </div>
      </div>

      {/* Commissions Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-300 border-b border-white/10 pb-2">
            Commissions
          </h2>
          <button
            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition-colors"
            onClick={() => setShowAdd(true)}
          >
            + Add Commission
          </button>
        </div>
        {client.commissions.length === 0 ? (
          <p className="text-gray-500">No commissions found for this client.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {client.commissions.map((commission, idx) => (
              <div
                key={commission.id}
                className="glass p-4 rounded-lg shadow-lg animate-fadeIn"
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg text-gray-100">{commission.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      commission.status
                    )}`}
                  >
                    {commission.status}
                  </span>
                </div>
                {commission.description && (
                  <p className="text-gray-400 mt-2">{commission.description}</p>
                )}
                <div className="mt-3 text-sm text-gray-500">
                  <p>
                    Price: <span className="text-gray-300">${commission.price.toFixed(2)}</span>
                  </p>
                  <p>
                    Start Date: <span className="text-gray-300">{formatDate(commission.startDate)}</span>
                  </p>
                  <p>
                    Due Date: <span className="text-gray-300">{formatDate(commission.dueDate)}</span>
                  </p>
                  {commission.completedAt && (
                    <p>
                      Completed: <span className="text-gray-300">{formatDate(commission.completedAt)}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Commission Modal */}
        <AddCommissionModal
          clientId={client.id}
          isOpen={showAdd}
          onClose={() => setShowAdd(false)}
          onCreated={() => {
            onRefresh();
            setShowAdd(false);
          }}
        />
      </div>

      {/* Characters Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-300 border-b border-white/10 pb-2">
            Characters
          </h2>
          <button
            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition-colors"
            onClick={() => setShowAddCharacter(true)}
          >
            + Add Character
          </button>
        </div>
        {client.characters.length === 0 ? (
          <p className="text-gray-500">No characters found for this client.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {client.characters.map((character, idx) => (
              <div
                key={character.id}
                className="glass p-4 rounded-lg shadow-lg animate-fadeIn"
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                <h3 className="font-medium text-lg text-gray-100">{character.name}</h3>
                {character.description && (
                  <p className="text-gray-400 mt-2">{character.description}</p>
                )}
                {character.imageUrl && (
                  <div className="mt-3 bg-gray-900/40 h-40 flex items-center justify-center rounded">
                    <p className="text-gray-500 text-sm">Image placeholder: {character.imageUrl}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <AddCharacterModal
          clientId={client.id}
          isOpen={showAddCharacter}
          onClose={() => setShowAddCharacter(false)}
          onCreated={() => {
            onRefresh();
            setShowAddCharacter(false);
          }}
        />
      </div>

      {/* Notes Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-300 border-b border-white/10 pb-2">
          Notes
        </h2>
        {client.notes.length === 0 ? (
          <p className="text-gray-500">No notes found for this client.</p>
        ) : (
          <div className="space-y-3">
            {client.notes.map((note, idx) => (
              <div
                key={note.id}
                className="glass p-4 rounded-lg shadow-lg animate-fadeIn"
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                <p className="text-gray-200">{note.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Added on <span className="text-gray-300">{formatDate(note.createdAt)}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}