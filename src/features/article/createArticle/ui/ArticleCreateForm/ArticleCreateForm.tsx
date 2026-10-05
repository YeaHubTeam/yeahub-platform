import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { ArticleForm } from '@/entities/article';

import { articleCreateSchema } from '../../lib/validation/articleCreateSchema';
import { CreateArticleFormValues } from '../../model/types/articleCreateTypes';
import { ArticleCreateFormHeader } from '../ArticleCreateFormHeader/ArticleCreateFormHeader';

const defaultValues: CreateArticleFormValues = {
	title: '',
	bodyHtml: '',
	slug: '',
	topics: undefined,
	format: undefined,
	contentType: undefined,
	metaTitle: '',
	metaDescription: '',
	ogTitle: '',
	ogDescription: '',
	specializations: [],
	skills: [],
};

export const ArticleCreateForm = () => {
	const methods = useForm<CreateArticleFormValues>({
		defaultValues,
		resolver: yupResolver(articleCreateSchema),
		mode: 'onTouched',
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<ArticleCreateFormHeader />
					<Card>
						<ArticleForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
