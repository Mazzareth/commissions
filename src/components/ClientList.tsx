'use client';

type Client = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
};

type ClientListProps = {
  clients: Client[];
  onSelectClient: (clientId: number) => void;
  selectedClientId?: number;
  loading: boolean;
};

export default function ClientList({ 
  clients, 
  onSelectClient, 
  selectedClientId,
  loading 
}: ClientListProps) {
  if (loading && clients.length === 0) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-700/40 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No clients found
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-[calc(100vh-64px)]">
      <ul className="divide-y divide-white/5">
        {clients.map((client, idx) => (
          <li 
            key={client.id}
            className={`
              p-4 cursor-pointer transition-colors rounded-lg 
              hover:bg-white/5
              ${selectedClientId === client.id ? 'bg-violet-600/20 border-l-4 border-violet-500' : ''}
              animate-fadeIn
            `}
            style={{ animationDelay: `${idx * 60}ms` }} // staggered entrance
            onClick={() => onSelectClient(client.id)}
          >
            <div className="font-medium text-gray-100">{client.name}</div>
            {client.email && (
              <div className="text-sm text-gray-400 truncate">{client.email}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}