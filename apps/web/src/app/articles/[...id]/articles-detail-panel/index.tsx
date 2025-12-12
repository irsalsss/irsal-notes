import Link from 'next/link';
import { SharedHtmlContent } from '@repo/ui';
import { formatDate } from '@repo/utils';
import { Article } from '@/features/api/model';
import styles from './articles-detail-panel.module.scss';

interface ArticlesDetailPanelProps {
  article: Article;
}

const ArticlesDetailPanel = ({ article }: ArticlesDetailPanelProps) => {
  return (
    <div className={styles['container']}>
      <Link href="/articles" className={styles['back-link']}>
        ← Back to Articles
      </Link>

      <article className={styles['article']}>
        <header className={styles['header']}>
          <h1 className={styles['title']}>{article.title}</h1>
          <time className={styles['date']}>
            {formatDate(article.createdAt)}
          </time>
        </header>

        <div className={styles['content']}>
          <SharedHtmlContent content={article.content} />
        </div>
      </article>
    </div>
  );
};

export default ArticlesDetailPanel;
