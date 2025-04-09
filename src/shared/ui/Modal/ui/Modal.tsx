import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

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

const createPortalRoot = () => {
	const modalRoot = document.createElement('div');
	modalRoot.setAttribute('id', 'modal-root');

	return modalRoot;
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
	const portalRootRef = useRef(document.getElementById('modal-root') || createPortalRoot());
	const renderRootRef = useRef(document.body);
	const rootEl = renderRootRef.current;
	const overlayRef = useRef<HTMLDivElement>(null);

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.target as Node;
		if (overlayRef.current && !overlayRef.current.contains(target)) {
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

	useEffect(() => {
		if (rootEl) {
			rootEl.style.overflow = isOpen ? 'hidden' : '';

			return () => {
				rootEl.style.overflow = '';
			};
		}
	}, [isOpen]);

	useEffect(() => {
		if (isOpen && rootEl) {
			rootEl.appendChild(portalRootRef.current);
			const portal = portalRootRef.current;

			return () => {
				portal.remove();
				rootEl.style.overflow = '';
			};
		}
	}, [isOpen]);

	const isButtons = buttonOutlineText || buttonPrimaryText;

	return createPortal(
		<div
			role="button"
			aria-labelledby="У вас открыто модальное окно"
			tabIndex={0}
			className={classNames(styles.overlay, { [styles['modal-open']]: isOpen })}
			onKeyDown={handleKeyDown}
			onClick={handleOverlayClick}
		>
			<div className={styles.modal} ref={overlayRef}>
				<Icon
					icon="closeCircle"
					type="button"
					className={styles['x-circle']}
					color="black-25"
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
		</div>,
		portalRootRef.current,
	);
};
