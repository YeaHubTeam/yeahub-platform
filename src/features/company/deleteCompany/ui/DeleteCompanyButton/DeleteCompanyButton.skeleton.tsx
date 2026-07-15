import { DeleteButtonSkeleton } from '@/shared/ui/DeleteButton';

import { DeleteCompanyButtonProps } from './DeleteCompanyButton';

export const DeleteCompanyButtonSkeleton = ({
	isDetailPage = false,
}: Partial<DeleteCompanyButtonProps>) => {
	return <DeleteButtonSkeleton isDetailPage={isDetailPage} />;
};
