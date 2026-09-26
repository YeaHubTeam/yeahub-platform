import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { FeatureFlagForm } from '@/entities/featureFlag';

import { featureFlagCreateSchema } from '../../lib/validation/featureFlagCreateSchema';
import { CreateFeatureFlagFormValues } from '../../model/types/featureFlagCreateTypes';
import { FeatureFlagCreateFormHeader } from '../FeatureFlagCreateFormHeader/FeatureFlagCreateFormHeader';

import styles from './FeatureFlagCreateForm.module.css';

export const FeatureFlagCreateForm = () => {
	const featureFlagMethods = useForm<CreateFeatureFlagFormValues>({
		resolver: yupResolver(featureFlagCreateSchema),
		mode: 'onTouched',
		defaultValues: {
			flag: '',
			description: '',
			roleIds: [],
			clientType: 'WEB',
			enabled: false,
		},
	});

	const { isDirty, isSubmitting, isSubmitted } = featureFlagMethods.formState;

	return (
		<>
			<FormProvider {...featureFlagMethods}>
				<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
					<Flex componentType="main" direction="column" gap="24">
						<FeatureFlagCreateFormHeader />
						<Card className={styles.content}>
							<FeatureFlagForm />
						</Card>
					</Flex>
				</LeavingPageBlocker>
			</FormProvider>
		</>
	);
};
