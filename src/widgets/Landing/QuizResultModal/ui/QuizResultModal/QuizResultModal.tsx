import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Modal, RequiredModalProps } from '@/shared/ui/Modal';

import { CallToActionBlock } from '../CallToActionBlock/CallToActionBlock';
import { ProgressBlock } from '../ProgressBlock/ProgressBlock';

import styles from './QuizResultModal.module.css';

export const QuizResultModal = ({ isOpen, onClose }: RequiredModalProps) => {
	const { isMobile } = useScreenSize();

	return (
		<Modal isOpen={isOpen} onClose={onClose} className={styles.modal}>
			<Flex gap="20" direction={isMobile ? 'column' : 'row'}>
				<CallToActionBlock />
				<ProgressBlock />
			</Flex>
		</Modal>
	);
};
