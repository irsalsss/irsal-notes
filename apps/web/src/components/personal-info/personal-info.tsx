import Image from 'next/image';
import styles from './personal-info.module.scss';

interface PersonalInfoProps {
  name?: string;
  jobTitle?: string;
  email?: string;
  profilePicture?: string;
  professionalJourney?: string;
}

const PersonalInfo = ({
  name,
  jobTitle,
  email,
  profilePicture,
  professionalJourney,
}: PersonalInfoProps) => {
  const renderProfessionalJourney = () => {
    if (professionalJourney) {
      return (
        <div className={styles['professional-journey-parsed']}>
          <div dangerouslySetInnerHTML={{ __html: professionalJourney }} />
        </div>
      );
    }
    return '[Your Professional Journey]';
  };

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
        <p className={styles['email']}>{email || '[Your Email]'}</p>
      </div>
      <div className={styles['professional-journey']}>
        {renderProfessionalJourney()}
      </div>
    </section>
  );
};

export default PersonalInfo;
