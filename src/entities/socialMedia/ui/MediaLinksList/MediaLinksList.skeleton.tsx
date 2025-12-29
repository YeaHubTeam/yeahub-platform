import { MediaLinkItemSkeleton } from '../MediaLinkItem/MediaLinkItem.skeleton';

import styles from './MediaLinksList.module.css';

export const MediaLinksListSkeleton = () => {
	return (
		<ul className={styles['links-list']}>
			{[...Array(6)].map((index) => (
				<MediaLinkItemSkeleton key={index} />
			))}
		</ul>
	);
};
