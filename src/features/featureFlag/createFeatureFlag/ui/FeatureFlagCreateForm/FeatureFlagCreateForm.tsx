import { yupResolver } from '@hookform/resolvers/yup';
import { DefaultValues, FormProvider, useForm } from 'react-hook-form';

import { useFormPersist } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { FeatureFlagForm } from '@/entities/featureFlag';

import { featureFlagCreateSchema } from '../../lib/validation/featureFlagCreateSchema';
import { CreateFeatureFlagFormValues } from '../../model/types/featureFlagCreateTypes';
import { FeatureFlagCreateFormHeader } from '../FeatureFlagCreateFormHeader/FeatureFlagCreateFormHeader';

import styles from './FeatureFlagCreateForm.module.css';

const defaultValues: DefaultValues<CreateFeatureFlagFormValues> = {
	flag: '',
	description: '',
	roleIds: [],
	clientType: 'WEB',
	enabled: false,
};

export const FeatureFlagCreateForm = () => {
	const featureFlagMethods = useForm<CreateFeatureFlagFormValues>({
		resolver: yupResolver(featureFlagCreateSchema),
		mode: 'onTouched',
		defaultValues,
	});

	const {
		formState: { isDirty, isSubmitted, isSubmitting },
		reset,
		watch,
	} = featureFlagMethods;

	const { clearFormDraft } = useFormPersist<CreateFeatureFlagFormValues>({
		watch,
		reset,
		defaultValues,
	});

	return (
		<>
			<FormProvider {...featureFlagMethods}>
				<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
					<Flex componentType="main" direction="column" gap="24">
						<FeatureFlagCreateFormHeader onSuccess={clearFormDraft} />
						<Card className={styles.content}>
							<FeatureFlagForm />
						</Card>
					</Flex>
				</LeavingPageBlocker>
			</FormProvider>
		</>
	);
};
