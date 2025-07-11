import { Media } from '../../model/types/media';
import { MediaLinksItem } from '../MediaLinksItem/MediaLinksItem';

interface MediaLinksBannerProps {
	mediaLink: Media;
}

export const MediaLinksBanner = ({ mediaLink }: MediaLinksBannerProps) => {
	return <MediaLinksItem mediaLink={mediaLink} />;
};
