'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface UserProfileProps {
  username: string;
  email: string;
  avatarUrl?: string | null;
  onUpdate: (data: { username: string; email: string }) => Promise<void>;
}

export default function UserProfile({ username, email, avatarUrl, onUpdate }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username, email });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onUpdate(formData);
    setLoading(false);
    setIsEditing(false);
  };

  return (
    <motion.div
      className="max-w-md mx-auto bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl shadow-md p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
          {avatarUrl ? (
            <img src={avatarUrl} alt={username} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-4xl font-semibold text-white">
              {username.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        {!isEditing ? (
          <>
            <h2 className="text-2xl font-light text-gray-100">{username}</h2>
            <p className="text-sm text-gray-400">{email}</p>
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </>
        ) : (
          <motion.form
            className="w-full flex flex-col gap-4"
            onSubmit={e => {
              e.preventDefault();
              handleSubmit();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-md px-3 py-2 outline-none"
              placeholder="Username"
              required
              minLength={3}
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-md px-3 py-2 outline-none"
              placeholder="Email"
              required
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setIsEditing(false)} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
}
