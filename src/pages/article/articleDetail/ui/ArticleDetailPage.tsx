import { useParams } from 'react-router-dom';

import { formatDate } from '@/shared/libs';
import { AuthorInfo } from '@/shared/ui/AuthorInfo';
import { Card } from '@/shared/ui/Card';
import { Chip } from '@/shared/ui/Chip';
import { ErrorElement } from '@/shared/ui/ErrorElement';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { KeywordsList } from '@/shared/ui/KeywordsList';
import { Loader } from '@/shared/ui/Loader';
import { Text } from '@/shared/ui/Text';
import { TextHtml } from '@/shared/ui/TextHtml';

import { useGetArticleByIdQuery } from '@/entities/article';

import { getReadingTime } from '../lib/getReadingTime';

import styles from './ArticleDetailPage.module.css';

export const ArticleDetailPage = () => {
	const { articleId } = useParams<{ articleId: string }>();
	const {
		data: article,
		isLoading,
		isError,
	} = useGetArticleByIdQuery({ articleId: articleId! }, { skip: !articleId });

	if (isLoading) return <Loader />;
	if (isError || !article) return <ErrorElement />;
	const formattedCreateDate = article.createdAt
		? formatDate(new Date(article.createdAt), 'd MMMM yyyy')
		: '';
	const formattedupdatedDate = article.publishedAt
		? formatDate(new Date(article.publishedAt), 'd MMMM yyyy')
		: '';
	const readingTime = getReadingTime(article?.bodyHtml);
	return (
		<Flex align="start" gap="24" wrap="wrap">
			<Flex direction="column" gap="20" className={styles['content-column']}>
				<Flex direction="column" gap="20" maxWidth>
					<Card withOutsideShadow size="medium">
						<Flex direction="column" gap="16">
							<Text variant="head2" color="black-900">
								{article.title}
							</Text>
							<Text variant="body3">
								Разработка {formattedCreateDate} {readingTime}
							</Text>
							<ImageWithWrapper
								src={article.imageSrc}
								alt={article.title}
								className={styles['cover-image']}
							/>
							<Text variant="body3-accent">{article.excerpt}</Text>
						</Flex>
					</Card>
				</Flex>

				<Flex direction="column" gap="24" flex={1}>
					<Card withOutsideShadow size="medium">
						<Flex direction="column" gap="16">
							<TextHtml html={article.bodyHtml} className={styles['article-content']} />
						</Flex>
					</Card>
				</Flex>
			</Flex>
			<Flex gap="24" className={styles['right-panel']} direction="column">
				<Card withOutsideShadow size="medium">
					<Flex direction="column" gap="16">
						{article.articleSpecializations && article.articleSpecializations.length > 0 && (
							<Flex direction="column" gap="16">
								<Text variant="body3" color="black-500">
									Специализация:
								</Text>
								<Flex wrap="wrap" gap="16">
									{article.articleSpecializations.map((spec) => (
										<Chip key={spec.id} label={spec.title} />
									))}
								</Flex>
							</Flex>
						)}

						{article.contentType && (
							<Flex direction="column" gap="16">
								<Text variant="body3" color="black-500">
									Назначение:
								</Text>
								<Chip label={article.contentType} />
							</Flex>
						)}

						{article.format && (
							<Flex direction="column" gap="16">
								<Text variant="body3" color="black-500">
									Формат:
								</Text>
								<Chip label={article.format} />
							</Flex>
						)}

						{article.topics && article.topics.length > 0 && (
							<Flex direction="column" gap="16">
								<Text variant="body3" color="black-500">
									Темы:
								</Text>
								<Flex wrap="wrap" gap="16">
									{article.topics?.map((spec) => (
										<Chip key={spec} label={spec} />
									))}
								</Flex>
							</Flex>
						)}

						{article.createdAt && formattedCreateDate && (
							<Flex direction="column" gap="16">
								<Text variant="body3" color="black-500">
									Дата публикации:
								</Text>
								<Chip theme="outlined" label={formattedCreateDate} />
							</Flex>
						)}

						{article.publishedAt && formattedupdatedDate && (
							<Flex direction="column" gap="16">
								<Text variant="body3" color="black-500">
									Обновлено:
								</Text>
								<Chip theme="outlined" label={formattedupdatedDate} />
							</Flex>
						)}

						{article.keywords && article.keywords.length > 0 && (
							<Flex direction="column" gap="16">
								<Text variant="body3" color="black-500">
									Ключевые слова:
								</Text>
								<Flex wrap="wrap" gap="16">
									<KeywordsList keywords={article.keywords} path="/articles?keyword=" />
								</Flex>
							</Flex>
						)}

						{article.createdBy && <AuthorInfo createdBy={article.createdBy} />}
					</Flex>
				</Card>
			</Flex>
		</Flex>
	);
};
export default ArticleDetailPage;
