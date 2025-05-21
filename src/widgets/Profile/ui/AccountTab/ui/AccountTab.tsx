import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

import { DeleteAccountModal } from '@/features/profile/deleteAccount';

import styles from './AccountTab.module.css';

export const AccountTab = () => {
	const { t } = useTranslation(i18Namespace.user);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	return (
		<>
			<Card>
				<Text variant="head3" isMainTitle className={styles.title}>
					{t(User.DELETE_TITLE)}
				</Text>
				<Text variant="body3" className={styles.description}>
					{t(User.DELETE_DESCRIPTION_MAIN)}
				</Text>
				<Button
					variant="destructive"
					size="large"
					className={styles.button}
					onClick={() => setIsModalOpen(true)}
				>
					{t(User.DELETE_BUTTON)}
				</Button>
			</Card>

			<DeleteAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</>
	);
};
