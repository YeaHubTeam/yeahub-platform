import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { TextHtml } from '@/shared/ui/TextHtml';

import { User as UserType } from '@/entities/user';

import { DeleteAccountModal } from '../DeleteAccountModal/DeleteAccountModal';

import styles from './DeleteUserAccount.module.css';

interface DeleteUserAccountProps {
	user: UserType;
}

export const DeleteUserAccount = ({ user }: DeleteUserAccountProps) => {
	const { t } = useTranslation(i18Namespace.user);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	return (
		<Card className={styles.card} withOutsideShadow>
			<Text variant="body5-strong" className={styles.title}>
				{t(User.DELETE_TITLE)}
			</Text>
			<TextHtml html={t(User.DELETE_DESCRIPTION_MAIN_ADMIN)} className={styles.warning} />
			<Button
				variant="destructive"
				size="large"
				onClick={() => setIsModalOpen(true)}
				className={styles.button}
			>
				{t(User.DELETE_BUTTON)}
			</Button>

			<DeleteAccountModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				profile={user}
				warningMessage={t(User.DELETE_DESCRIPTION_MODAL_ADMIN)}
				confirmationLabel={t(User.DELETE_LABEL_ADMIN)}
				confirmationPlaceholder={t(User.DELETE_PLACEHOLDER_ADMIN)}
				isAdmin
			/>
		</Card>
	);
};
