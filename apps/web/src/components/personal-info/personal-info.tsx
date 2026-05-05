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
  const getInitials = (userName?: string) => {
    if (!userName) return 'U';
    return userName.trim().split(/\s+/).map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  const getFallbackAvatar = (userName?: string) => {
    const initials = getInitials(userName);
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23cbd5e1'/%3E%3Ctext x='50' y='50' dominant-baseline='central' text-anchor='middle' font-size='40' font-family='sans-serif' fill='%23475569'%3E${initials}%3C/text%3E%3C/svg%3E`;
  };

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
          src={profilePicture || getFallbackAvatar(name)}
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
