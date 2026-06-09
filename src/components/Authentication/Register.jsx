import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Clapperboard, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

const strengthConfig = [
  { label: 'Too short',  color: 'bg-rose-500'   },
  { label: 'Weak',       color: 'bg-orange-500'  },
  { label: 'Fair',       color: 'bg-yellow-400'  },
  { label: 'Good',       color: 'bg-emerald-500' },
  { label: 'Strong',     color: 'bg-brand-500'   },
];

const calcStrength = (pw) => {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8)  s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};

function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setError('');
      setSuccess(true);
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  const strength = calcStrength(formData.password);
  const strengthInfo = formData.password ? strengthConfig[Math.min(strength, 4)] : null;

  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Clapperboard className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-black text-content-primary">Create account</h1>
          <p className="text-sm text-content-tertiary mt-1">Join THE BIG SHOW today</p>
        </div>

        <div className="card p-6 sm:p-5">
          {success ? (
            <motion.div
              className="text-center py-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h2 className="text-lg font-bold text-content-primary mb-1">Registration successful!</h2>
              <p className="text-sm text-content-tertiary mb-5">Your account has been created.</p>
              <Link to="/login" className="btn btn-primary btn-md">
                Sign In Now <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-sm font-medium text-content-secondary">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-tertiary" />
                  <input
                    type="text" id="name" value={formData.name} onChange={handleChange}
                    required placeholder="John Doe" className="input pl-10" autoComplete="name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-content-secondary">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-tertiary" />
                  <input
                    type="email" id="email" value={formData.email} onChange={handleChange}
                    required placeholder="you@example.com" className="input pl-10" autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-content-secondary">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-tertiary" />
                  <input
                    type={showPw ? 'text' : 'password'} id="password" value={formData.password}
                    onChange={handleChange} required placeholder="Min. 8 characters"
                    className="input pl-10 pr-10" autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-content-tertiary hover:text-content-secondary transition-colors"
                    aria-label="Toggle password visibility">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Strength bar */}
                {strengthInfo && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i < strength ? strengthInfo.color : 'bg-surface-border'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-2xs text-content-tertiary">{strengthInfo.label}</p>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div className="space-y-1.5">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-content-secondary">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-tertiary" />
                  <input
                    type={showConfirm ? 'text' : 'password'} id="confirmPassword"
                    value={formData.confirmPassword} onChange={handleChange}
                    required placeholder="Re-enter your password"
                    className={[
                      'input pl-10 pr-10',
                      formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? 'border-rose-500/50 focus:ring-rose-500'
                        : '',
                    ].join(' ')}
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-content-tertiary hover:text-content-secondary transition-colors"
                    aria-label="Toggle confirm password visibility">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-2xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Passwords do not match
                  </p>
                )}
              </div>

              <button type="submit" className="btn btn-primary btn-md w-full justify-center mt-2">
                Create Account <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {!success && (
            <>
              <div className="divider my-5">or</div>
              <p className="text-center text-sm text-content-tertiary">
                Already have an account?{' '}
                <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
