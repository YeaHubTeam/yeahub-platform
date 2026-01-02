import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Marketplace, Translation } from '@/shared/config';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { listAdminRoles, useProfileQuery } from '@/entities/auth';
import { ResourceForm } from '@/entities/resource';

import { useCreateResourceMutation } from '../../api/createResourceApi';
import { CreateResourceFormValues } from '../../model/types/resourceCreateTypes';

import styles from './ResourceCreateFormWithHeader.module.css';

export const ResourceCreateFormWithHeader = () => {
	const [createResourceMutation, { isLoading }] = useCreateResourceMutation();

	const { handleSubmit } = useFormContext<CreateResourceFormValues>();
	const { t } = useTranslation(i18Namespace.marketplace);

	const { data: profile } = useProfileQuery();
	const isAdminRole = profile?.userRoles?.some((role) =>
		listAdminRoles.find((i) => i == role.name),
	);

	const onCreateResource = async (data: CreateResourceFormValues) => {
		await createResourceMutation({ resource: data, isAdmin: isAdminRole }).unwrap();
	};

	return (
		<Flex componentType="main" gap="24" className={styles.wrapper}>
			<div className={styles.back}>
				<BackButton />
			</div>
			<Flex gap="20" align="center" className={styles.buttons}>
				<Button
					disabled={isLoading}
					className={styles['submit-button']}
					onClick={() => handleSubmit(onCreateResource)()}
					type="submit"
				>
					{t(Translation.SAVE, { ns: 'translation' })}
				</Button>
			</Flex>
			<Card className={styles.content}>
				<Flex direction="column" gap="28">
					<Text variant="body5-strong" color="black-900">
						{t(Marketplace.ADD_RESOURCE_TITLE)}
					</Text>
					<ResourceForm />
				</Flex>
			</Card>
		</Flex>
	);
};
