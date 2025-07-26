import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Pallete } from '@/shared/types/types';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { VariantType } from '../Button/types';

import styles from './Modal.module.css';

export type ModalProps = {
	title: string;
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	buttonPrimaryText?: string;
	buttonOutlineText?: string;
	buttonPrimaryClick?: () => void;
	buttonOutlineClick?: () => void;
	buttonPrimaryDisabled?: boolean;
	buttonOutlineDisabled?: boolean;
	variant?: 'default' | 'error';
};

const createPortalRoot = () => {
	const modalRoot = document.createElement('div');
	modalRoot.setAttribute('id', 'modal-root');

	return modalRoot;
};

const titleColors: Record<string, Pallete> = {
	default: 'black-900',
	error: 'red-700',
};

const closeIconColors: Record<string, Pallete> = {
	default: 'black-25',
	error: 'red-600',
};

const primaryButtonVariants: Record<string, VariantType> = {
	default: 'primary',
	error: 'destructive',
};

const outlineButtonVariants: Record<string, VariantType> = {
	default: 'outline',
	error: 'destructive-outline',
};

export const Modal = ({
	title,
	isOpen,
	onClose,
	buttonPrimaryText,
	buttonOutlineText,
	buttonPrimaryClick,
	buttonOutlineClick,
	buttonPrimaryDisabled,
	buttonOutlineDisabled,
	variant = 'default',
	children,
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
			onKeyDown={handleKeyDown}
			onClick={handleOverlayClick}
		>
			<div className={classNames(styles.modal, styles[`${variant}-modal`])} ref={overlayRef}>
				<Icon
					icon="closeCircle"
					type="button"
					className={styles['x-circle']}
					color={closeIconColors[variant]}
					onClick={handleClickXCircle}
					tabIndex={0}
					aria-label="Закрыть модальное окно"
					onKeyDown={handleKeyDown}
				/>
				<Text
					className={classNames(styles.title, styles[`${variant}-title`])}
					variant="body6"
					color={titleColors[variant]}
				>
					{title}
				</Text>
				<Text className={styles.text} variant="body3">
					{children}
				</Text>
				{isButtons && (
					<div className={classNames(styles.buttons, styles[`${variant}-buttons`])}>
						{buttonPrimaryText && (
							<Button
								style={{ width: '100%' }}
								variant={primaryButtonVariants[variant]}
								size="large"
								onClick={buttonPrimaryClick}
								disabled={buttonPrimaryDisabled}
							>
								{buttonPrimaryText}
							</Button>
						)}
						{buttonOutlineText && (
							<Button
								style={{ width: '100%' }}
								variant={outlineButtonVariants[variant]}
								size="large"
								onClick={buttonOutlineClick}
								disabled={buttonOutlineDisabled}
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
