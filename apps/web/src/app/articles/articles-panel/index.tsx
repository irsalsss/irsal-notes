import { SharedHtmlContent } from '@repo/ui';
import { formatDate } from '@repo/utils';
import ArticlesTab, {
  ArticlesTabType,
  ArticlesTabTypeDict,
} from '../articles-tab';
import styles from './articles-panel.module.scss';
import Link from 'next/link';
import { Article } from '@/features/api/model';

interface ArticlesPanelProps {
  activeTab: ArticlesTabType;
  articles: Article[];
}

const ArticlesPanel = ({ articles, activeTab }: ArticlesPanelProps) => {
  const draftsError = false;

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h1 className={styles['title']}>Articles</h1>
        <Link href="/articles/create" className={styles['create-button']}>
          Create Article
        </Link>
      </div>

      <ArticlesTab activeTab={activeTab} />

      <div className={styles['article-list']}>
        {activeTab === ArticlesTabTypeDict.DRAFTS && draftsError ? (
          <div className={styles['empty-state']}>
            <p>Please sign in to view your drafts.</p>
          </div>
        ) : articles.length === 0 ? (
          <div className={styles['empty-state']}>
            <p>
              {activeTab === ArticlesTabTypeDict.PUBLISHED
                ? 'No published articles yet. Create your first article to get started.'
                : 'No drafts yet. Create your first draft to get started.'}
            </p>
          </div>
        ) : (
          articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className={styles['article-item']}
            >
              <h2 className={styles['article-title']}>{article.title}</h2>
              <div className={styles['article-content']}>
                <SharedHtmlContent content={article.content} />
              </div>
              <time className={styles['article-date']}>
                {formatDate(article.createdAt)}
              </time>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticlesPanel;
