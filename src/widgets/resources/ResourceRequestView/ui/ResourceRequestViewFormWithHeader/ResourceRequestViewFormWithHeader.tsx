import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { BackButton } from '@/shared/ui/BackButton';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ResourceForm, ResourceRequestStatusChip } from '@/entities/resource';

import { ApproveRequestButton } from '@/features/resources/approveRequest';

import styles from './ResourceRequestViewFormWithHeader.module.css';

export const ResourceRequestViewFormWithHeader = () => {
	const { t } = useTranslation(i18Namespace.resources);
	const { resourceId } = useParams<{ resourceId: string }>();

	const { watch, setValue } = useFormContext();

	const status = watch('status');

	const onSuccess = () => {
		setValue('status', 'approved');
	};

	return (
		<Flex componentType="main" gap="24" className={styles.wrapper}>
			<div className={styles.back}>
				<BackButton />
			</div>
			<Card className={styles.content}>
				<Flex direction="column" gap="28">
					<Flex justify="between">
						<Text variant="body5-strong" color="black-900">
							{t(Marketplace.REQUEST_TITLE)}
						</Text>
						<ResourceRequestStatusChip status={status} />
					</Flex>
					<ResourceForm readonly />
					{status === 'pending' && (
						<Flex gap="12" align="center" style={{ marginLeft: 'auto' }}>
							<ApproveRequestButton resourceId={resourceId || ''} onSuccess={onSuccess} />
						</Flex>
					)}
				</Flex>
			</Card>
		</Flex>
	);
};
