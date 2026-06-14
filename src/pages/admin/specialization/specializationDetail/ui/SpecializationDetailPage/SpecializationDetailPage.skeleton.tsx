import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Skeleton } from '@/shared/ui/Skeleton';
import style from './SpecializationDetailPage.module.css';

export const SpecializationDetailPageSkeleton = () => {
	return (
		<>
			<BackHeaderSkeleton>
				<ButtonSkeleton width={130} />
				<ButtonSkeleton width={130} />
			</BackHeaderSkeleton>
			<div className={style.specializationDetailSkeleton}>
				<Skeleton width={740} height={160} borderRadius={16} />
				<Skeleton width={740} height={133} borderRadius={16} />
			</div>
		</>
	);
};
