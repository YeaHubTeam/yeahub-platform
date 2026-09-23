import { FieldValues, Path, useFormContext } from 'react-hook-form';

import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Range } from '@/shared/ui/Range';

import styles from './FormInputRange.module.css';

export interface FormInputRangeProps<T extends FieldValues> {
	name: Path<T>;
	label: string;
	description?: string;
	min?: number;
	max?: number;
	step?: number;
	className?: string;
}

export const FormInputRange = <T extends FieldValues>({
	name,
	label,
	description,
	min = 1,
	max = 5,
	step = 1,
	className = '',
}: FormInputRangeProps<T>) => {
	const { control } = useFormContext();

	return (
		<FormField label={label} description={description}>
			<FormControl
				name={name}
				control={control}
				className={className || styles['form-control-wrapper']}
			>
				{(field) => <Range min={min} max={max} step={step} hasScale {...field} />}
			</FormControl>
		</FormField>
	);
};
