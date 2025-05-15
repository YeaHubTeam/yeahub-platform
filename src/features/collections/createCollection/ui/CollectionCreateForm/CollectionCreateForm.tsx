import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useIsFormNonEmpty } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { CollectionForm } from '@/entities/collection';

import { collectionCreateSchema } from '../../model/lib/validation/collectionCreateSchema';
import { CollectionCreateFormValues } from '../../model/types/collectionCreateTypes';
import CollectionCreateFormHeader from '../CollectionCreateFormHeader/CollectionCreateFormHeader';

import styles from './CollectionCreateForm.module.css';

export const CollectionCreateForm = () => {
	const methods = useForm<CollectionCreateFormValues>({
		resolver: yupResolver(collectionCreateSchema),
		mode: 'onTouched',
		defaultValues: {
			title: '',
			description: '',
			isFree: false,
		},
	});

	const { control, formState } = methods;
	const { isDirty, isSubmitted, isSubmitting } = formState;

	const isNonEmpty = useIsFormNonEmpty(control, ['title', 'description']);

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && isNonEmpty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<CollectionCreateFormHeader />
					<Card className={styles.content}>
						<CollectionForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
