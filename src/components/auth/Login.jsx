import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Terminal, Lock, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-bg scanlines p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Terminal className="text-cyber-yellow" size={32} />
            <h1 className="text-3xl font-display font-bold uppercase tracking-wider text-cyber-yellow">
              Cyberdeck
            </h1>
          </div>
          <CardTitle className="text-2xl">Access Terminal</CardTitle>
          <p className="text-sm text-cyber-gray-500 font-mono mt-2">
            Enter your credentials to continue
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 border border-red-700 bg-red-900/20 text-red-400 text-sm font-mono">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-mono uppercase text-cyber-gray-400 mb-2">
                <Mail className="inline mr-2" size={14} />
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-mono uppercase text-cyber-gray-400 mb-2">
                <Lock className="inline mr-2" size={14} />
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="current-password"
              />
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Accessing...' : 'Access System'}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-cyber-gray-500 font-mono">
              Don't have an account?{' '}
              <Link to="/register" className="text-cyber-yellow hover:underline">
                Register
              </Link>
            </p>
            <Link 
              to="/forgot-password" 
              className="block text-sm text-cyber-gray-500 hover:text-cyber-yellow font-mono"
            >
              Forgot password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

