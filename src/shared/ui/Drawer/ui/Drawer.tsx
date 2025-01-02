import classNames from 'classnames';
import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from 'yeahub-ui-kit';

import styles from './Drawer.module.css';

interface DrawerProps {
	isOpen: boolean;
	position?: 'right' | 'left' | 'bottom';
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
	rootName?: 'mainLayout' | 'body';
	hasCloseButton?: boolean;
}

const createPortalRoot = () => {
	const drawerRoot = document.createElement('div');
	drawerRoot.setAttribute('id', 'drawer-root');

	return drawerRoot;
};

export const Drawer = ({
	isOpen,
	children,
	position = 'right',
	onClose,
	className,
	rootName = 'mainLayout',
	hasCloseButton = false,
}: DrawerProps) => {
	const portalRootRef = useRef(document.getElementById('drawer-root') || createPortalRoot());
	const documentRootName = rootName === 'mainLayout' ? 'main' : 'body';
	const renderRootRef = useRef(document.querySelector(documentRootName)!);

	useEffect(() => {
		renderRootRef.current.style.overflow = isOpen ? 'hidden' : '';
	}, [isOpen]);

	useEffect(() => {
		if (isOpen) {
			renderRootRef.current.appendChild(portalRootRef.current);
			const portal = portalRootRef.current;
			const bodyEl = renderRootRef.current;

			return () => {
				portal.remove();
				bodyEl.style.overflow = '';
			};
		}
	}, [isOpen]);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
		if (event.key === 'Escape') {
			onClose();
		}
	};

	return createPortal(
		<div
			aria-hidden={isOpen}
			className={classNames(styles['drawer-container'], {
				[styles['open']]: isOpen,
			})}
		>
			<div
				className={classNames(styles['drawer'], styles[position], className, {
					[styles['absolute']]: rootName === 'mainLayout',
				})}
				role="dialog"
			>
				{hasCloseButton && (
					<div className={styles['close-button-wrapper']}>
						<Icon
							aria-label="close button"
							onClick={onClose}
							className={styles['close-button']}
							icon="plusCircle"
							color={'--palette-ui-red-600'}
						/>
					</div>
				)}

				{children}
			</div>
			<button className={styles['backdrop']} onClick={onClose} onKeyDown={handleKeyDown} />
		</div>,
		portalRootRef.current,
	);
};
