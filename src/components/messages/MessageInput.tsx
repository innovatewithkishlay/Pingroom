'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface MessageInputProps {
  onSend: (message: string) => Promise<void> | void;
  loading?: boolean;
}

export default function MessageInput({ onSend, loading }: MessageInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (!value.trim() || loading) return;
    await onSend(value.trim());
    setValue('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.form
      className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg shadow mt-2"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22, duration: 0.3 }}
      onSubmit={e => {
        e.preventDefault();
        handleSend();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        className="flex-1 bg-transparent outline-none text-sm text-gray-100 placeholder-gray-400 px-2 py-1"
        placeholder="Type your message..."
        value={value}
        disabled={loading}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        maxLength={500}
      />
      <Button
        type="submit"
        size="sm"
        disabled={!value.trim() || loading}
        className="rounded-full px-4 text-xs font-medium"
      >
        Send
      </Button>
    </motion.form>
  );
}
