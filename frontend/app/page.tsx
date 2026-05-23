'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CLASSES = [
  { label: 'SUV',             img: '/suv.png' },
  { label: 'VAN',             img: '/van.png' },
  { label: 'Station Wagon',   img: '/station-wagon.png' },
  { label: 'Micro',           img: '/micro.png' },
  { label: 'Açık Tekerlekli', img: '/acik-tekerlekli.png' },
  { label: 'Sedan',           img: '/sedan.png' },
  { label: 'Hatchback',       img: '/hatchback.png' },
  { label: 'Pick Up',         img: '/pickup.png' },
];

export default function Home() {
  const router = useRouter();
  const [active, setActive] = useState(0);

  return (
    <div className="landing">
      <div className="landing-inner">
        <div className="landing-left">
          <div className="badge">Araç Gövde Tipi Sınıflandırıcı</div>
          <div className="landing-title">Auto<span>Scan</span></div>
          <p className="landing-sub">Bir araç görseli yükleyin, yapay zeka modelimiz gövde tipini saniyeler içinde tanımlasın.</p>
          <button className="btn-primary" style={{ maxWidth: 240 }} onClick={() => router.push('/predict')}>
            Sınıflandırmaya Başla
          </button>

          <div className="cls-wrap">
            {CLASSES.map((c, i) => (
              <span
                key={c.label}
                className={`cls-tag${active === i ? ' cls-tag-active' : ''}`}
                onMouseEnter={() => setActive(i)}
              >
                {c.label}
              </span>
            ))}
          </div>

          <div className="stats-row">
            {[['8','Sınıf'],['B0','EfficientNet'],['<95MB','Model Boyutu']].map(([n,l]) => (
              <div key={l}>
                <div className="stat-num">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="landing-right">
          <div className="landing-img-wrap">
            <img
              key={active}
              src={CLASSES[active].img}
              alt={CLASSES[active].label}
              className="landing-car-img"
            />
            <div className="landing-img-label">{CLASSES[active].label}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
