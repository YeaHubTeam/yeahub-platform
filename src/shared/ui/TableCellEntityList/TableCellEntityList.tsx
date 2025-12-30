import classNames from 'classnames';
import { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config';
import { Translation } from '@/shared/config';
import { route } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './TableCellEntityList.module.css';

interface TableCellEntityListProps<T> {
	showCount: number;
	items: T[];
	url?: string;
}

export const TableCellEntityList = <T extends { id: number; title: string }>({
	showCount,
	items,
	url,
}: TableCellEntityListProps<T>) => {
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useTranslation(i18Namespace.translation);

	const toggleOpen = () => {
		setIsOpen((prev) => !prev);
	};

	const itemsToShow = isOpen ? items : items.slice(0, showCount);

	return (
		<Flex direction="column" gap="8" align="start">
			<div>
				{url ? (
					<>
						{itemsToShow.map((item) => (
							<Fragment key={item.id}>
								<Link to={route(url, item.id)} className={styles.link}>
									<Text variant="body3-accent">{item.title}</Text>
								</Link>
								{itemsToShow.indexOf(item) < itemsToShow.length - 1 && <span>, </span>}
							</Fragment>
						))}
					</>
				) : (
					itemsToShow.map((item) => item.title).join(', ')
				)}
			</div>
			{items.length > showCount && (
				<Button
					variant="link-gray"
					onClick={toggleOpen}
					className={styles.button}
					suffix={
						<Icon
							icon="arrowShortDown"
							size={14}
							className={classNames(styles.icon, {
								[styles['opened']]: isOpen,
							})}
						/>
					}
				>
					<Text variant="body1" color="black-200" className={styles.link}>
						{!isOpen ? t(Translation.EXPAND) : t(Translation.COLLAPSE)}
					</Text>
				</Button>
			)}
		</Flex>
	);
};
