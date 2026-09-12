import { DeleteButtonSkeleton } from '@/shared/ui/DeleteButton';

import { DeleteSkillButtonProps } from './DeleteSkillButton';

export const DeleteSkillButtonSkeleton = ({
	isDetailPage = false,
}: Partial<DeleteSkillButtonProps>) => {
	return <DeleteButtonSkeleton isDetailPage={isDetailPage} />;
};
