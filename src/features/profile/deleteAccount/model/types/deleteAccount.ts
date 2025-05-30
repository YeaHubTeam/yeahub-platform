import { ModalProps } from '@/shared/ui/Modal';

export interface DeleteAccountParams {
	userId: string;
	isAdmin?: boolean;
}

export type UserDeleteAccountModalProps = Pick<ModalProps, 'isOpen' | 'onClose'>;
