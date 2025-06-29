'use client';

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
};

export default function ClientDetails({ client, loading }: ClientDetailsProps) {
  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
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
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
        <div className="mt-2 text-gray-600">
          {client.email && <p>Email: {client.email}</p>}
          {client.phone && <p>Phone: {client.phone}</p>}
        </div>
      </div>

      {/* Commissions Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Commissions</h2>
        {client.commissions.length === 0 ? (
          <p className="text-gray-500">No commissions found for this client.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {client.commissions.map((commission) => (
              <div key={commission.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg">{commission.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(commission.status)}`}>
                    {commission.status}
                  </span>
                </div>
                {commission.description && (
                  <p className="text-gray-600 mt-2">{commission.description}</p>
                )}
                <div className="mt-3 text-sm text-gray-500">
                  <p>Price: ${commission.price.toFixed(2)}</p>
                  <p>Start Date: {formatDate(commission.startDate)}</p>
                  <p>Due Date: {formatDate(commission.dueDate)}</p>
                  {commission.completedAt && (
                    <p>Completed: {formatDate(commission.completedAt)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Characters Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Characters</h2>
        {client.characters.length === 0 ? (
          <p className="text-gray-500">No characters found for this client.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {client.characters.map((character) => (
              <div key={character.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-lg">{character.name}</h3>
                {character.description && (
                  <p className="text-gray-600 mt-2">{character.description}</p>
                )}
                {character.imageUrl && (
                  <div className="mt-3 bg-gray-100 h-40 flex items-center justify-center rounded">
                    <p className="text-gray-400 text-sm">Image placeholder: {character.imageUrl}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notes Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Notes</h2>
        {client.notes.length === 0 ? (
          <p className="text-gray-500">No notes found for this client.</p>
        ) : (
          <div className="space-y-3">
            {client.notes.map((note) => (
              <div key={note.id} className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-700">{note.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Added on {formatDate(note.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}