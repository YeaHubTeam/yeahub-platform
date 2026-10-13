import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';

export const CompanyEditFormHeaderSkeleton = () => {
	return (
		<BackHeaderSkeleton>
			<ButtonSkeleton width={148} />
		</BackHeaderSkeleton>
	);
};
