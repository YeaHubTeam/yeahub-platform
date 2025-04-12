import classNames from 'classnames';
import { useRef } from 'react';

import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './Modal.module.css';

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

	return (
		// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
		<div
			role="dialog"
			aria-labelledby="У вас открыто модальное окно"
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
			tabIndex={0}
			className={classNames(styles.overlay, { [styles['modal-open']]: isOpen })}
			onKeyDown={handleKeyDown}
			onClick={handleOverlayClick}
		>
			<div data-testid="Modal" className={styles.modal} ref={modalRef}>
				<div
					role="button"
					className={styles['x-circle']}
					onClick={handleClickXCircle}
					aria-label="Закрыть модальное окно"
					tabIndex={0}
					onKeyDown={handleKeyDown}
					data-testid="close-button"
				>
					<Icon icon="closeCircle" color="black-25" />
				</div>

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
};
