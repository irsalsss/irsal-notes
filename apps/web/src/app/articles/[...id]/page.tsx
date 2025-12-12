import { notFound } from 'next/navigation';
import HeaderWithAuth from '@/components/header-with-auth';
import { articleControllerFindOne } from '@/features/api/articles/articles';
import { setHeadersWithCookie } from '@/lib/cookies';
import { Article } from '@/features/api/model';
import ArticlesDetailPanel from './articles-detail-panel';

interface ArticleDetailPageProps {
  params: Promise<{
    id: string[];
  }>;
}

const fetchArticle = async (articleId: string): Promise<Article | null> => {
  const requestOptions = await setHeadersWithCookie();

  try {
    const response = await articleControllerFindOne(articleId, requestOptions);
    return response.data;
  } catch {
    return null;
  }
};

const ArticleDetailPage = async ({ params }: ArticleDetailPageProps) => {
  const { id } = await params;
  const articleId = id[0];

  if (!articleId) {
    notFound();
  }

  const article = await fetchArticle(articleId);

  if (!article) {
    notFound();
  }

  return (
    <>
      <HeaderWithAuth />
      <ArticlesDetailPanel article={article} />
    </>
  );
};

export default ArticleDetailPage;
