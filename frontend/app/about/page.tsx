export default function About() {
  const classes = ['SUV','VAN','Station Wagon','Micro','Açık Tekerlekli','Sedan','Hatchback','Pick Up'];

  return (
    <>
      <div className="page-title">Hakkında</div>
      <p className="page-sub">Proje ve model bilgileri.</p>

      <div className="card">
        <div className="card-title">Proje</div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
          Kocaeli Üniversitesi Bilgisayar Mühendisliği Bölümü, Yazılım Laboratuvarı-II dersi kapsamında geliştirilmiştir. 8 farklı araç gövde tipini derin öğrenme ile sınıflandıran bir web uygulamasıdır. Kullanıcı bir araç görseli yükler, model gövde tipini saniyeler içinde tahmin eder.
        </p>
      </div>

      <div className="card">
        <div className="card-title">Model</div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
          EfficientNet-B0 mimarisi, ImageNet ağırlıkları ile transfer learning uygulanmıştır. İki aşamalı eğitim stratejisi kullanılmıştır: ilk aşamada base model dondurularak yeni sınıflandırma katmanları eğitilmiş, ikinci aşamada son 30 katman açılarak fine-tuning yapılmıştır. Toplam 40 epoch eğitim sonucunda validation accuracy %94.67'ye ulaşılmıştır. Model boyutu 27.8 MB olup 95 MB sınırının altındadır.
        </p>
        <div className="tag-row">
          {['TensorFlow / Keras','EfficientNet-B0','Transfer Learning','Fine-Tuning','224×224 px','27.8 MB'].map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Performans</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
          {[
            { label: 'Doğruluk', value: '%94.67' },
            { label: 'Macro F1', value: '%94.69' },
            { label: 'Kesinlik', value: '%94.70' },
            { label: 'Duyarlılık', value: '%94.72' },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: 'var(--bg)', borderRadius: 10, padding: '0.75rem 1rem' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)' }}>{value}</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Sınıflar</div>
        <div className="class-grid">
          {classes.map((c, i) => (
            <div key={c} className="class-item">
              <div className="class-num">{i + 1}</div>
              {c}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Veri Seti</div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
          Birden fazla açık kaynaktan derlenen özel veri seti kullanılmıştır. Her sınıftan 880 görsel olmak üzere toplamda 7.040 görsel ile eğitim yapılmıştır. Veri seti %80 eğitim, %20 doğrulama olarak ayrılmıştır. Farklı açılar, ışık koşulları ve arka planlar dahil edilerek modelin genelleme kapasitesi artırılmıştır.
        </p>
        <div className="tag-row">
          {['Stanford Cars Dataset','Wikimedia Commons','Kaggle','7.040 Görsel','8 Sınıf · 880 Görsel/Sınıf','%80 Train / %20 Val'].map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Eğitim Detayları</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.82rem' }}>
          {[
            ['Mimari', 'EfficientNet-B0'],
            ['Giriş Boyutu', '224 × 224 px'],
            ['Batch Size', '32'],
            ['Toplam Epoch', '40 (10 + 30)'],
            ['Optimizer', 'Adam'],
            ['İlk LR', '1e-3 → 1e-4'],
            ['Fine-Tuning LR', '1e-4 → 9e-6'],
            ['Fine-Tuning Katman', '30 / 238'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{k}</span>
              <span style={{ fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}