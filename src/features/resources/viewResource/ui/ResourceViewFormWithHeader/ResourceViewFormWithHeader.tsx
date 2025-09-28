import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ResourceDisabledForm } from '../ResourceDisabledForm/ResourceDisabledForm';

import styles from './ResourceViewFormWithHeader.module.css';

export const ResourceViewFormWithHeader = () => {
	const { t } = useTranslation(i18Namespace.marketplace);

	return (
		<Flex componentType="main" gap="24" className={styles.wrapper}>
			<div className={styles.back}>
				<BackButton />
			</div>
			<Flex gap="20" align="center" className={styles.buttons}>
				<Button
					disabled={true}
					className={styles['submit-button']}
					onClick={() => {}}
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
					<ResourceDisabledForm />
				</Flex>
			</Card>
		</Flex>
	);
};
