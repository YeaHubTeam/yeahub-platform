import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';

import { CompanyCardSkeleton } from '@/entities/company';

import { DeleteQuestionButtonSkeleton } from '@/features/question/deleteQuestion';

export const CompanyDetailPageSkeleton = () => {
	return (
		<>
			<BackHeaderSkeleton>
				<DeleteQuestionButtonSkeleton isDetailPage />
				<ButtonSkeleton width={180} />
			</BackHeaderSkeleton>
			<CompanyCardSkeleton />
		</>
	);
};
