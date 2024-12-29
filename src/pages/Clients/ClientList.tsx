import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '../../hooks/useClients';
import ClientCard from './ClientCard';

interface ClientListProps {
  onSelect: (id: string) => void;
  selectedId: string | null;
}

export default function ClientList({ onSelect, selectedId }: ClientListProps) {
  const { clients, loading } = useClients();
  const navigate = useNavigate();

  const handleClientClick = (clientId: string) => {
    onSelect(clientId);
    navigate(`/clients/${clientId}/training`);
  };

  if (loading) {
    return <div className="p-4">Loading clients...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">Active Clients</h2>
      </div>
      <div className="divide-y">
        {clients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            selected={client.id === selectedId}
            onClick={() => handleClientClick(client.id)}
          />
        ))}
      </div>
    </div>
  );
}