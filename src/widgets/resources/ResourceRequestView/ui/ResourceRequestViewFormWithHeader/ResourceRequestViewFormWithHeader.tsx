import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace, Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ResourceForm, ResourceRequestStatusChip } from '@/entities/resource';

import { ApproveRequestButton } from '@/features/resources/approveRequest';
import { RejectResourceRequestButton } from '@/features/resources/rejectResourceRequest';

import styles from './ResourceRequestViewFormWithHeader.module.css';

export const ResourceRequestViewFormWithHeader = () => {
	const { t } = useTranslation([i18Namespace.marketplace, i18Namespace.translation]);
	const { resourceId } = useParams<{ resourceId: string }>();
	const navigate = useNavigate();

	const { watch } = useFormContext();

	const handleClickNavigation = () => {
		navigate(route(ROUTES.admin.resources.requests.edit.page, resourceId || ''));
	};
	const status = watch('status');
	return (
		<Flex componentType="main" gap="24" className={styles.wrapper}>
			<Flex className={styles.back} justify="between">
				<BackButton />
				{status === 'pending' && (
					<Button size="large" className={styles['edit-button']} onClick={handleClickNavigation}>
						{t(Translation.EDIT, { ns: i18Namespace.translation })}
					</Button>
				)}
			</Flex>
			<Card className={styles.content}>
				<Flex direction="column" gap="28">
					<Flex justify="between">
						<Text variant="body5-strong" color="black-900">
							{t(Marketplace.EDIT_RESOURCE_TITLE, { ns: i18Namespace.marketplace })}
						</Text>
						<ResourceRequestStatusChip status={status} />
					</Flex>
					<ResourceForm readonly />
					{status === 'pending' && (
						<Flex gap="12" align="center" style={{ marginLeft: 'auto' }}>
							<RejectResourceRequestButton resourceId={resourceId ?? ''} />
							<ApproveRequestButton resourceId={resourceId || ''} />
						</Flex>
					)}
				</Flex>
			</Card>
		</Flex>
	);
};
