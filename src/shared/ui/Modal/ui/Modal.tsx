import classNames from 'classnames';
import { useState } from 'react';
import { Button, Icon } from 'yeahub-ui-kit';

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
	const [focusedXCircle, setFocusedXCircle] = useState(false);
	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement;
		if (target && target.id === 'modal-overlay') {
			onClose();
		}
	};

	const handleKeyDownOverlay = (e: React.KeyboardEvent<HTMLDivElement | SVGElement>) => {
		if (e.key === 'Escape') {
			onClose();
		}
	};

	const handleKeyDownXCircle = (e: React.KeyboardEvent<SVGElement>) => {
		if (e.key === 'Enter') {
			onClose();
		}
	};

	const isButtons = buttonOutlineText || buttonPrimaryText;

	return (
		<div
			id="modal-overlay"
			role="button"
			tabIndex={0}
			className={classNames(styles.overlay, { [styles['modal-open']]: isOpen })}
			onKeyDown={handleKeyDownOverlay}
			onClick={handleOverlayClick}
		>
			<div className={styles.modal}>
				<Icon
					icon="xCircle"
					type="button"
					className={styles['x-circle']}
					color="--palette-ui-black-25"
					onClick={onClose}
					tabIndex={0}
					aria-label="Close"
					onFocus={() => setFocusedXCircle(true)}
					onBlur={() => setFocusedXCircle(false)}
					onKeyDown={focusedXCircle ? handleKeyDownXCircle : undefined}
				/>
				<h3 className={styles.title}>{title}</h3>
				<div className={styles.content}>{children}</div>
				{isButtons && (
					<div className={styles.buttons}>
						{buttonPrimaryText && (
							<Button theme="primary" onClick={buttonPrimaryClick}>
								{buttonPrimaryText}
							</Button>
						)}
						{buttonOutlineText && (
							<Button theme="outline" onClick={buttonOutlineClick}>
								{buttonOutlineText}
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};