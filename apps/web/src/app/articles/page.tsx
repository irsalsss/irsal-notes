'use client';

import { SharedButton } from '@repo/ui';
import HeaderWithAuth from '@/components/header-with-auth';
import styles from './articles-page.module.scss';

// Mock article data for UI-only display
const mockArticles = [
  {
    id: '1',
    title: 'Getting Started with React',
    content:
      'Learn the fundamentals of React and how to build modern web applications...',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Understanding TypeScript',
    content:
      'TypeScript brings type safety to JavaScript, making your code more maintainable...',
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    title: 'CSS Best Practices',
    content:
      'Explore modern CSS techniques and best practices for building beautiful UIs...',
    createdAt: '2024-01-05',
  },
];

const ArticlesPage = () => {
  const handleCreateArticle = () => {
    // Form will be implemented later
    console.log('Create article clicked');
  };

  return (
    <>
      <HeaderWithAuth />
      <div className={styles['container']}>
        <div className={styles['header']}>
          <h1 className={styles['title']}>Articles</h1>
          <SharedButton variant="primary" onClick={handleCreateArticle}>
            Create Article
          </SharedButton>
        </div>

        <div className={styles['article-list']}>
          {mockArticles.length === 0 ? (
            <div className={styles['empty-state']}>
              <p>No articles yet. Create your first article to get started.</p>
            </div>
          ) : (
            mockArticles.map((article) => (
              <article key={article.id} className={styles['article-item']}>
                <h2 className={styles['article-title']}>{article.title}</h2>
                <p className={styles['article-content']}>{article.content}</p>
                <time className={styles['article-date']}>
                  {article.createdAt}
                </time>
              </article>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ArticlesPage;
