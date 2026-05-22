import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';

import {
	CreateOrEditFeatureFlagFormValues,
	FeatureFlagApiItem,
	FeatureFlagForm,
} from '@/entities/featureFlag';
import { useGetUserRolesListQuery } from '@/entities/user/@x/featureFlag';

import { useEditFeatureFlagMutation } from '../../api/editFeatureFlagApi';
import { featureFlagEditSchema } from '../../lib/validation/featureFlagEditSchema';
import { FeatureFlagEditFormHeader } from '../FeatureFlagEditFormHeader/FeatureFlagEditFormHeader';

import styles from './FeatureFlagEditForm.module.css';

interface FeatureFlagEditFormProps {
	featureFlag: FeatureFlagApiItem;
}

export const FeatureFlagEditForm = ({ featureFlag }: FeatureFlagEditFormProps) => {
	const { description, enabled, flag, clientType, id, roles } = featureFlag;
	const { data: availableRoles = [] } = useGetUserRolesListQuery();

	const roleIds = useMemo(() => {
		if (!roles || !availableRoles.length) return [];
		return roles
			.map((roleName) => {
				const role = availableRoles.find((r) => r.name === roleName);
				return role?.id;
			})
			.filter((id) => id !== undefined) as number[];
	}, [roles, availableRoles]);

	const methods = useForm<CreateOrEditFeatureFlagFormValues>({
		resolver: yupResolver(featureFlagEditSchema),
		mode: 'onTouched',
		defaultValues: {
			flag,
			description,
			clientType,
			enabled,
			id,
			roleIds,
		},
	});

	useEffect(() => {
		if (roleIds.length) {
			methods.reset({
				...methods.watch(),
				roleIds,
			});
		}
	}, [methods, roleIds]);

	const { isDirty, isSubmitting, isSubmitted } = methods.formState;

	const [editTopicMutation] = useEditFeatureFlagMutation();

	const onEditTopic = async (data: CreateOrEditFeatureFlagFormValues) => {
		await editTopicMutation(data);
	};

	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<FeatureFlagEditFormHeader onSubmit={onEditTopic} />
					<Card className={styles.content}>
						<FeatureFlagForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
