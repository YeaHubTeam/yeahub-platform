import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace, Resources } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ResourceForm, ResourceRequestStatusChip } from '@/entities/resource';

import type { EditResourceRequestFormValues } from '../../model/types/resourceRequestEditTypes';

import styles from './ResourceRequestFormWithHeader.module.css';

interface ResourceRequestFormWithHeaderProps {
	onSubmit: (formData: EditResourceRequestFormValues) => void;
}

export const ResourceRequestFormWithHeader = ({ onSubmit }: ResourceRequestFormWithHeaderProps) => {
	const {
		watch,
		handleSubmit,
		formState: { isDirty },
	} = useFormContext<EditResourceRequestFormValues>();

	const status = watch('status');

	const { t } = useTranslation([i18Namespace.marketplace, i18Namespace.resources]);

	return (
		<Flex componentType="main" gap="24" className={styles.wrapper}>
			<Flex align="center" className={styles.buttons}>
				<Button
					disabled={!isDirty}
					className={styles['submit-button']}
					onClick={handleSubmit(onSubmit)}
					type="submit"
				>
					{t(Resources.ADD_RESOURCE_SUBMIT)}
				</Button>
			</Flex>
			<Card className={styles.content}>
				<Flex direction="column" gap="28">
					<Flex justify="between">
						<Text variant="body5-strong" color="black-900">
							{t(Marketplace.EDIT_RESOURCE_TITLE)}
						</Text>
						<ResourceRequestStatusChip status={status} />
					</Flex>
					<ResourceForm />
				</Flex>
			</Card>
		</Flex>
	);
};
