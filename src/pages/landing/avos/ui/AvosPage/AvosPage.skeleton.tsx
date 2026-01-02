import { AvosBannerSkeleton } from '../AvosBanner/AvosBanner.skeleton';
import { AvosListenSkeleton } from '../AvosListen/AvosListen.skeleton';
import { AvosPromoSkeleton } from '../AvosPromo/AvosPromo.skeleton';

export const AvosPageSkeleton = () => {
	return (
		<>
			<AvosBannerSkeleton />
			<AvosPromoSkeleton />
			<AvosListenSkeleton />
		</>
	);
};
