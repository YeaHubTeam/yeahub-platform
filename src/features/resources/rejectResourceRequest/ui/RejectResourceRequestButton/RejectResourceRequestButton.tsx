import { useTranslation } from 'react-i18next';

import { i18Namespace, ResourceRequests } from '@/shared/config';
import { useModal } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';

import { ResourceRequest } from '@/entities/resource';

import { useRejectResourceRequestMutation } from '../../api/rejectResourceRequestApi';
import { RejectResourceRequestModal } from '../../ui/RejectResourceRequestModal/RejectResourceRequestModal';

interface RejectResourceRequestButtonProps {
	resourceId: ResourceRequest['id'];
}

export const RejectResourceRequestButton = ({ resourceId }: RejectResourceRequestButtonProps) => {
	const { t } = useTranslation(i18Namespace.resources);
	const [rejectResourceRequest] = useRejectResourceRequestMutation();
	const { isOpen, onOpen, onClose } = useModal();

	const handleRejection = async () => {
		try {
			await rejectResourceRequest(resourceId).unwrap();
			onClose();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Button size="large" variant="destructive" style={{ width: '170px' }} onClick={onOpen}>
				{t(ResourceRequests.REJECT_BUTTON)}
			</Button>
			<RejectResourceRequestModal isOpen={isOpen} onClose={onClose} onOk={handleRejection} />
		</>
	);
};
