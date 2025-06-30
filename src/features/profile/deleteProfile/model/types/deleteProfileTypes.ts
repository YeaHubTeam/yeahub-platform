import { ModalProps } from '@/shared/ui/Modal';

export type DeleteProfileModalProps = Pick<ModalProps, 'isOpen' | 'onClose'> & {
	profileId: string;
};
