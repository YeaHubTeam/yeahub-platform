import { mediaLinks } from '../../model/constants/media';
import { MediaLinkItem } from '../MediaLinkItem/MediaLinkItem';

import styles from './MediaLinksList.module.css';

export const MediaLinksList = () => {
	return (
		<ul className={styles['links-list']}>
			{mediaLinks.map((channel) => (
				<MediaLinkItem channel={channel} key={channel.title} />
			))}
		</ul>
	);
};
