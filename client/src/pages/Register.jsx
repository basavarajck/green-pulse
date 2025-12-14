import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Github } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert('Account Created! Please Login.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:4000/auth/${provider}`;
  };

  return (
    <div className="min-h-screen w-full flex bg-neutral-950">
      
      {/* LEFT SIDE: Form */}
      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-24 xl:px-32">
        <div className="mb-8">
          <Link to="/" className="text-2xl font-bold tracking-tight text-green-500">Green Pulse</Link>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">Create account</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Start your journey with Green Pulse today.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-900/30 p-3 text-sm text-red-200 border border-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
           <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-neutral-500" />
              <input
                name="name"
                type="text"
                required
                className="block w-full rounded-lg border border-neutral-800 bg-neutral-900/50 pl-10 p-2.5 text-white placeholder-neutral-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="John Doe"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-neutral-500" />
              <input
                name="email"
                type="email"
                required
                className="block w-full rounded-lg border border-neutral-800 bg-neutral-900/50 pl-10 p-2.5 text-white placeholder-neutral-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="student@college.edu"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-neutral-500" />
              <input
                name="password"
                type="password"
                required
                className="block w-full rounded-lg border border-neutral-800 bg-neutral-900/50 pl-10 p-2.5 text-white placeholder-neutral-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Create a password"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
          >
            Create Account
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-neutral-950 px-2 text-neutral-500">Or sign up with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSocialLogin('google')}
            className="flex items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
             <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
          <button
            onClick={() => handleSocialLogin('github')}
            className="flex items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            <Github className="h-5 w-5" />
            GitHub
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-neutral-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-green-500 hover:text-green-400">
            Sign in
          </Link>
        </p>
      </div>

      {/* RIGHT SIDE: Image (Different image for Register) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-green-900/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-90" />
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop" // Tech network image
          alt="Abstract technology"
        />
        <div className="absolute bottom-12 left-12 right-12">
          <h2 className="text-4xl font-bold text-white mb-4">Be the Change.</h2>
          <p className="text-lg text-green-100/80 max-w-md">
            Sign up to track projects, join events, and collaborate on the future of green tech.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
