import { Flex } from '@/shared/ui/Flex';

import { Media } from '../../model/types/media';
import { MediaLinksItem } from '../MediaLinksItem/MediaLinksItem';

interface MediaLinksBannerProps {
	mediaLink: Media;
}

export const MediaLinksBanner = ({ mediaLink }: MediaLinksBannerProps) => {
	return (
		<Flex gap="10">
			<MediaLinksItem mediaLink={mediaLink} />
		</Flex>
	);
};
