import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Resources } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { LeavingPageBlocker } from '@/shared/ui/LeavingPageBlocker';
import { Text } from '@/shared/ui/Text';

import { Resource, ResourceEditFormHeader, ResourceForm } from '@/entities/resource';
import { Skill } from '@/entities/skill';
import { Specialization } from '@/entities/specialization';

import { useEditResourceMutation } from '../../api/editResourceApi';
import { resourceEditSchema } from '../../lib/validation/resourceEditSchema';
import { EditResourceFormValues } from '../../model/types/resourcesEditTypes';

import styles from './ResourceEditForm.module.css';

interface ResourceEditFormProps {
	resource: Resource;
}

const formatToFormField = <T extends { id: number }[]>(arg?: T) => {
	return arg ? arg.map((el) => el.id) : [];
};

export const ResourceEditForm = ({ resource }: ResourceEditFormProps) => {
	const { t } = useTranslation([i18Namespace.resources]);

	const { skills, specializations, type, imageSrc, ...formattedResources } = resource;

	const methods = useForm<EditResourceFormValues>({
		resolver: yupResolver(resourceEditSchema),
		mode: 'onTouched',
		defaultValues: {
			...formattedResources,
			iconBase64: imageSrc,
			skills: formatToFormField<Skill[]>(skills),
			specializations: formatToFormField<Specialization[]>(specializations),
			type: type.code,
		},
	});

	const { isDirty, isSubmitted, isSubmitting } = methods.formState;

	const [editResourceMutation] = useEditResourceMutation();

	const onEditResource = async (data: EditResourceFormValues) => {
		editResourceMutation(data);
	};
	return (
		<FormProvider {...methods}>
			<LeavingPageBlocker isBlocked={isDirty && !isSubmitted && !isSubmitting}>
				<Flex componentType="main" direction="column" gap="24">
					<ResourceEditFormHeader onSubmit={onEditResource} />
					<Card className={styles.content}>
						<Text variant="body6" color="black-900" className={styles['main-title']}>
							{t(Resources.EDIT_RESOURCE_TITLE)}
						</Text>
						<ResourceForm />
					</Card>
				</Flex>
			</LeavingPageBlocker>
		</FormProvider>
	);
};
