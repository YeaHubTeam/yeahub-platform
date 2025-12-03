import { useTranslation } from 'react-i18next';

import { i18Namespace, Profile } from '@/shared/config';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

import styles from './SwitchSpecializationInfoModal.module.css';

interface SwitchSpecializationProps {
	buttonOutlineClick: () => void;
	isOpen: boolean;
	onClose: () => void;
}

export const SwitchSpecializationInfoModal = ({
	buttonOutlineClick,
	isOpen,
	onClose,
}: SwitchSpecializationProps) => {
	const { t } = useTranslation(i18Namespace.profile);
	const content = t(Profile.MANAGE_PROFILES_MODAL_HOW_SWITCH_SPECIALIZATION_CONTENT, {
		returnObjects: true,
	}) as string[];

	return (
		<>
			<Modal
				className={styles.modal}
				buttonOutlineClick={buttonOutlineClick}
				isOpen={isOpen}
				onClose={onClose}
			>
				<Text variant="body5-accent" className={styles.label} color="purple-700">
					{t(Profile.MANAGE_PROFILES_MODAL_HOW_SWITCH_SPECIALIZATION_TITLE)}
				</Text>
				<ol className={styles.list}>
					{content.map((item, index) => (
						<li key={index} className={styles['list-item']}>
							<Text variant="body3-accent" className={styles.text}>
								{item}
							</Text>
						</li>
					))}
				</ol>
				<Text variant="body3-accent" className={styles.description} color="purple-700">
					{t(Profile.MANAGE_PROFILES_MODAL_HOW_SWITCH_SPECIALIZATION_DESCRIPTION)}
				</Text>
			</Modal>
		</>
	);
};
