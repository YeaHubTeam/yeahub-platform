import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace, Resources } from '@/shared/config/i18n/i18nTranslations';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ResourceRequestStatusChip } from '@/entities/resource';

import { ResourceRequestDisableForm } from '../ResourceRequestDisabledForm/ResourceRequestDisabledForm';

import styles from './ResourceRequestViewFormWithHeader.module.css';

export const ResourceRequestViewFormWithHeader = () => {
	const { t } = useTranslation([i18Namespace.marketplace, i18Namespace.resources]);

	const { watch } = useFormContext();

	const status = watch('status');

	return (
		<Flex componentType="main" gap="24" className={styles.wrapper}>
			<div className={styles.back}>
				<BackButton />
			</div>
			<Flex align="center" className={styles.buttons}>
				<Button className={styles['submit-button']} onClick={() => {}} type="submit">
					{t(Resources.SUBMIT_FOR_MODERATION, { ns: i18Namespace.resources })}
				</Button>
			</Flex>
			<Card className={styles.content}>
				<Flex direction="column" gap="28">
					<Flex justify="between">
						<Text variant="body5-strong" color="black-900">
							{t(Marketplace.ADD_RESOURCE_TITLE)}
						</Text>
						<ResourceRequestStatusChip status={status} />
					</Flex>
					<ResourceRequestDisableForm />
				</Flex>
			</Card>
		</Flex>
	);
};
