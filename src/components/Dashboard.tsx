'use client';

import { useState, useEffect } from 'react';
import ClientList from './ClientList';
import ClientDetails from './ClientDetails';

type Client = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
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

  // Fetch all clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
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

    fetchClients();
  }, []);

  // Fetch client details when a client is selected
  const handleClientSelect = async (clientId: number) => {
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

  return (
    <div className="flex h-screen">
      {/* Sidebar with client list */}
      <div className="w-64 glass shadow-xl animate-slideUp">
        <div className="p-4 border-b border-white/10">
          <h1 className="text-xl font-semibold text-gray-100">Commission Dashboard</h1>
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
          <div className="p-4 m-4 bg-red-900/30 text-red-300 rounded-lg glass animate-fadeIn">
            {error}
          </div>
        )}
        
        {selectedClient ? (
          <ClientDetails client={selectedClient} loading={loading} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-400 animate-fadeIn">
              <h2 className="text-xl font-medium mb-2">No Client Selected</h2>
              <p>Select a client from the list to view their details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}