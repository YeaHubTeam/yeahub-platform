import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { CollectionForm } from '@/entities/collection';
import { Collection } from '@/entities/collection';

import { collectionEditSchema } from '@/features/collections/editCollection/model/lib/validation/collectionEditSchema';
import { CollectionEditFormValues } from '@/features/collections/editCollection/model/types/collectionEditTypes';
import { CollectionEditFormHeader } from '@/features/collections/editCollection/ui/CollectionEditFormHeader/CollectionEditFormHeader';

import styles from './CollectionEditForm.module.css';

interface CollectionEditFormProps {
	collection: Collection;
}
const formatToFormField = <T extends { id: number }[]>(arg?: T) => {
	return arg ? arg.map((el) => el.id) : [];
};

export const CollectionEditForm = ({ collection }: CollectionEditFormProps) => {
	const methods = useForm<CollectionEditFormValues>({
		resolver: yupResolver(collectionEditSchema),
		mode: 'onTouched',
		defaultValues: {
			...collection,
			questions: formatToFormField(collection.questions),
			specializations: formatToFormField(collection.specializations),
			keywordsCollection: collection.keywordsCollection,
		},
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<CollectionEditFormHeader />
					<Card className={styles.content}>
						<CollectionForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
