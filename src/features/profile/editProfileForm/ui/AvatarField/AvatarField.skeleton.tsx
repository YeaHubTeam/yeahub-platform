import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { ImageLoaderSkeleton } from '@/shared/ui/ImageLoader';

export const AvatarFieldSkeleton = () => {
	return (
		<FormFieldSkeleton isLimitWidth>
			<ImageLoaderSkeleton />
		</FormFieldSkeleton>
	);
};
