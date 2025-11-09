import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import CloseIcon from '@/shared/assets/icons/closeCircle.svg';

import styles from './Drawer.module.css';

export const drawerTestIds = {
	container: 'drawer-container',
	closeBtnBackdrop: 'close-backdrop',
	drawer: 'drawer',
	drawerHeader: 'drawer-header',
};

export interface DrawerProps {
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

const Drawer = ({
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
	const rootEl = renderRootRef.current;

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

	const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
		if (event.key === 'Escape') {
			onClose();
		}
	};

	return createPortal(
		<div
			aria-hidden={isOpen}
			data-testid={drawerTestIds.container}
			className={classNames(styles['drawer-container'], {
				[styles['open']]: isOpen,
			})}
		>
			<div
				data-testid={drawerTestIds.drawer}
				className={classNames(styles['drawer'], styles[position], className, {
					[styles['absolute']]: rootName === 'mainLayout',
				})}
				role="dialog"
			>
				{hasCloseButton && (
					<div data-testid={drawerTestIds.drawerHeader} className={styles['drawer-header']}>
						<CloseIcon className={styles['close-icon']} onClick={onClose} />
					</div>
				)}
				{children}
			</div>
			<button
				data-testid={drawerTestIds.closeBtnBackdrop}
				className={styles['backdrop']}
				onClick={onClose}
				onKeyDown={handleKeyDown}
			/>
		</div>,
		portalRootRef.current,
	);
};

export default Drawer;
