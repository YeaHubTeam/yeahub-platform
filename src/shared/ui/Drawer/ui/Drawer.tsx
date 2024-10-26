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
}: DrawerProps) => {
	const portalRootRef = useRef(document.getElementById('drawer-root') || createPortalRoot());
	const bodyRef = useRef(document.querySelector('body')!);

	useEffect(() => {
		const updatePageScroll = () => {
			if (isOpen) {
				bodyRef.current.style.overflow = 'hidden';
			} else {
				bodyRef.current.style.overflow = '';
			}
		};

		updatePageScroll();
	}, [isOpen]);

	useEffect(() => {
		bodyRef.current.appendChild(portalRootRef.current);
		const portal = portalRootRef.current;
		const bodyEl = bodyRef.current;

		return () => {
			portal.remove();
			bodyEl.style.overflow = '';
		};
	}, []);

	const handleKetDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
		if (event.key === 'Escape') {
			onClose();
		}
	};

	return createPortal(
		<div
			aria-hidden={isOpen ? 'false' : 'true'}
			className={classNames(styles['drawer-container'], className, {
				[styles['open']]: isOpen,
			})}
		>
			<div className={classNames(styles['drawer'], styles[position])} role="dialog">
				{children}
			</div>
			<button
				className={styles['backdrop']}
				onClick={onClose}
				onKeyDown={(event) => handleKetDown(event)}
			/>
		</div>,
		portalRootRef.current,
	);
};
