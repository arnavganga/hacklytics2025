'use client';
import { useEffect, useState } from 'react';

const VideoCall = () => {
  const [isZegoLoaded, setIsZegoLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load the ZEGOCLOUD script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js';
    script.async = true;
    script.onload = () => {
      console.log('ZEGOCLOUD script loaded');
      setIsZegoLoaded(true);  // Set state to true once script is loaded
    };
    script.onerror = (error) => {
      console.error('Error loading ZEGOCLOUD script:', error);
    };
    document.body.appendChild(script);

    // Clean up the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isZegoLoaded) {
      console.log('ZEGOCLOUD SDK loaded:', window.ZegoUIKitPrebuilt);  // Check if SDK is available

      const getUrlParams = (url = window.location.href) => {
        let urlStr = url.split('?')[1];
        return new URLSearchParams(urlStr);
      };

      // Generate a Kit Token by calling a method.
      const roomID = getUrlParams().get('roomID') || 'room_' + Math.floor(Math.random() * 1000);
      const userID = Math.floor(Math.random() * 10000) + '';
      const userName = 'userName' + userID;

      // Fetch appID and serverSecret from environment variables and ensure appID is a number
      const appID = parseInt(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID, 10); // Ensure appID is an integer
      const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRET;

      // Make sure appID and serverSecret are defined
      if (isNaN(appID) || !serverSecret) {
        console.error('AppID or ServerSecret is missing or invalid.');
        return;
      }

      // Generate Kit Token
      const kitToken = window.ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName
      );

      // Initialize ZEGOCLOUD SDK
      const zp = window.ZegoUIKitPrebuilt.create(kitToken);

      // Join the room
      zp.joinRoom({
        container: document.getElementById('root'), // Attach to a container div
        sharedLinks: [
          {
            url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: window.ZegoUIKitPrebuilt.OneONoneCallGroupCall,
        },
      });

      // Cleanup the resources when component unmounts
      return () => {
        zp.leaveRoom();
      };
    }
  }, [isZegoLoaded]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000' }}>
      <div id="root" style={{ width: '90%', height: '90%' }}></div>
    </div>
  );
};

export default VideoCall;