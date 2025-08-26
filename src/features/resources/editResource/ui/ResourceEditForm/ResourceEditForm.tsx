import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import { ResourceForm } from '@/entities/resource';

import { useGetResourceByIdQuery } from '../../api/editResourceApi';
import { toEditFormValues } from '../../model/lib/map/toEditFormValues';
import { resourceEditSchema } from '../../model/lib/validation/resourceEditSchema';
import type { ResourceEditFormValues } from '../../model/types/resourcesEditTypes';
import { ResourceEditFormHeader } from '../ResourceEditFormHeader/ResourceEditFormHeader';

import styles from './ResourceEditForm.module.css';

export const ResourceEditForm = () => {
	const { resourceId, id: idParam } = useParams<{ resourceId?: string; id?: string }>();
	const id = (resourceId ?? idParam ?? '').toString();

	const { data } = useGetResourceByIdQuery({ id }, { skip: !id });

	const methods = useForm<ResourceEditFormValues>({
		resolver: yupResolver(resourceEditSchema),
		mode: 'onTouched',
		defaultValues: {
			id,
			name: '',
			provider: '',
			description: '',
			iconBase64: '',
			url: '',
			accessCategory: 'free',
			isActive: true,
			skills: [] as number[],
			specializations: [] as number[],
			keywords: [] as string[],
		},
	});

	useEffect(() => {
		if (data) {
			methods.reset(toEditFormValues(data), {
				keepDirtyValues: true,
				keepTouched: true,
			});
		}
	}, [data, methods]);

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<ResourceEditFormHeader />
					<Card className={styles.content}>
						<ResourceForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
