import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { useQueryFilter } from '@/shared/hooks';
import { Drawer } from '@/shared/ui/Drawer';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';

import styles from './FiltersDrawer.module.css';

interface FiltersDrawerProps {
	children: ReactNode;
}

export const FiltersDrawer = ({ children }: FiltersDrawerProps) => {
	const [isOpenFilter, setIsOpenFilter] = useState(false);
	const [isActiveFilter, setIsActiveFilter] = useState(false);

	const toggleFilter = () => setIsOpenFilter((prev) => !prev);

	const location = useLocation();

	const {
		filter: { status, page, roles, isEmailVerified, ...getParams },
	} = useQueryFilter();

	useEffect(() => {
		let hasActiveFilter;
		if (location.pathname === '/admin/users') {
			hasActiveFilter = Boolean(roles) || isEmailVerified === 'true';
		} else {
			hasActiveFilter = Object.values(getParams).some((value) => value !== undefined);
		}
		setIsActiveFilter(hasActiveFilter);
	}, [getParams, isEmailVerified, location.pathname, roles]);

	return (
		<>
			<IconButton
				aria-label="go to filter"
				icon={<Icon icon="filter" size={24} />}
				size="large"
				variant="tertiary"
				onClick={toggleFilter}
				isActive={isActiveFilter}
				className={styles['filter-button']}
			/>

			{isOpenFilter && (
				<Drawer isOpen={isOpenFilter} onClose={toggleFilter} position="right">
					<section className={styles['filter']}>{children}</section>
				</Drawer>
			)}
		</>
	);
};
