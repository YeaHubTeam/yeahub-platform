import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { CollectionForm } from '@/entities/collection';
import { SkillForm } from '@/entities/skill';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { CreateCollectionFormValues } from '@/features/collection';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { collectionCreateSchema } from '@/features/collection';

import { skillCreateSchema } from '../../model/lib/validation/skillCreateSchema';
import { CreateSkillFormValues } from '../../model/types/skillCreateTypes';
import { SkillCreateFormHeader } from '../SkillCreateFormHeader/SkillCreateFormHeader';

import styles from './SkillCreateForm.module.css';

export const SkillCreateForm = () => {
	const skillMethods = useForm<CreateSkillFormValues>({
		resolver: yupResolver(skillCreateSchema),
		mode: 'onTouched',
	});

	const collectionMethods = useForm<CreateCollectionFormValues>({
		resolver: yupResolver(collectionCreateSchema),
		mode: 'onTouched',
	});

	const { isDirty, isSubmitting, isSubmitted } = skillMethods.formState;

	return (
		<>
			<FormProvider {...skillMethods}>
				<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
					<Flex componentType="main" direction="column" gap="24">
						<SkillCreateFormHeader />
						<Card className={styles.content}>
							<SkillForm />
						</Card>
					</Flex>
				</LeavingPageBlocker>
			</FormProvider>
			<FormProvider {...collectionMethods}>
				<Card className={styles.content}>
					<CollectionForm />
				</Card>
			</FormProvider>
		</>
	);
};
