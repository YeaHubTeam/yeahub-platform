import { HeaderAdminPageDetailCardSkeleton } from '@/shared/ui/HeaderAdminPageDetailCard';

import { CompanyCardSkeleton } from '@/entities/company';

export const CompanyDetailPageSkeleton = () => {
	return (
		<>
			<HeaderAdminPageDetailCardSkeleton />
			<CompanyCardSkeleton />
		</>
	);
};
