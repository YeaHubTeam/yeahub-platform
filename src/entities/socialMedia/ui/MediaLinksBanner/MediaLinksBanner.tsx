import { Media } from '../../model/types/media';
import { MediaLinkSimpleItem } from '../MediaLinkSimpleItem/MediaLinkSimpleItem';

interface MediaLinksBannerProps {
	mediaLink: Media;
}

export const MediaLinksBanner = ({ mediaLink }: MediaLinksBannerProps) => {
	return <MediaLinkSimpleItem mediaLink={mediaLink} />;
};
