import Image from 'next/image';
import styles from './personal-info.module.scss';

interface PersonalInfoProps {
  name?: string;
  jobTitle?: string;
  profilePicture?: string;
  professionalJourney?: string;
}

const PersonalInfo = ({
  name,
  jobTitle,
  profilePicture,
  professionalJourney,
}: PersonalInfoProps) => {
  return (
    <section className={styles['section']}>
      <div className={styles['profile-picture-container']}>
        <Image
          src={profilePicture || '/profile.jpg'}
          alt={'profile-picture'}
          fill
          className={styles['profile-picture']}
          priority
        />
      </div>
      <div className={styles['text-container']}>
        <h1 className={styles['full-name']}>{name || '[Your Name]'}</h1>
        <p className={styles['job-title']}>{jobTitle || '[Your Job Title]'}</p>
      </div>
      <p className={styles['professional-journey']}>
        {professionalJourney || '[Your Professional Journey]'}
      </p>
    </section>
  );
};

export default PersonalInfo;
