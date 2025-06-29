'use client';

import { useState } from 'react';
import AddCommissionModal from './AddCommissionModal';
import AddCharacterModal from './AddCharacterModal';
import NoteModal from './NoteModal';
import NoteItem from './NoteItem';

// Import new modals for detail/edit
import CharacterDetailModal from './CharacterDetailModal';
import CommissionDetailModal from './CommissionDetailModal';
import Button from './ui/Button';

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
  edit?: boolean;
};

type Note = {
  id: number;
  content: string;
  clientId: number;
  createdAt: string;
};

import EditClientModal from './EditClientModal';

import EditClientModal from './EditClientModal';

type Client = {
  id: number;
  name: string;
  discordId: string | null;
  commissions: Commission[];
  characters: Character[];
  notes: Note[];
};

type ClientDetailsProps = {
  client: Client;
  loading: boolean;
  onRefresh: () => void;
  onDeleted?: () => void;
};

export default function ClientDetails({ client, loading, onRefresh, onDeleted }: ClientDetailsProps) {
  id: number;
  name: string;
  discordId: string | null;
  commissions: Commission[];
  characters: Character[];
  notes: Note[];
};

type ClientDetailsProps = {
  client: Client;
  loading: boolean;
  onRefresh: () => void;
  onDeleted?: () => void;
};

export default function ClientDetails({ client, loading, onRefresh, onDeleted }: ClientDetailsProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [showAddCharacter, setShowAddCharacter] = useState(false);

  // State for opening details/edit modals
  const [openCommission, setOpenCommission] = useState<Commission | null>(null);
  const [openCharacter, setOpenCharacter] = useState<Character | null>(null);

  // Notes modal state
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [editNote, setEditNote] = useState<Note | undefined>(undefined);

  // Handle delete for commission/character
  const handleDeleteCommission = async (commissionId: number) => {
    if (!confirm('Are you sure you want to delete this commission?')) return;
    await fetch(`/api/commissions/${commissionId}`, { method: 'DELETE' });
    onRefresh();
  };
  const handleDeleteCharacter = async (characterId: number) => {
    if (!confirm('Are you sure you want to delete this character?')) return;
    await fetch(`/api/characters/${characterId}`, { method: 'DELETE' });
    onRefresh();
  };

  // Handle delete note
  const handleDeleteNote = async (noteId: number) => {
    if (!confirm('Delete this note?')) return;
    await fetch(`/api/notes/${noteId}`, { method: 'DELETE' });
    onRefresh();
  };

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

  const [showEditClient, setShowEditClient] = useState(false);

  const [showEditClient, setShowEditClient] = useState(false);

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

  const handleDeleteClient = async () => {
    if (!window.confirm('Are you sure you want to delete this client? This will also delete all related commissions, characters, and notes.')) return;
    await fetch(`/api/clients/${client.id}`, { method: 'DELETE' });
    if (onDeleted) onDeleted();
  };

  // Delete client (with confirmation)
  const handleDeleteClient = async () => {
    if (!window.confirm('Are you sure you want to delete this client? This will also delete all related commissions, characters, and notes.')) return;
    await fetch(`/api/clients/${client.id}`, { method: 'DELETE' });
    if (onDeleted) onDeleted();
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-200 flex items-center gap-2">
            {client.name}
            <button
              className="ml-2 px-2 py-1 text-xs rounded-lg bg-gray-700/40 hover:bg-gray-700/70 text-gray-300 hover:text-blue-300 transition-colors shadow"
              title="Edit Client"
              onClick={() => setShowEditClient(true)}
            >
              <span className="material-icons align-middle" style={{ fontSize: '18px' }}>edit</span>
            </button>
          </h1>
          <div className="mt-2 text-gray-400">
            {client.discordId && <p>Discord ID: {client.discordId}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <Button
            variant="primary"
            onClick={() => setShowAdd(true)}
            aria-label="Add Commission"
            title="Create a new commission"
          >
            <span className="align-middle text-lg mr-1">+</span>
            New Commission
          </Button>
          <Button
            variant="success"
            onClick={() => setShowAddCharacter(true)}
            aria-label="Add Character"
            title="Create a new character"
          >
            <span className="align-middle text-lg mr-1">+</span>
            New Character
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteClient}
          >
            Delete Client
          </Button>
        </div>
      </div>
      <EditClientModal
        isOpen={showEditClient}
        onClose={() => setShowEditClient(false)}
        client={{
          id: client.id,
          name: client.name,
          discordId: client.discordId,
        }}
        onUpdated={() => {
          onRefresh();
          setShowEditClient(false);
        }}
      />
      </div>

      <EditClientModal
        isOpen={showEditClient}
        onClose={() => setShowEditClient(false)}
        client={{
          id: client.id,
          name: client.name,
          discordId: client.discordId,
        }}
        onUpdated={() => {
          onRefresh();
          setShowEditClient(false);
        }}
      />

      {/* Commissions Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-300 border-b border-white/10 pb-2">
            Commissions
          </h2>
        </div>
        {client.commissions.length === 0 ? (
          <p className="text-gray-500">No commissions found for this client.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {client.commissions.map((commission, idx) => (
              <div
                key={commission.id}
                className="glass p-4 rounded-lg shadow-lg animate-fadeIn group relative"
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg text-gray-100 flex items-center gap-2">
                      {commission.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        commission.status
                      )}`}
                    >
                      {commission.status}
                    </span>
                  </div>
                  {commission.description && (
                    <p className="text-gray-400">{commission.description}</p>
                  )}
                  <div className="mt-1 text-sm text-gray-500">
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
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button
                      variant="primary"
                      onClick={() => setOpenCommission(commission)}
                    >
                      Open
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setOpenCommission({ ...commission, edit: true })}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteCommission(commission.id)}
                    >
                      Delete
                    </Button>
                  </div>
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
        {/* Commission Detail Modal */}
        {openCommission && (
          <CommissionDetailModal
            commission={openCommission}
            isOpen={!!openCommission}
            onClose={() => setOpenCommission(null)}
            onUpdated={onRefresh}
            onDeleted={() => {
              setOpenCommission(null);
              onRefresh();
            }}
          />
        )}
      </div>

      {/* Characters Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-300 border-b border-white/10 pb-2">
            Characters
          </h2>
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
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium text-lg text-gray-100">{character.name}</h3>
                  {character.description && (
                    <p className="text-gray-400">{character.description}</p>
                  )}
                  {character.imageUrl && (
                    <div className="mt-2 bg-gray-900/40 h-32 flex items-center justify-center rounded">
                      <p className="text-gray-500 text-sm">Image: {character.imageUrl}</p>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button
                      variant="primary"
                      onClick={() => setOpenCharacter(character)}
                    >
                      Open
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setOpenCharacter({ ...character, edit: true })}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteCharacter(character.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
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
        {/* Character Detail Modal */}
        {openCharacter && (
          <CharacterDetailModal
            character={openCharacter}
            isOpen={!!openCharacter}
            onClose={() => setOpenCharacter(null)}
            onUpdated={onRefresh}
            onDeleted={() => {
              setOpenCharacter(null);
              onRefresh();
            }}
          />
        )}
      </div>

      {/* Notes Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-300 border-b border-white/10 pb-2">
            Notes
          </h2>
          <Button
            variant="success"
            onClick={() => {
              setEditNote(undefined);
              setShowNoteModal(true);
            }}
            aria-label="Add Note"
            title="Create a new note"
          >
            <span className="align-middle text-lg mr-1">+</span>
            Add Note
          </Button>
        </div>
        {client.notes.length === 0 ? (
          <p className="text-gray-500">No notes found for this client.</p>
        ) : (
          <div className="space-y-3">
            {client.notes.map((note, idx) => (
              <NoteItem
                key={note.id}
                note={note}
                onEdit={() => {
                  setEditNote(note);
                  setShowNoteModal(true);
                }}
                onDelete={() => handleDeleteNote(note.id)}
              />
            ))}
          </div>
        )}
        {/* Note Modal */}
        <NoteModal
          clientId={client.id}
          note={editNote}
          isOpen={showNoteModal}
          onClose={() => setShowNoteModal(false)}
          onSaved={onRefresh}
        />
      </div>
    </div>
  );
}