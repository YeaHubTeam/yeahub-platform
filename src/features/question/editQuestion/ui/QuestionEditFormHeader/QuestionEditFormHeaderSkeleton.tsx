import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';

export const QuestionEditFormHeaderSkeleton = () => {
	return (
		<BackHeaderSkeleton>
			<ButtonSkeleton width={150} />
			<ButtonSkeleton width={150} />
		</BackHeaderSkeleton>
	);
};
