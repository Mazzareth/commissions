'use client';

import { useState, useEffect } from 'react';
import ClientList from './ClientList';
import ClientDetails from './ClientDetails';
import AddClientModal from './AddClientModal';
import { Button } from './ui/Button';

type Client = {
  id: number;
  name: string;
  discordId: string | null;
};

type ClientWithDetails = Client & {
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

export default function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddClient, setShowAddClient] = useState(false);

  // Fetch all clients (now reusable)
  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/clients');
      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }
      const data = await response.json();
      setClients(data);
      setLoading(false);
    } catch (err) {
      setError('Error loading clients. Please try again.');
      setLoading(false);
      console.error('Error fetching clients:', err);
    }
  };

  useEffect(() => {
    fetchClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Factor out logic to load a client by id
  const loadClient = async (clientId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/clients/${clientId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch client details');
      }
      const data = await response.json();
      setSelectedClient(data);
      setLoading(false);
    } catch (err) {
      setError('Error loading client details. Please try again.');
      setLoading(false);
      console.error('Error fetching client details:', err);
    }
  };

  // Fetch client details when a client is selected
  const handleClientSelect = (clientId: number) => {
    setSelectedClient(null);
    loadClient(clientId);
  };

  // After client deletion, clear selected client and refresh list
  const handleClientDeleted = () => {
    setSelectedClient(null);
    fetchClients();
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar with client list */}
      <div className="w-64 bg-card border-r border-border shadow-xl animate-slideUp">
        <div className="p-4 border-b border-border bg-background flex items-center justify-between">
          <h1 className="text-xl font-semibold">Commission Dashboard</h1>
          <div className="flex gap-2">
            {/* Create Client Floating Button */}
            <Button
              variant="primary"
              onClick={() => setShowAddClient(true)}
              aria-label="Add Client"
              title="Create a new client"
              size="sm"
            >
              <span className="text-lg mr-1 align-middle">+</span>
              <span className="align-middle whitespace-nowrap">New Client</span>
            </Button>
          </div>
        </div>
        <ClientList 
          clients={clients} 
          onSelectClient={handleClientSelect} 
          selectedClientId={selectedClient?.id}
          loading={loading}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto px-6 py-4">
        {error && (
          <div className="p-4 m-4 bg-destructive/20 border border-destructive text-destructive rounded-lg animate-fadeIn">
            {error}
          </div>
        )}
        
        {selectedClient ? (
          <ClientDetails
            client={selectedClient}
            loading={loading}
            onRefresh={() => selectedClient && loadClient(selectedClient.id)}
            onDeleted={() => {
              setSelectedClient(null);
              fetchClients();
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground animate-fadeIn">
              <h2 className="text-xl font-medium mb-2">No Client Selected</h2>
              <p>Select a client from the list to view their details</p>
            </div>
          </div>
        )}
      </div>
      {/* Add Client Modal */}
      <AddClientModal
        isOpen={showAddClient}
        onClose={() => setShowAddClient(false)}
        onCreated={() => {
          fetchClients();
          setShowAddClient(false);
        }}
      />
    </div>
  );
}