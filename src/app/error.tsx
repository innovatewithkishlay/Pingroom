'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-semibold text-red-500 mb-2">Something went wrong!</h2>
      <p className="text-gray-400 mb-4">{error.message || 'An unexpected error occurred.'}</p>
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
