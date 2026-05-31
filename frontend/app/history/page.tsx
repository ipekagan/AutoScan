'use client';
import { useState, useEffect } from 'react';

type HistoryItem = { prediction: string; confidence: string; time: string };

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('autoscan_history') ?? '[]');
      setHistory(stored);
    } catch {}
  }, []);

  const handleClear = () => {
    localStorage.removeItem('autoscan_history');
    setHistory([]);
  };

  return (
    <>
      <div className="page-title">Geçmiş</div>
      <p className="page-sub">Bu oturumda yapılan tahminler.</p>

      {history.length === 0 ? (
        <div className="empty">
          <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>—</div>
          Henüz tahmin yapılmadı.
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button className="btn-secondary" onClick={handleClear}>Geçmişi Temizle</button>
          </div>
          {history.slice().reverse().map((item, i) => (
            <div key={i} className="history-item">
              <div className="history-class">{item.prediction}</div>
              <div>
                <div className="history-conf">{item.confidence}</div>
                <div className="history-time">{item.time}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}