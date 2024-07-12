'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';

export const ScanModule: React.FC = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [scanning, setScanning] = useState(true); // State untuk mengontrol scanning

  useEffect(() => {
    if (orderId) {
      // Nonaktifkan QR Reader sebelum melakukan navigasi
      setScanning(false);
      router.push(`/scanner/${orderId}`);
    }
  }, [orderId, router]);

  const handleResult = (result, error) => {
    if (orderId) return;
    if (result) {
      setOrderId(result.getText());
    }
    if (error) {
      console.info(error);
    }
  };

  return (
    <div className="w-full h-screen bg-pink-400 overflow-hidden">
      {scanning && (
        <QrReader
          videoContainerStyle={{
            width: '100%',
            height: '100vh',
            backgroundColor: 'gray',
            paddingTop: 0,
          }}
          videoStyle={{
            width: '100%',
            height: '100%',
            backgroundColor: 'gray',
            objectFit: 'cover',
          }}
          constraints={{ facingMode: 'user', width: 1000, height: 1000 }}
          onResult={handleResult}
        />
      )}
    </div>
  );
};
