import { Header } from '@/components/header';
import { ArticleList } from '@/components/article-list';
import { PersonalInfo } from '@/components/personal-info';
import { HydrateClient } from '@/lib/hydrate-client';
import { prefetchQuery, getDehydratedState } from '@/lib/prefetch-query';
import {
  articleControllerFindAll,
  getArticleControllerFindAllQueryKey,
} from '@/features/api/articles/articles';

export default async function Home() {
  const queryClient = await prefetchQuery(
    getArticleControllerFindAllQueryKey(),
    () => articleControllerFindAll()
  );

  const dehydratedState = getDehydratedState(queryClient);

  // TODO: Replace these with your actual information
  const personalInfo = {
    fullName: 'Your Full Name',
    jobTitle: 'Your Current Job Title',
    profilePicture: '/profile.jpg', // Place your profile picture in the public folder
    professionalJourney:
      'A brief description of your professional journey, experiences, and what you do. This is where you can share your story, passions, and what drives you in your career.',
  };

  return (
    <HydrateClient state={dehydratedState}>
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '0 1.5rem 4rem',
        }}
      >
        <Header />
        <main>
          <PersonalInfo {...personalInfo} />
          <ArticleList />
        </main>
      </div>
    </HydrateClient>
  );
}
