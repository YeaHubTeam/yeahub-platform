import classNames from 'classnames';
import { useRef } from 'react';
import ReactDOM from 'react-dom';
import { Icon } from 'yeahub-ui-kit';

import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

import styles from './styles.module.css';

type ModalProps = {
	title: string;
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	buttonPrimaryText?: string;
	buttonOutlineText?: string;
	buttonPrimaryClick?: () => void;
	buttonOutlineClick?: () => void;
};

export const Modal = ({
	title,
	isOpen,
	onClose,
	buttonPrimaryText,
	buttonOutlineText,
	buttonPrimaryClick,
	buttonOutlineClick,
	children,
}: ModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.target as Node;
		if (modalRef.current && !modalRef.current.contains(target)) {
			onClose();
		}
	};

	const handleClickXCircle = () => {
		onClose();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement | SVGElement>) => {
		e.stopPropagation();
		if (e.key === 'Escape') {
			onClose();
		}
	};

	const isButtons = buttonOutlineText || buttonPrimaryText;

	const modalContent = (
		<div
			role="button"
			aria-labelledby="У вас открыто модальное окно"
			tabIndex={0}
			className={classNames(styles.overlay, { [styles['modal-open']]: isOpen })}
			onKeyDown={handleKeyDown}
			onClick={handleOverlayClick}
		>
			<div className={styles.modal} ref={modalRef}>
				<Icon
					icon="xCircle"
					type="button"
					className={styles['x-circle']}
					color="--palette-ui-black-25"
					onClick={handleClickXCircle}
					tabIndex={0}
					aria-label="Закрыть модальное окно"
					onKeyDown={handleKeyDown}
				/>
				<Text className={styles.title} variant="body6">
					{title}
				</Text>
				<Text className={styles.text} variant="body3">
					{children}
				</Text>
				{isButtons && (
					<div className={styles.buttons}>
						{buttonPrimaryText && (
							<Button
								style={{ width: '100%' }}
								variant="primary"
								size="large"
								onClick={buttonPrimaryClick}
							>
								{buttonPrimaryText}
							</Button>
						)}
						{buttonOutlineText && (
							<Button
								style={{ width: '100%' }}
								variant="outline"
								size="large"
								onClick={buttonOutlineClick}
							>
								{buttonOutlineText}
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	);

	return isOpen ? ReactDOM.createPortal(modalContent, document.body) : null;
};
