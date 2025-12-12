'use client';

import InputEditor from '../input-editor';
import { SharedInputEditorProps } from './types';
import styles from './shared-input-editor.module.scss';
import cx from 'clsx';

const SharedInputEditor = ({
  label,
  error,
  className,
  ...editorProps
}: SharedInputEditorProps) => {
  return (
    <div className={cx(styles['container'], className)}>
      <label className={styles['label']}>{label}</label>
      <InputEditor
        {...editorProps}
        error={error}
        containerClassName={styles['editor-container']}
      />
    </div>
  );
};

export default SharedInputEditor;
