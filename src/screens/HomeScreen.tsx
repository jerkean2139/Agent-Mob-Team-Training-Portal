import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { signOut } from '../lib/auth';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome to Client Portal</h1>
            <Button onClick={handleSignOut} icon={LogOut}>
              Sign Out
            </Button>
          </div>
          <p className="mt-2 text-gray-600">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}