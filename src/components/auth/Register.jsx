import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Terminal, Lock, Mail, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { getRandomAvatar } from '../../utils/avatars';

export const Register = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, signInWithApple } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null);

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

    // Assign random avatar on registration
    const randomAvatar = getRandomAvatar();

    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.fullName,
      avatar: randomAvatar.id,
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

  const handleGoogleSignUp = async () => {
    setError('');
    setOauthLoading('google');
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
      setOauthLoading(null);
    }
  };

  const handleAppleSignUp = async () => {
    setError('');
    setOauthLoading('apple');
    const { error } = await signInWithApple();
    if (error) {
      setError(error.message);
      setOauthLoading(null);
    }
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
              disabled={loading || oauthLoading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cyber-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-cyber-bg-secondary px-2 text-cyber-gray-500 font-mono">
                Or sign up with
              </span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              variant="ghost"
              className="w-full flex items-center justify-center gap-2 border-cyber-border hover:border-cyber-yellow"
              onClick={handleGoogleSignUp}
              disabled={loading || oauthLoading}
            >
              {oauthLoading === 'google' ? (
                <span className="font-mono">Connecting...</span>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#fcee0a" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#f0a500" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#737373" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#525252" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-mono">Sign up with Google</span>
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full flex items-center justify-center gap-2 border-cyber-border hover:border-cyber-yellow"
              onClick={handleAppleSignUp}
              disabled={loading || oauthLoading}
            >
              {oauthLoading === 'apple' ? (
                <span className="font-mono">Connecting...</span>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#fcee0a">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <span className="font-mono">Sign up with Apple</span>
                </>
              )}
            </Button>
          </div>

          <div className="text-center space-y-2">
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

