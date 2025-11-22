'use client';

import Link from 'next/link';
import { useArticleControllerFindAll } from '@/features/api/articles/articles';
import type { Article } from '@/features/api/model';

function getContentPreview(content: Article['content']): string {
  if (!content) return '';

  const textContent = JSON.stringify(content);
  return textContent.slice(0, 150) + (textContent.length > 150 ? '...' : '');
}

export function ArticleList() {
  const { data, isLoading, error } = useArticleControllerFindAll();

  if (isLoading) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 0',
          color: 'var(--muted)',
        }}
      >
        Loading articles...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 0',
          color: 'var(--muted)',
        }}
      >
        Failed to load articles
      </div>
    );
  }

  const articles = data?.data || [];

  if (articles.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 0',
          color: 'var(--muted)',
        }}
      >
        No articles yet. Check back soon.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {articles.map((article: Article) => {
        const preview = getContentPreview(article.content);

        return (
          <article key={article.id}>
            <Link href={`/articles/${article.id}`}>
              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  lineHeight: 1.3,
                }}
              >
                {article.title}
              </h2>
              {preview && (
                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--muted)',
                    lineHeight: 1.6,
                    marginBottom: '0.75rem',
                  }}
                >
                  {preview}
                </p>
              )}
            </Link>
          </article>
        );
      })}
    </div>
  );
}
