import classNames from 'classnames';
import React, { isValidElement, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Icon } from 'yeahub-ui-kit';

import { Button } from '@/shared/ui/Button';

import {
	PopoverChildrenProps,
	PopoverFooterConfig,
	PopoverHeaderConfig,
	PopoverProps,
} from '../../model/types/types';
import {
	Popover as PopoverFabric,
	PopoverContent,
	PopoverTrigger,
} from '../PopoverFabric/PopoverFabric';
import { PopoverMenu } from '../PopoverMenu/PopoverMenu';

import styles from './Popover.module.css';

export const Popover = (props: PopoverProps & { isMobile?: boolean; isTablet?: boolean }) => {
	const {
		body,
		isOpen: controlledOpen,
		onClickOutside,
		isMobile,
		isTablet,
		header,
		footer,
		className,
		children,
		menuItems,
		ariaLabel,
		placement = 'bottom-end',
		...rest
	} = props;

	const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

	useEffect(() => {
		if (isMobile || isTablet) {
			setUncontrolledOpen(false);
		}
	}, [isMobile, isTablet]);

	const isOpen = controlledOpen ?? uncontrolledOpen;

	const setOpen = useCallback(
		(open: boolean) => {
			if (controlledOpen == null) {
				setUncontrolledOpen(open);
			}
		},
		[controlledOpen],
	);

	const headerMemo = useMemo(() => {
		if (header) {
			if (!isValidElement(header)) {
				const { titleText, dismissible, onDismiss } = header as PopoverHeaderConfig;
				const dismissButton = (
					<Button
						className={styles['popover-title-dismiss']}
						suffix={<Icon icon="plusCircle" />}
						onClick={onDismiss}
						variant="tertiary"
						size="medium"
					/>
				);
				return (
					<div className={styles['popover-title']}>
						<span className={styles['popover-title-text']}>{titleText}</span>
						{dismissible && dismissButton}
					</div>
				);
			}
			return header;
		}
		return null;
	}, [header]);

	const footerMemo = useMemo(() => {
		if (!footer) return null;

		if (isValidElement(footer)) {
			return footer;
		}

		const { primaryAction, secondaryAction, footerContent } = footer as PopoverFooterConfig;
		const footerActions = (
			<div className={styles['popover-footer']}>
				{secondaryAction && (
					<Button className={styles['popover-footer-secondary']} {...secondaryAction} />
				)}
				{primaryAction && (
					<Button className={styles['popover-footer-primary']} {...primaryAction} />
				)}
			</div>
		);

		return (
			<>
				{footerContent && <div className={styles['popover-footer']}>{footerContent}</div>}
				{(primaryAction || secondaryAction) && footerActions}
			</>
		);
	}, [footer]);

	const contentMemo = useMemo(() => {
		return (
			<div className={classNames(styles.popover, className)}>
				{headerMemo}
				{menuItems ? (
					<PopoverMenu menuItems={menuItems} onToggleOpenPopover={() => setOpen(!isOpen)} />
				) : (
					body
				)}
				{footerMemo}
			</div>
		);
	}, [className, headerMemo, menuItems, body, footerMemo, setOpen, isOpen]);

	const renderChildren = (props: PopoverChildrenProps): ReactNode => {
		try {
			return (children as (props: PopoverChildrenProps) => ReactNode)(props);
		} catch (error) {
			console.error('Error rendering children:', error);
			return null;
		}
	};

	const childrenToRender = useMemo(() => {
		if (typeof children === 'function') {
			return renderChildren({
				onToggle: () => setOpen(!isOpen),
				isOpen,
			});
		}

		return children;
	}, [children, isOpen, renderChildren, setOpen]);

	const handleOutsideClick = useCallback(() => {
		onClickOutside?.();
		setOpen(false);
	}, [onClickOutside, setOpen]);

	return (
		<div className={isOpen ? styles['popover-is-open'] : ''}>
			<PopoverFabric
				open={isOpen}
				onOpenChange={handleOutsideClick}
				placement={placement}
				{...rest}
			>
				<PopoverTrigger asChild={true}>{childrenToRender}</PopoverTrigger>
				<PopoverContent>{contentMemo}</PopoverContent>
			</PopoverFabric>
		</div>
	);
};
