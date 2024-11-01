import classNames from 'classnames';
import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './Drawer.module.css';

interface DrawerProps {
	isOpen: boolean;
	position?: 'right' | 'left' | 'bottom';
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
	rootName?: 'mainLayout' | 'body';
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
}: DrawerProps) => {
	const portalRootRef = useRef(document.getElementById('drawer-root') || createPortalRoot());
	const documentRootName = rootName === 'mainLayout' ? 'main' : 'body';
	const renderRootRef = useRef(document.querySelector(documentRootName)!);

	useEffect(() => {
		renderRootRef.current.style.overflow = isOpen ? 'hidden' : '';
	}, [isOpen]);

	useEffect(() => {
		renderRootRef.current.appendChild(portalRootRef.current);
		const portal = portalRootRef.current;
		const bodyEl = renderRootRef.current;

		return () => {
			portal.remove();
			bodyEl.style.overflow = '';
		};
	}, []);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
		if (event.key === 'Escape') {
			onClose();
		}
	};

	return createPortal(
		<div
			aria-hidden={isOpen}
			className={classNames(styles['drawer-container'], className, {
				[styles['open']]: isOpen,
			})}
		>
			<div
				className={classNames(styles['drawer'], styles[position], {
					[styles['absolute']]: rootName === 'mainLayout',
				})}
				role="dialog"
			>
				{children}
			</div>
			<button className={styles['backdrop']} onClick={onClose} onKeyDown={handleKeyDown} />
		</div>,
		portalRootRef.current,
	);
};
