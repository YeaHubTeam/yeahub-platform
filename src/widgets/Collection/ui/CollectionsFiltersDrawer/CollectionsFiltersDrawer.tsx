import classNames from 'classnames';

import { FilterFromUser, useModal, useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';

import { CollectionsFilterPanel } from '../CollectionsFilterPanel/CollectionsFilterPanel';

import styles from './CollectionsFiltersDrawer.module.css';

interface CollectionsFiltersDrawerProps {
	onChangeSearch: (value: string) => void;
	onChangeSpecialization: (specialization: number | number[]) => void;
	onChangeIsFree: (isFree: boolean) => void;
	filter: FilterFromUser;
	isPublicCollections?: boolean;
}

export const CollectionsFiltersDrawer = ({
	onChangeSearch,
	onChangeSpecialization,
	onChangeIsFree,
	filter,
	isPublicCollections = false,
}: CollectionsFiltersDrawerProps) => {
	const { isOpen, onToggle, onClose } = useModal();
	const { isMobileS } = useScreenSize();

	const filtersMobileClasses = classNames(
		styles['filters-mobile'],
		isPublicCollections
			? styles['public-collection-icon-positioning']
			: styles['private-collection-icon-positioning'],
	);

	return (
		<div className={filtersMobileClasses}>
			<IconButton
				className={classNames({ [styles.active]: isOpen })}
				icon={<Icon icon="slidersHorizontal" color="black-700" />}
				aria-label="go to filters"
				size="small"
				form="square"
				variant="tertiary"
				onClick={onToggle}
			/>
			<Drawer
				rootName={isMobileS ? 'body' : 'mainLayout'}
				className={classNames(styles.drawer, {
					[styles['drawer-mobile']]: isMobileS,
				})}
				isOpen={isOpen}
				onClose={onClose}
				hasCloseButton
			>
				<Card className={styles['filters--mobile']}>
					<CollectionsFilterPanel
						onChangeSearch={onChangeSearch}
						onChangeSpecialization={onChangeSpecialization}
						onChangeIsFree={onChangeIsFree}
						filter={{
							title: filter.title,
							specialization: filter.specialization,
							isFree: filter.isFree,
						}}
					/>
				</Card>
			</Drawer>
		</div>
	);
};
