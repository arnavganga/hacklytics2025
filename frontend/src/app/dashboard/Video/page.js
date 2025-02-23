'use client';

import VideoCall from '@/components/VideoCall';
import { X as XIcon } from 'lucide-react';

export default function VideoCallPage() {
    const handleExit = () => {
      console.log('Exiting video call');
    };

    return (
      <div className="relative w-full h-full">
        <button
          onClick={handleExit}
          className="absolute top-4 right-4 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-colors"
          aria-label="Exit video call"
        >
          <XIcon size={24} />
        </button>
        <VideoCall />
      </div>
    );
}
