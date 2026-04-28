import HeaderWithAuth from '@/components/header-with-auth';
import PersonalInfo from '@/components/personal-info/personal-info';
import HydrateClient from '@/lib/hydrate-client';
import { getDehydratedState } from '@/lib/prefetch-query';
import {
  authControllerGetProfile,
  getAuthControllerGetProfileQueryKey,
} from '@/features/api/auth/auth';
import styles from './page.module.scss';
import { getQueryClient } from '@/lib/get-query-client';
import { getCookieHeader } from '@/lib/cookies';

const Home = async () => {
  const queryClient = getQueryClient();
  const cookieHeader = await getCookieHeader();
  console.log('Server-side Cookie Header:', cookieHeader);

  const userProfile = await queryClient.fetchQuery({
    queryKey: getAuthControllerGetProfileQueryKey(),
    queryFn: () =>
      authControllerGetProfile({
        headers: { Cookie: cookieHeader },
      }),
    staleTime: 60 * 1000,
  });

  const dehydratedState = getDehydratedState(queryClient);

  return (
    <HydrateClient state={dehydratedState}>
      <HeaderWithAuth />
      <div className={styles['container']}>
        <main>
          <PersonalInfo
            name={userProfile.data.name}
            jobTitle={userProfile.data.jobTitle}
            email={userProfile.data.email}
            profilePicture={userProfile.data.profilePicture}
            professionalJourney={userProfile.data.aboutMe}
          />
        </main>
      </div>
    </HydrateClient>
  );
};

export default Home;
