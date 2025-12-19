import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import {
	closeIconColors,
	modalTestIds,
	outlineButtonVariants,
	primaryButtonVariants,
	titleColors,
} from './constants';
import styles from './Modal.module.css';
import { ModalProps } from './ModalTypes';

const createPortalRoot = () => {
	const modalRoot = document.createElement('div');
	modalRoot.setAttribute('id', 'modal-root');

	return modalRoot;
};

export const Modal = ({
	isOpen,
	onClose,
	buttonPrimaryText,
	buttonOutlineText,
	buttonPrimaryClick,
	buttonOutlineClick,
	buttonPrimaryDisabled,
	buttonOutlineDisabled,
	withCloseIcon = true,
	variant = 'default',
	dataTestId = 'Modal',
	children,
	title,
	className = '',
	view = 'default',
}: ModalProps) => {
	const portalRootRef = useRef(document.getElementById('modal-root') || createPortalRoot());
	const renderRootRef = useRef(document.body);
	const rootEl = renderRootRef.current;
	const overlayRef = useRef<HTMLDivElement>(null);

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		const target = e.target as Node;
		if (overlayRef.current && !overlayRef.current.contains(target)) {
			onClose();
		}
	};
	const handleClickXCircle = (e: React.MouseEvent<SVGElement>) => {
		e.stopPropagation();
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
			data-testid={modalTestIds.modalOverlay}
			onKeyDown={handleKeyDown}
			onClick={handleOverlayClick}
		>
			<div
				data-testid={dataTestId}
				className={classNames(styles.modal, styles[`${variant}-modal`], styles[`${view}-modal`])}
				ref={overlayRef}
			>
				{withCloseIcon && (
					<Icon
						icon="closeCircle"
						type="button"
						className={styles['x-circle']}
						color={closeIconColors[variant]}
						onClick={handleClickXCircle}
						tabIndex={0}
						aria-label="Закрыть модальное окно"
						dataTestId={modalTestIds.modalCloseIcon}
						onKeyDown={handleKeyDown}
					/>
				)}
				<div
					data-testid={modalTestIds.modalContentWrapper}
					className={classNames(styles['content-wrapper'], className)}
				>
					{title && (
						<Text
							className={classNames(styles.title, styles[`${variant}-title`])}
							variant="body5-accent"
							color={titleColors[variant]}
							dataTestId={modalTestIds.modalTitle}
						>
							{title}
						</Text>
					)}
					{children && (
						<Text className={styles.text} variant="body3">
							{children}
						</Text>
					)}
				</div>
				{isButtons && (
					<div className={classNames(styles.buttons, styles[`${variant}-buttons`])}>
						{buttonPrimaryText && (
							<Button
								style={{ maxWidth: '240px' }}
								variant={primaryButtonVariants[variant]}
								size="large"
								onClick={buttonPrimaryClick}
								disabled={buttonPrimaryDisabled}
								dataTestId={modalTestIds.modalPrimaryButton}
								fullWidth
							>
								{buttonPrimaryText}
							</Button>
						)}
						{buttonOutlineText && (
							<Button
								style={{ backgroundColor: 'transparent', maxWidth: '240px' }}
								variant={outlineButtonVariants[variant]}
								size="large"
								onClick={buttonOutlineClick}
								disabled={buttonOutlineDisabled}
								dataTestId={modalTestIds.modalOutlineButton}
								fullWidth
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
