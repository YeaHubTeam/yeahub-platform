import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { RangeSkeleton } from '@/shared/ui/Range';

import styles from './FormInputRange.module.css';

interface FormInputRangeSkeletonProps {
	className?: string;
}

export const FormInputRangeSkeleton = ({ className }: FormInputRangeSkeletonProps) => {
	return (
		<FormFieldSkeleton>
			<FormControlSkeleton className={className || styles['form-control-wrapper']}>
				<RangeSkeleton />
			</FormControlSkeleton>
		</FormFieldSkeleton>
	);
};
