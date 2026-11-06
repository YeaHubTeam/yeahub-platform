import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';

import { CompanyCardSkeleton } from '@/entities/company';

export const CompanyDetailPageSkeleton = () => {
	return (
		<>
			<BackHeaderSkeleton>
				<ButtonSkeleton width={180} />
			</BackHeaderSkeleton>
			<CompanyCardSkeleton />
		</>
	);
};
