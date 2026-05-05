'use client';

import HeaderWithAuth from '@/components/header-with-auth';
import styles from './create-article.module.scss';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import {
  SharedInput,
  SharedButton,
  SharedInputEditor,
  showSuccess,
} from '@repo/ui';
import { useRouter } from 'next/navigation';
import { useArticleControllerCreate } from '@/features/api/articles/articles';
import { CreateArticleDto } from '@/features/api/model';

const CreateArticlePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateArticleDto>({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const [isPublished, setIsPublished] = useState(true);

  const { mutate: createArticle } = useArticleControllerCreate({
    mutation: {
      onSuccess: () => {
        showSuccess(
          isPublished
            ? 'Article published successfully!'
            : 'Draft saved successfully!'
        );
        router.push(isPublished ? '/articles' : '/articles/draft');
      },
    },
  });

  const onSubmit = async (data: CreateArticleDto) => {
    setIsPublished(true);
    const payload = {
      ...data,
      published: true,
    };
    createArticle({ data: payload });
  };

  return (
    <>
      <HeaderWithAuth />
      <div className={styles['container']}>
        <div className={styles['header']}>
          <h1 className={styles['title']}>Create Article</h1>
          <p className={styles['subtitle']}>
            Share your thoughts with the world
          </p>
        </div>

        <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
          <SharedInput
            id="title"
            label="Title"
            placeholder="Enter article title"
            register={register('title', { required: 'Title is required' })}
            error={errors.title?.message}
          />

          <Controller
            name="content"
            control={control}
            rules={{ required: 'Content is required' }}
            render={({ field: { onChange, value } }) => (
              <SharedInputEditor
                label="Content"
                defaultValue={value}
                onEditorChange={onChange}
                error={errors.content?.message}
              />
            )}
          />

          <div className={styles['actions']}>
            <Link href="/articles">
              <SharedButton
                type="button"
                variant="ghost"
                disabled={isSubmitting}
              >
                Cancel
              </SharedButton>
            </Link>
            <SharedButton
              type="button"
              variant="secondary"
              disabled={isSubmitting}
              onClick={handleSubmit((data) => {
                setIsPublished(false);
                createArticle({ data: { ...data, published: false } });
              })}
            >
              Save as Draft
            </SharedButton>
            <SharedButton
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              onClick={() => setIsPublished(true)}
            >
              {isSubmitting && isPublished ? 'Publishing...' : 'Publish Article'}
            </SharedButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateArticlePage;
