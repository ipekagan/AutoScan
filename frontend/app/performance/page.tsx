export default function Performance() {
  const metrics = [
    { label: 'F1-Score', value: '—' },
    { label: 'Doğruluk', value: '—' },
    { label: 'Kesinlik', value: '—' },
    { label: 'Duyarlılık', value: '—' },
  ];

  return (
    <>
      <div className="page-title">Performans</div>
      <p className="page-sub">Eğitim sonuçları ve değerlendirme metrikleri.</p>

      <div className="note">Model henüz eğitilmedi. Eğitim tamamlandıktan sonra metrikler ve grafikler buraya eklenecek.</div>

      <div className="sec-title">Metrikler</div>
      <div className="metric-row">
        {metrics.map(({ label, value }) => (
          <div key={label} className="metric-box">
            <div className="metric-val">{value}</div>
            <div className="metric-name">{label}</div>
          </div>
        ))}
      </div>

      <div className="sec-title">Kayıp Grafiği</div>
      <div className="placeholder-box">assets/loss.png buraya gelecek</div>

      <div className="sec-title">Doğruluk Grafiği</div>
      <div className="placeholder-box">assets/accuracy.png buraya gelecek</div>

      <div className="sec-title">Normalize Confusion Matrix</div>
      <div className="placeholder-box">assets/confusion_matrix.png buraya gelecek</div>
    </>
  );
}
