export default function Performance() {
  const metrics = [
  { label: 'Doğruluk (Accuracy)', value: '%94.67' },
  { label: 'Macro F1-Score',      value: '%94.69' },
  { label: 'Macro Kesinlik',      value: '%94.70' },
  { label: 'Macro Duyarlılık',    value: '%94.72' },
];

  const classMetrics = [
    { name: 'SUV',             precision: 0.95, recall: 0.93, f1: 0.94, support: 158 },
    { name: 'VAN',             precision: 0.99, recall: 1.00, f1: 0.99, support: 162 },
    { name: 'STATION WAGON',   precision: 0.89, recall: 0.86, f1: 0.87, support: 173 },
    { name: 'MICRO',           precision: 1.00, recall: 0.96, f1: 0.98, support: 213 },
    { name: 'AÇIK TEKERLEKLİ', precision: 0.99, recall: 0.99, f1: 0.99, support: 157 },
    { name: 'SEDAN',           precision: 0.88, recall: 0.89, f1: 0.89, support: 188 },
    { name: 'HATCHBACK',       precision: 0.89, recall: 0.95, f1: 0.92, support: 171 },
    { name: 'PICK UP',         precision: 0.99, recall: 0.99, f1: 0.99, support: 185 },
  ];

  return (
    <>
      <div className="page-title">Performans</div>
      <p className="page-sub">Eğitim sonuçları ve değerlendirme metrikleri.</p>

      <div className="sec-title">Genel Metrikler</div>
      <div className="metric-row">
        {metrics.map(({ label, value }) => (
          <div key={label} className="metric-box">
            <div className="metric-val">{value}</div>
            <div className="metric-name">{label}</div>
          </div>
        ))}
      </div>

      <div className="sec-title">Sınıf Bazlı Metrikler</div>
      <div className="card" style={{ padding: '1rem 1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid var(--border)' }}>
              {['Sınıf', 'Kesinlik', 'Duyarlılık', 'F1', 'Destek'].map(h => (
                <th key={h} style={{ textAlign: h === 'Sınıf' ? 'left' : 'center', padding: '0.5rem 0.75rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '0.65rem' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {classMetrics.map((row, i) => (
              <tr key={row.name} style={{ borderBottom: i < classMetrics.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <td style={{ padding: '0.6rem 0.75rem', fontWeight: 600 }}>{row.name}</td>
                <td style={{ padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{row.precision.toFixed(2)}</td>
                <td style={{ padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{row.recall.toFixed(2)}</td>
                <td style={{ padding: '0.6rem 0.75rem', textAlign: 'center', fontWeight: 700, color: 'var(--accent)' }}>{row.f1.toFixed(2)}</td>
                <td style={{ padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{row.support}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sec-title">Eğitim Grafikleri</div>
      <img
        src="/assets/training_graphs.png"
        alt="Training & Validation Accuracy ve Loss"
        style={{ width: '100%', borderRadius: 12, border: '1.5px solid var(--border)', marginBottom: '1rem' }}
      />

      <div className="sec-title">Normalize Confusion Matrix</div>
      <img
        src="/assets/confusion_matrix.png"
        alt="Normalized Confusion Matrix"
        style={{ width: '100%', borderRadius: 12, border: '1.5px solid var(--border)', marginBottom: '1rem' }}
      />
    </>
  );
}