import classNames from 'classnames';

import { GurusItemSkeleton } from '../GurusItem/GurusItem.skeleton';

import styles from './GurusList.module.css';

type GuruListViewVariant = 'single' | 'list' | 'list-with-borders';
interface GurusListProps {
	variant: GuruListViewVariant;
}

export const GurusListSkeleton = ({ variant }: GurusListProps) => {
	return (
		<ul
			className={classNames(styles.list, {
				[styles['list-with-borders']]: variant === 'list-with-borders',
			})}
		>
			{[...Array(6)].map((index) => (
				<GurusItemSkeleton key={index} />
			))}
		</ul>
	);
};
