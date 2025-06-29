'use client';

type Client = {
  id: number;
  name: string;
  discordId: string | null;
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
      <ul className="divide-y divide-border">
        {clients.map((client, idx) => (
          <li 
            key={client.id}
            className={`
              p-4 cursor-pointer transition-colors rounded-lg 
              hover:bg-card/80
              ${selectedClientId === client.id ? 'bg-primary/15 border-l-4 border-primary' : 'bg-card'}
              animate-fadeIn
            `}
            style={{ animationDelay: `${idx * 60}ms` }} // staggered entrance
            onClick={() => onSelectClient(client.id)}
          >
            <div className="font-medium">{client.name}</div>
            {client.discordId && (
              <div className="text-sm text-muted-foreground truncate">{client.discordId}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}