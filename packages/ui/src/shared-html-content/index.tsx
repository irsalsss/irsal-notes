import cx from 'clsx';
import styles from './shared-html-content.module.scss';

interface SharedHtmlContentProps {
  content?: string | object | null;
  className?: string;
}

const SharedHtmlContent = ({ content, className }: SharedHtmlContentProps) => {
  if (!content) {
    return null;
  }

  const htmlContent =
    typeof content === 'string' ? content : JSON.stringify(content);

  return (
    <div
      className={cx(styles['container'], className)}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default SharedHtmlContent;
