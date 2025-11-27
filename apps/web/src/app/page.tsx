import HeaderWithAuth from '@/components/header-with-auth';
import { ArticleList } from '@/components/article-list';
import PersonalInfo from '@/components/personal-info';
import HydrateClient from '@/lib/hydrate-client';
import { prefetchQuery, getDehydratedState } from '@/lib/prefetch-query';
import {
  articleControllerFindAll,
  getArticleControllerFindAllQueryKey,
} from '@/features/api/articles/articles';
import styles from './page.module.scss';

const Home = async () => {
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
      <HeaderWithAuth />
      <div className={styles['container']}>
        <main>
          <PersonalInfo {...personalInfo} />
          <ArticleList />
        </main>
      </div>
    </HydrateClient>
  );
};

export default Home;
