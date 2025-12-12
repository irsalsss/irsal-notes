import Link from 'next/link';
import styles from './articles-tab.module.scss';

export const ArticlesTabTypeDict = {
  PUBLISHED: 'published',
  DRAFTS: 'drafts',
} as const;

export type ArticlesTabType =
  (typeof ArticlesTabTypeDict)[keyof typeof ArticlesTabTypeDict];

interface ArticlesTabProps {
  activeTab: ArticlesTabType;
}

const ArticlesTab = ({ activeTab }: ArticlesTabProps) => {
  return (
    <div className={styles['tabs']}>
      <Link
        href="/articles"
        className={`${styles['tab']} ${
          activeTab === ArticlesTabTypeDict.PUBLISHED
            ? styles['tab--active']
            : ''
        }`}
      >
        Published
      </Link>
      <Link
        href="/articles/draft"
        className={`${styles['tab']} ${
          activeTab === ArticlesTabTypeDict.DRAFTS ? styles['tab--active'] : ''
        }`}
      >
        Drafts
      </Link>
    </div>
  );
};

export default ArticlesTab;
