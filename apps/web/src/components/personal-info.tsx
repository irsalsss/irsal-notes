import Image from 'next/image';
import styles from './personal-info.module.scss';

interface PersonalInfoProps {
  fullName: string;
  jobTitle: string;
  profilePicture: string;
  professionalJourney: string;
}

const PersonalInfo = ({
  fullName,
  jobTitle,
  profilePicture,
  professionalJourney,
}: PersonalInfoProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.profilePictureContainer}>
        <Image
          src={profilePicture}
          alt={fullName}
          fill
          className={styles.profilePicture}
          priority
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.fullName}>{fullName}</h1>
        <p className={styles.jobTitle}>{jobTitle}</p>
      </div>
      <p className={styles.professionalJourney}>{professionalJourney}</p>
    </section>
  );
};

export default PersonalInfo;
