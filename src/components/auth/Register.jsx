import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Terminal, Lock, Mail, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.fullName,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyber-bg scanlines p-4">
        <Card className="w-full max-w-md">
          <CardContent className="py-8 text-center">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-display font-bold text-cyber-yellow mb-2">
              Registration Successful!
            </h2>
            <p className="text-cyber-gray-400 font-mono">
              Check your email for verification link.
              <br />
              Redirecting to login...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <p className="text-sm text-cyber-gray-500 font-mono mt-2">
            Register for system access
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
                <User className="inline mr-2" size={14} />
                Full Name
              </label>
              <Input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-mono uppercase text-cyber-gray-400 mb-2">
                <Mail className="inline mr-2" size={14} />
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
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
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Min. 6 characters"
                required
                autoComplete="new-password"
              />
            </div>

            <div>
              <label className="block text-sm font-mono uppercase text-cyber-gray-400 mb-2">
                <Lock className="inline mr-2" size={14} />
                Confirm Password
              </label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="Repeat password"
                required
                autoComplete="new-password"
              />
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-cyber-gray-500 font-mono">
              Already have an account?{' '}
              <Link to="/login" className="text-cyber-yellow hover:underline">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

