import { useEffect } from 'react';
import Script from 'next/script';

export default function VideoCall() {
  useEffect(() => {
    function getUrlParams(url = window.location.href) {
      const urlStr = url.split('?')[1];
      return new URLSearchParams(urlStr);
    }

    const roomID =
      getUrlParams().get('roomID') || 'room_' + Math.floor(Math.random() * 1000);
    const userID = Math.floor(Math.random() * 10000) + '';
    const userName = 'userName' + userID;
    const appID = 807069115;
    const serverSecret = '3efa096fe65bea2e1ce1a718311df1dc';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: document.querySelector('#root'),
      sharedLinks: [
        {
          url:
            window.location.origin +
            window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCallGroupCall,
      },
    });
  }, []);

  return (
    <>
      <div id="root" style={{ width: '100vw', height: '100vh' }}></div>
      <Script
        src="https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js"
        strategy="afterInteractive"
      />
    </>
  );
}