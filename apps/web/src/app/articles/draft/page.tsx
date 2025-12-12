import HeaderWithAuth from '@/components/header-with-auth';
import {
  articleControllerFindDrafts,
  getArticleControllerFindDraftsQueryKey,
} from '@/features/api/articles/articles';
import { getDehydratedState } from '@/lib/prefetch-query';
import { getQueryClient } from '@/lib/get-query-client';
import HydrateClient from '@/lib/hydrate-client';
import { setHeadersWithCookie } from '@/lib/cookies';
import ArticlesPanel from '../articles-panel';

const ArticlesDraftPage = async () => {
  const queryClient = getQueryClient();
  const requestOptions = await setHeadersWithCookie();

  const response = await queryClient.fetchQuery({
    queryKey: getArticleControllerFindDraftsQueryKey(),
    queryFn: () => articleControllerFindDrafts(requestOptions),
    staleTime: 60 * 1000,
  });

  const draftsData = response.data;

  const dehydratedState = getDehydratedState(queryClient);

  return (
    <HydrateClient state={dehydratedState}>
      <HeaderWithAuth />
      <ArticlesPanel articles={draftsData} activeTab={'drafts'} />
    </HydrateClient>
  );
};

export default ArticlesDraftPage;
