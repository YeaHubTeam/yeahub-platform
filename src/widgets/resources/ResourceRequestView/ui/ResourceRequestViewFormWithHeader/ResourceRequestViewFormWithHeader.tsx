import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace, ResourceRequests } from '@/shared/config/i18n/i18nTranslations';
import { useModal } from '@/shared/hooks';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ResourceForm, ResourceRequestStatusChip } from '@/entities/resource';

import {
	ApproveRequestModal,
	useApproveResourceRequestMutation,
} from '@/features/resources/approveRequest';

import styles from './ResourceRequestViewFormWithHeader.module.css';

export const ResourceRequestViewFormWithHeader = () => {
	const { resourceId } = useParams<{ resourceId: string }>();
	const { t } = useTranslation(i18Namespace.resources);
	const { watch, setValue } = useFormContext();

	const [approveRequest] = useApproveResourceRequestMutation();

	const status = watch('status');

	const { isOpen, onOpen, onClose } = useModal();

	const handleApprove = async () => {
		onClose();

		if (!resourceId) return;
		await approveRequest(resourceId).unwrap();
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
							<Button size="large" variant="primary" className={styles.button} onClick={onOpen}>
								{t(ResourceRequests.APPROVE_BUTTON)}
							</Button>
						</Flex>
					)}
				</Flex>
			</Card>

			<ApproveRequestModal isOpen={isOpen} onClose={onClose} onOk={handleApprove} />
		</Flex>
	);
};
