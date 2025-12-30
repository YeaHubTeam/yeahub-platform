import { useTranslation } from 'react-i18next';

import { i18Namespace, ResourceRequests } from '@/shared/config';
import { useModal } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';

import { useApproveResourceRequestMutation } from '../../api/approveResourceRequestApi';
import { ApproveRequestModal } from '../ApproveRequestModal/ApproveRequestModal';

import styles from './ApproveRequestButton.module.css';

interface ApproveRequestButtonProps {
	resourceId: string;
}

export const ApproveRequestButton = ({ resourceId }: ApproveRequestButtonProps) => {
	const { t } = useTranslation(i18Namespace.resources);
	const [approveRequest] = useApproveResourceRequestMutation();

	const { isOpen, onOpen, onClose } = useModal();

	const handleApprove = async () => {
		try {
			await approveRequest(resourceId).unwrap();
			onClose();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Button size="large" variant="primary" className={styles.button} onClick={onOpen}>
				{t(ResourceRequests.APPROVE_BUTTON)}
			</Button>
			<ApproveRequestModal isOpen={isOpen} onClose={onClose} onOk={handleApprove} />
		</>
	);
};
