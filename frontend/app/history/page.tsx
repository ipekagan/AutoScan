'use client';
import { useState } from 'react';

type HistoryItem = { prediction: string; confidence: string; time: string };

// Geçici global store — sonra context ile değiştirilebilir
declare global { interface Window { __history?: HistoryItem[] } }

export default function History() {
  const [history] = useState<HistoryItem[]>(
    typeof window !== 'undefined' ? (window.__history ?? []) : []
  );

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
        history.slice().reverse().map((item, i) => (
          <div key={i} className="history-item">
            <div className="history-class">{item.prediction}</div>
            <div>
              <div className="history-conf">{item.confidence}</div>
              <div className="history-time">{item.time}</div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
