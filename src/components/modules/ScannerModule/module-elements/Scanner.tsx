import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';


const Scanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [qrScanner, setQrScanner] = useState<QrScanner | null>(null);
  

  useEffect(() => {
    if (typeof window !== 'undefined' && videoRef.current) {
      const scanner = new QrScanner(
        videoRef.current,
        (result: QrScanner.ScanResult) => {
          console.log(result.data)
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          calculateScanRegion: (video) => {
            const smallerDimension = Math.min(video.videoWidth, video.videoHeight);
            const scanRegionSize = Math.round(smallerDimension / 2);
            return {
              x: Math.round((video.videoWidth - scanRegionSize) / 2),
              y: Math.round((video.videoHeight - scanRegionSize) / 2),
              width: scanRegionSize,
              height: scanRegionSize,
            };
          },
        }
      );
      setQrScanner(scanner);
      scanner.start();

      return () => {
        scanner.destroy();
      };
    }
  }, []);

  return (
    <div className="w-full h-full">
      <video 
        ref={videoRef} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Scanner;