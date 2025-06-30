import { Media } from '../../model/types/media';
import { MediaLinksItem } from '../MediaLinksItem/MediaLinksItem';

import styles from './MediaLinksList.module.css';

interface MediaLinksListProps {
	links: Media[];
}

export const MediaLinksList = ({ links }: MediaLinksListProps) => {
	return (
		<ul className={styles.list}>
			{links.map((link, index) => (
				<MediaLinksItem mediaLink={link} key={index} />
			))}
		</ul>
	);
};
