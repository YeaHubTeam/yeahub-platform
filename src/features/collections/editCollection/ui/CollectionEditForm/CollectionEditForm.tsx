import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { FormHeader } from '@/shared/ui/FormHeader';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { CollectionForm, Collection } from '@/entities/collection';

import { useEditCollectionMutation } from '../../api/editCollectionApi';
import { collectionEditSchema } from '../../lib/validation/collectionEditSchema';
import { CollectionEditFormValues } from '../../model/types/collectionEditTypes';

import styles from './CollectionEditForm.module.css';

interface CollectionEditFormProps {
	collection: Collection;
}

const formatToFormField = <T extends { id: number }[]>(arg?: T) => {
	return arg ? arg.map((el) => el.id) : [];
};

export const CollectionEditForm = ({ collection }: CollectionEditFormProps) => {
	const {
		questionsCount,
		company,
		createdAt,
		updatedAt,
		createdById,
		createdBy,
		...restCollection
	} = collection;

	const methods = useForm<CollectionEditFormValues>({
		resolver: yupResolver(collectionEditSchema),
		mode: 'onTouched',
		defaultValues: {
			...restCollection,
			questions: formatToFormField(collection.questions),
			specializations: formatToFormField(collection.specializations),
			companyId: company?.id ? String(company.id) : '',
			keywords: collection.keywords,
		},
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	const [editCollectionMutation, { isLoading }] = useEditCollectionMutation();

	const onEditCollection = async (data: CollectionEditFormValues) => {
		await editCollectionMutation(data);
	};

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<FormHeader<CollectionEditFormValues> onSubmit={onEditCollection} isLoading={isLoading} />
					<Card className={styles.content}>
						<CollectionForm isEdit questionsCount={questionsCount} />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
