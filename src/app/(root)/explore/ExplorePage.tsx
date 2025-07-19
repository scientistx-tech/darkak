import Link from 'next/link';
import React from 'react';

export default function ExplorePage() {
  return (
    <div>
      <Link href="/explore/watch" className="text-blue-500 hover:underline">
        Watch Page
      </Link>
    </div>
  );
}
