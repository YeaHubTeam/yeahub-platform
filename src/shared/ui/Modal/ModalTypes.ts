export type ModalVariant = 'default' | 'error';

export type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	buttonPrimaryText?: string;
	buttonOutlineText?: string;
	buttonPrimaryClick?: () => void;
	buttonOutlineClick?: () => void;
	buttonPrimaryDisabled?: boolean;
	buttonOutlineDisabled?: boolean;
	withCloseIcon?: boolean;
	dataTestId?: string;
	variant?: ModalVariant;
	title?: string;
	className?: string;
};

export type RequiredModalProps = Pick<ModalProps, 'isOpen' | 'onClose'>;
