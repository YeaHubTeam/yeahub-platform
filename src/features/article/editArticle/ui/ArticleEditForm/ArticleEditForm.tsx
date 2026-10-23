import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { Article, ArticleForm } from '@/entities/article';

import { articleEditSchema } from '../../lib/validation/articleEditSchema';
import { EditArticleFormValues } from '../../model/types/articleEditTypes';
import { ArticleEditFormHeader } from '../ArticleEditFormHeader/ArticleEditFormHeader';

interface ArticleEditFormProps {
	article: Article;
}

const formatToFormField = <T extends { id: number }[]>(arg?: T) => {
	return arg ? arg.map((el) => el.id) : [];
};

export const ArticleEditForm = ({ article }: ArticleEditFormProps) => {
	const { articleSkills, articleSpecializations, topics, ...formattedArticle } = article;

	const methods = useForm<EditArticleFormValues>({
		resolver: yupResolver(articleEditSchema),
		mode: 'onTouched',
		defaultValues: {
			...formattedArticle,
			topics: topics ?? [],
			skills: formatToFormField(articleSkills),
			specializations: formatToFormField(articleSpecializations),
		},
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<ArticleEditFormHeader />
					<Card>
						<ArticleForm isEdit />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
