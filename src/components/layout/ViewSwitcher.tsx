import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bot, Users } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function ViewSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  const isTeamView = !location.pathname.includes('/client-portal');

  const handleTeamView = () => {
    navigate('/');
  };

  const handleClientView = () => {
    navigate('/client-portal');
  };

  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg border p-1 z-50">
      <div className="flex items-center gap-1">
        <button
          onClick={handleTeamView}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
            isTeamView 
              ? 'bg-primary text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">Team View</span>
        </button>
        <button
          onClick={handleClientView}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
            !isTeamView 
              ? 'bg-primary text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span className="text-sm font-medium">Client View</span>
        </button>
      </div>
    </div>
  );
}