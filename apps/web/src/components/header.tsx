import Link from 'next/link';

export function Header() {
  return (
    <header
      style={{
        padding: '2rem 0',
        borderBottom: '1px solid var(--border)',
        marginBottom: '4rem',
      }}
    >
      <nav
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 500 }}>
          Home
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/" style={{ fontSize: '0.9375rem' }}>
            Articles
          </Link>
          <Link href="/about" style={{ fontSize: '0.9375rem' }}>
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
