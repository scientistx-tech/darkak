import Link from 'next/link';
import React from 'react';

export default function ExplorePage() {
  return (
    <div className="w-full">
      <div>
        <p>WATCHES</p>
        <Link href="/explore/watch" className="text-blue-500 hover:underline">
          Explore Now
        </Link>
      </div>

      <div>
        <p>PURSE</p>
        <Link href="" className="text-blue-500 hover:underline">
          Explore Now
        </Link>
      </div>

      <div>
        <p>JEWELRY</p>
        <Link href="" className="text-blue-500 hover:underline">
          Explore Now
        </Link>
      </div>

      <div>
        <p>CURLER</p>
        <Link href="" className="text-blue-500 hover:underline">
          Explore Now
        </Link>
      </div>

      <div>
        <p>BAG PACKS</p>
        <Link href="" className="text-blue-500 hover:underline">
          Explore Now
        </Link>
      </div>
    </div>
  );
}
