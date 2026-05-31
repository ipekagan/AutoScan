'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './globals.css';

const NAV = [
  { label: 'Ana Sayfa',   href: '/' },
  { label: 'Sınıflandır', href: '/predict' },
  { label: 'Geçmiş',      href: '/history' },
  { label: 'Performans',  href: '/performance' },
  { label: 'Hakkında',    href: '/about' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="tr">
      <head><title>AutoScan</title></head>
      <body>
        <div className="layout">
          <aside className="sidebar">
            <div className="sidebar-logo">Auto<span>Scan</span></div>
            <nav className="sidebar-nav">
              {NAV.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link${pathname === href ? ' active' : ''}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="main">
            <div className={pathname === "/" || pathname === "/predict" ? "main-inner-full" : "main-inner"}>{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
