import { enUS, ru } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

import { Articles, i18Namespace } from '@/shared/config';
import { formatDate } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import type { PublicArticle } from '@/entities/article';

import { ARTICLE_CONTENT_TYPE_OPTIONS } from '../../model/constants/articleOptions';

import styles from './ArticlePreview.module.css';

interface ArticlePreviewProps {
	article: PublicArticle;
}

export const ArticlePreview = ({ article }: ArticlePreviewProps) => {
	const { title, excerpt, imageSrc, publishedAt, readingTimeMinutes, contentType } = article;

	const { t, i18n } = useTranslation(i18Namespace.article);

	const locale = (i18n.resolvedLanguage || i18n.language).startsWith('en') ? enUS : ru;
	const contentTypeOption = ARTICLE_CONTENT_TYPE_OPTIONS.find(
		(option) => option.value === contentType,
	);

	const metadata = [
		contentTypeOption ? t(contentTypeOption.labelKey) : undefined,
		typeof readingTimeMinutes === 'number'
			? t(Articles.READING_TIME, { count: readingTimeMinutes })
			: undefined,
	]
		.filter(Boolean)
		.join(' · ');

	return (
		<Card withOutsideShadow className={styles.content}>
			<div className={styles.wrapper}>
				<ImageWithWrapper
					key={imageSrc}
					src={imageSrc}
					alt={t(Articles.IMAGE_ALT, { title })}
					className={styles['image-wrapper']}
				/>

				<Flex direction="column" gap="16" className={styles['wrapper-content']}>
					{metadata && (
						<Text variant="body3" color="black-500">
							{metadata}
						</Text>
					)}

					<Flex direction="column" gap="8">
						<Text variant="body3-accent" maxRows={2}>
							{title}
						</Text>

						{excerpt && (
							<Text variant="body3" color="black-500" maxRows={2}>
								{excerpt}
							</Text>
						)}
					</Flex>

					{publishedAt && (
						<Text variant="body3" color="black-500">
							<time dateTime={publishedAt}>
								{formatDate(new Date(publishedAt), 'd MMMM', locale)}
							</time>
						</Text>
					)}
				</Flex>
			</div>
		</Card>
	);
};
