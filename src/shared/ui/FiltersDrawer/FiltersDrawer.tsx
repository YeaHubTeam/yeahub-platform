import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { IconButton } from 'yeahub-ui-kit';

import { useQueryFilter } from '@/shared/hooks';
import { Drawer } from '@/shared/ui/Drawer';
import { Icon } from '@/shared/ui/Icon';

import styles from './FiltersDrawer.module.css';

interface FiltersDrawerProps {
	children: ReactNode;
}

export const FiltersDrawer = ({ children }: FiltersDrawerProps) => {
	const [isOpenFilter, setIsOpenFilter] = useState(false);
	const [isActiveFilter, setIsActiveFilter] = useState(false);

	const toggleFilter = () => setIsOpenFilter((prev) => !prev);

	const {
		filter: { status, page, ...getParams },
	} = useQueryFilter();

	useEffect(() => {
		const hasActiveFilter = Object.values(getParams).some((value) => value !== undefined);
		setIsActiveFilter(hasActiveFilter);
	}, [getParams]);

	return (
		<>
			<IconButton
				aria-label="go to filter"
				icon={<Icon icon="filter" size={24} />}
				size="large"
				theme="tertiary"
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
