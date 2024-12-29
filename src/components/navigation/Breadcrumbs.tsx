import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useAgents } from '../../hooks/useAgents';
import { useClients } from '../../hooks/useClients';

export default function Breadcrumbs() {
  const location = useLocation();
  const { agents } = useAgents();
  const { clients } = useClients();
  const paths = location.pathname.split('/').filter(Boolean);

  const getDisplayName = (type: string, id: string) => {
    switch (type) {
      case 'clients':
        const client = clients.find(c => c.id === id);
        return client?.name || id;
      case 'agent':
        const agent = agents.find(a => a.id === id);
        return agent?.name || id;
      default:
        return id;
    }
  };

  const getBreadcrumbPath = (index: number) => {
    const segment = paths[index];
    const prevSegment = index > 0 ? paths[index - 1] : null;
    
    // Handle special cases
    if (prevSegment === 'clients' && segment === 'training') {
      return 'Training Center';
    }
    if (prevSegment === 'agent') {
      return getDisplayName('agent', segment);
    }
    if (segment === 'agent') {
      return 'Agent Details';
    }
    if (segment === 'clients') {
      return 'Clients';
    }
    if (prevSegment === 'clients') {
      return getDisplayName('clients', segment);
    }

    // Default case: capitalize and replace hyphens
    return segment.charAt(0).toUpperCase() + 
           segment.slice(1).replace(/-/g, ' ');
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      <Link
        to="/"
        className="flex items-center hover:text-primary transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>

      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;
        const displayName = getBreadcrumbPath(index);

        return (
          <React.Fragment key={path}>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isLast ? (
              <span className="font-medium text-gray-900">
                {displayName}
              </span>
            ) : (
              <Link
                to={href}
                className="hover:text-primary transition-colors"
              >
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}