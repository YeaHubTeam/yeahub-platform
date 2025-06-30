import { Flex } from '@/shared/ui/Flex';

import { Media } from '../../model/types/media';
import { MediaLinksItem } from '../MediaLinksItem/MediaLinksItem';
import { MediaLinksList } from '../MediaLinksList/MediaLinksList';

interface MediaLinksBannerProps {
	mediaLinks: Media[];
}

export const MediaLinksBanner = ({ mediaLinks }: MediaLinksBannerProps) => {
	const variant = mediaLinks.length === 1 ? 'single' : 'list';
	return (
		<Flex gap="10">
			{variant === 'list' ? (
				<MediaLinksList links={mediaLinks} />
			) : (
				<MediaLinksItem mediaLink={mediaLinks[0]} />
			)}
		</Flex>
	);
};
