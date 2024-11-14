import classNames from 'classnames';
import { useRef } from 'react';
import { Icon } from 'yeahub-ui-kit';

import { Button } from '@/shared/ui/Button';

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

	return (
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
				<h3 className={styles.title}>{title}</h3>
				<div className={styles.content}>{children}</div>
				{isButtons && (
					<div className={styles.buttons}>
						{buttonPrimaryText && (
							<Button variant="primary" size="L" onClick={buttonPrimaryClick}>
								{buttonPrimaryText}
							</Button>
						)}
						{buttonOutlineText && (
							<Button variant="outline" size="L" onClick={buttonOutlineClick}>
								{buttonOutlineText}
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
