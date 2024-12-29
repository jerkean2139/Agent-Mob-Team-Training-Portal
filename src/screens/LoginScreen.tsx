import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Bot } from 'lucide-react';
import { signIn } from '../lib/auth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      // Check if we should redirect to client portal
      const isClientLogin = email.toLowerCase().includes('client');
      const redirectTo = isClientLogin ? '/client-portal' : '/';
      navigate(redirectTo);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Bot className="w-12 h-12 text-primary" />
            <h1 className="text-4xl font-bold text-primary">Agent Mob</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Sign In
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <Input
              type="email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <Button
            type="submit"
            loading={loading}
            icon={LogIn}
            className="w-full"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>

          <div className="text-sm text-center text-gray-600">
            <p>Team login: test@team.com / testpassword123</p>
            <p>Client login: test@client.com / testpassword123</p>
          </div>
        </form>
      </div>
    </div>
  );
}