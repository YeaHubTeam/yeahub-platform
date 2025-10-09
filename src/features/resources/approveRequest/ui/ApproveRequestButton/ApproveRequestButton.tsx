import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { ResourceRequests } from '@/shared/config/i18n/i18nTranslations';
import { useModal } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';

import { useGetResourceRequestByIdQuery } from '@/entities/resource';

import { useApproveResourceRequestMutation } from '../../api/approveResourceRequestApi';
import { ApproveRequestModal } from '../ApproveRequestModal/ApproveRequestModal';

import styles from './ApproveRequestButton.module.css';

interface ApproveRequestButtonProps {
	resourceId: string;
}

export const ApproveRequestButton = ({ resourceId }: ApproveRequestButtonProps) => {
	const { t } = useTranslation(i18Namespace.resources);
	const { refetch } = useGetResourceRequestByIdQuery(resourceId);
	const [approveRequest] = useApproveResourceRequestMutation();

	const { isOpen, onOpen, onClose } = useModal();

	const handleApprove = async () => {
		onClose();

		try {
			await approveRequest(resourceId).unwrap();
			await refetch();
		} catch {
			return;
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
