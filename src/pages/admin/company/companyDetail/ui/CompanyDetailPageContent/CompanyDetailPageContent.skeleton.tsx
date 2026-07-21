import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';

import { CompanyCardSkeleton } from '@/entities/company';

import { DeleteCompanyButtonSkeleton } from '@/features/company/deleteCompany';

export const CompanyDetailPageSkeleton = () => {
	return (
		<>
			<BackHeaderSkeleton>
				<DeleteCompanyButtonSkeleton isDetailPage />
				<ButtonSkeleton width={180} />
			</BackHeaderSkeleton>
			<CompanyCardSkeleton />
		</>
	);
};
