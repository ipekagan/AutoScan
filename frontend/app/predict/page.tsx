'use client';
import { useState, useRef, useCallback } from 'react';

const CLASS_NAMES = ['SUV','VAN','STATION WAGON','MICRO','AÇIK TEKERLEKLİ','SEDAN','HATCHBACK','PICK UP'];
type State = 'upload' | 'preview' | 'scanning' | 'result';

export default function Predict() {
  const [state, setState] = useState<State>('upload');
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [predClass, setPredClass] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [probs, setProbs] = useState<Record<string, number> | null>(null);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      setImgSrc(e.target?.result as string);
      setImgFile(file);
      setState('preview');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDrag(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const saveToHistory = (prediction: string, conf: number) => {
    try {
      const existing = JSON.parse(localStorage.getItem('autoscan_history') ?? '[]');
      existing.push({
        prediction,
        confidence: `${(conf * 100).toFixed(1)}%`,
        time: new Date().toLocaleTimeString('tr-TR'),
      });
      localStorage.setItem('autoscan_history', JSON.stringify(existing));
    } catch {}
  };

  const handleClassify = async () => {
    if (!imgSrc || !imgFile) return;
    setState('scanning');
    setError(null);

    const startTime = Date.now();

    try {
      const formData = new FormData();
      formData.append('file', imgFile);

      const res = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Sunucu hatası');

      const data = await res.json();
      setPredClass(data.class);
      setConfidence(data.confidence);
      setProbs(data.probabilities);
      saveToHistory(data.class, data.confidence);
    } catch (e) {
      setError('Backend bağlantısı kurulamadı. Backend çalışıyor mu?');
      setPredClass(null);
      setConfidence(null);
      setProbs(null);
    }

    const elapsed = Date.now() - startTime;
    if (elapsed < 3000) {
      await new Promise(r => setTimeout(r, 3000 - elapsed));
    }

    setState('result');
  };

  const handleReset = () => {
    setState('upload'); setImgSrc(null); setImgFile(null);
    setPredClass(null); setConfidence(null); setProbs(null); setError(null);
  };

  return (
    <>
      <div className="page-title">Sınıflandır</div>
      {state !== 'result' && (
        <p className="page-sub">Bir araç görseli yükleyin ve türünü öğrenin.</p>
      )}

      {state === 'upload' && (
        <div
          className={`upload-area${drag ? ' drag-over' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={handleDrop}
        >
          <input ref={inputRef} type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
          <div className="upload-icon">↑</div>
          <p className="upload-text"><strong>Dosya seçin</strong> veya sürükleyip bırakın</p>
          <p className="upload-text" style={{ marginTop: 4, fontSize: '0.75rem' }}>JPG, PNG, WEBP</p>
        </div>
      )}

      {state === 'preview' && imgSrc && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '1.2rem 0' }}>
            <img src={imgSrc} alt="preview" style={{ maxHeight: 300, maxWidth: '100%', borderRadius: 14, boxShadow: '0 6px 24px rgba(0,0,0,0.08)' }} />
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button className="btn-secondary" onClick={handleReset}>Değiştir</button>
            <button className="btn-primary" style={{ maxWidth: 200 }} onClick={handleClassify}>Türünü Öğren</button>
          </div>
        </>
      )}

      {state === 'scanning' && imgSrc && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
          <div className="scan-box">
            <img src={imgSrc} alt="scanning" />
            <div className="scan-border">
              <div className="corner tl" /><div className="corner tr" />
              <div className="corner bl" /><div className="corner br" />
              <div className="scan-line" />
            </div>
          </div>
        </div>
      )}

      {state === 'result' && imgSrc && (
        <>
          <div className="result-grid">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <img src={imgSrc} alt="result" style={{ maxHeight: 320, maxWidth: '100%', borderRadius: 14, boxShadow: '0 6px 24px rgba(0,0,0,0.08)' }} />
            </div>
            <div>
              {error ? (
                <div className="result-card">
                  <div className="no-model">{error}</div>
                </div>
              ) : predClass ? (
                <>
                  <div className="result-card">
                    <div className="result-label">Tahmin</div>
                    <div className="result-value">{predClass}</div>
                    <div className="result-conf">Güven: {((confidence ?? 0) * 100).toFixed(1)}%</div>
                  </div>
                  {probs && (
                    <div className="bar-section">
                      {CLASS_NAMES.map((name) => (
                        <div key={name} className="bar-row">
                          <div className="bar-name">{name}</div>
                          <div className="bar-track">
                            <div className="bar-fill" style={{ width: `${Math.round((probs[name] ?? 0) * 100)}%` }} />
                          </div>
                          <div className="bar-pct">{Math.round((probs[name] ?? 0) * 100)}%</div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="result-card">
                  <div className="no-model">Model henüz yüklenmedi</div>
                  <div className="no-model-hint">Backend bağlantısı kurulunca tahmin burada görünecek.</div>
                </div>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button className="btn-secondary" onClick={handleReset}>Yeni Görsel Yükle</button>
          </div>
        </>
      )}
    </>
  );
}