import { AvosBannerSkeleton, AvosPromoSkeleton, AvosListenSkeleton } from '@/widgets/Landing/Avos';

export const AvosPageSkeleton = () => {
	return (
		<>
			<AvosBannerSkeleton />
			<AvosPromoSkeleton />
			<AvosListenSkeleton />
		</>
	);
};
