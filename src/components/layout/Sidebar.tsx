import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Bot,
  BarChart2,
  Building2,
  Users, 
  Settings, 
  MessageSquare 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', to: '/', icon: BarChart2 },
  { name: 'Clients', to: '/clients', icon: Building2 },
  { name: 'Team', to: '/team', icon: Users },
  { name: 'Agents', to: '/agents', icon: Bot },
  { name: 'Chat', to: '/chat', icon: MessageSquare },
  { name: 'Settings', to: '/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-[#6A6A4B] text-white">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <Bot className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Agent Mob</h1>
        </div>
      </div>
      <nav className="mt-8">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm ${
                isActive 
                  ? 'bg-[#3A3A3A] text-[#FFFFD5]' 
                  : 'hover:bg-[#3A3A3A] hover:text-[#FFFFD5]'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}