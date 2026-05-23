export default function About() {
  const classes = ['SUV','VAN','Station Wagon','Micro','Açık Tekerlekli','Sedan','Hatchback','Pick Up'];

  return (
    <>
      <div className="page-title">Hakkında</div>
      <p className="page-sub">Proje ve model bilgileri.</p>

      <div className="card">
        <div className="card-title">Proje</div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
          Kocaeli Üniversitesi Bilgisayar Mühendisliği Bölümü, Yazılım Laboratuvarı-II dersi kapsamında geliştirilmiştir. 8 farklı araç gövde tipini derin öğrenme ile sınıflandırmaktadır.
        </p>
      </div>

      <div className="card">
        <div className="card-title">Model</div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
          EfficientNet-B0 mimarisi, ImageNet ağırlıkları ile transfer learning uygulanmıştır. Son katman 8 sınıfa göre yeniden yapılandırılmış, model boyutu 95 MB altında tutulmuştur.
        </p>
        <div className="tag-row">
          {['TensorFlow / Keras','EfficientNet-B0','Transfer Learning','224×224 px'].map(t => (
            <span key={t} className="tag">{t}</span>
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
          Kaggle ve çeşitli açık kaynaklardan derlenen özel veri seti. 8 sınıf arasında dengeli dağılım sağlanmış; farklı açı, ışık koşulları ve arka planlar dahil edilmiştir.
        </p>
        <div className="tag-row">
          {['Kaggle','Özel Derleme','8 Sınıf','Dengeli Dağılım'].map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </>
  );
}
