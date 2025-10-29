import classNames from 'classnames';
import { ReactNode } from 'react';

import { useCurrentProject, useModal, useScreenSize } from '@/shared/hooks';
import { Project } from '@/shared/hooks/useCurrentProject';
import { Drawer } from '@/shared/ui/Drawer';
import { DrawerProps } from '@/shared/ui/Drawer/Drawer';
import { Icon } from '@/shared/ui/Icon';
import { IconButton, IconButtonSize } from '@/shared/ui/IconButton';

import styles from './FiltersDrawer.module.css';

interface FiltersDrawerProps {
	children: ReactNode;
	hasFilters?: boolean;
}

export const FiltersDrawer = ({ children, hasFilters }: FiltersDrawerProps) => {
	const { isOpen, onToggle, onClose } = useModal();
	const { isMobileS } = useScreenSize();

	const project = useCurrentProject();

	const filterIconSize: Record<Project, IconButtonSize> = {
		platform: 'medium',
		landing: 'medium',
		admin: 'large',
	};

	const drawerProps: Partial<DrawerProps> =
		project === 'admin'
			? {}
			: {
					rootName: isMobileS ? 'body' : 'mainLayout',
					className: classNames(styles.drawer, {
						[styles['drawer-mobile']]: isMobileS,
					}),
					hasCloseButton: true,
				};

	return (
		<>
			<IconButton
				aria-label="go to filter"
				icon={<Icon icon="filter" size={24} />}
				size={filterIconSize[project]}
				variant="tertiary"
				onClick={onToggle}
				isActive={hasFilters}
				className={styles['filter-button']}
			/>

			{isOpen && (
				<Drawer {...drawerProps} isOpen={isOpen} onClose={onClose} position="right">
					<section className={styles['filter']}>{children}</section>
				</Drawer>
			)}
		</>
	);
};
