import { FormFieldSkeleton } from '@/shared/ui/FormField';

import { SocialNetWorkInputsSkeleton } from '@/entities/socialNetwork';

export const LinksFieldSkeleton = () => {
	return (
		<FormFieldSkeleton isLimitWidth>
			<SocialNetWorkInputsSkeleton />
		</FormFieldSkeleton>
	);
};
