import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';

import { useFormPersist } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { CollectionForm } from '@/entities/collection';

import { collectionCreateSchema } from '../../lib/validation/collectionCreateSchema';
import { CollectionCreateFormValues } from '../../model/types/collectionCreateTypes';
import CollectionCreateFormHeader from '../CollectionCreateFormHeader/CollectionCreateFormHeader';

import styles from './CollectionCreateForm.module.css';

const defaultValues = {
	title: '',
	description: '',
	isFree: false,
} satisfies DefaultValues<CollectionCreateFormValues>;

export const CollectionCreateForm = () => {
	const methods = useForm<CollectionCreateFormValues>({
		resolver: yupResolver(collectionCreateSchema),
		mode: 'onTouched',
		defaultValues,
	});

	const { clearFormDraft } = useFormPersist<CollectionCreateFormValues>({
		watch: methods.watch,
		reset: methods.reset,
		defaultValues,
	});

	const { isDirty, isSubmitting, isSubmitted } = methods.formState;
	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<CollectionCreateFormHeader onSuccess={clearFormDraft} />
					<Card className={styles.content}>
						<CollectionForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
