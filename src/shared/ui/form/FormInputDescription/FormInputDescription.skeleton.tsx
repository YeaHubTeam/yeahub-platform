import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { TextAreaSkeleton } from '@/shared/ui/TextArea';

interface FormInputDescriptionSkeletonProps {
	controlClassName?: string;
	textAreaClassName?: string;
	direction?: 'row' | 'column';
}

export const FormInputDescriptionSkeleton = ({
	controlClassName,
	textAreaClassName,
	direction,
}: FormInputDescriptionSkeletonProps) => {
	return (
		<FormFieldSkeleton direction={direction}>
			<FormControlSkeleton className={controlClassName}>
				<TextAreaSkeleton className={textAreaClassName} />
			</FormControlSkeleton>
		</FormFieldSkeleton>
	);
};
