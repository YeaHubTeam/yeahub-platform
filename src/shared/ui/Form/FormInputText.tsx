import { Control, FieldValues, Path } from 'react-hook-form';

import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import { InputProps } from '@/shared/ui/Input/Input';

interface FormInputTextProps<T extends FieldValues> extends Omit<
	InputProps,
	'error' | 'label' | 'className'
> {
	name: Path<T>;
	control: Control<T>;

	label: string;
	description?: string;

	isLimitWidth?: boolean;
	direction?: 'row' | 'column';

	formControlClassName?: string;
	inputClassName?: string;
}

export const FormInputText = <T extends FieldValues>({
	name,
	control,
	label,
	description,
	isLimitWidth,
	direction,
	formControlClassName,
	inputClassName,
	...inputProps
}: FormInputTextProps<T>) => {
	return (
		<FormField
			label={label}
			description={description}
			isLimitWidth={isLimitWidth}
			direction={direction}
		>
			<FormControl name={name} control={control} className={formControlClassName}>
				{(field, hasError) => (
					<Input
						{...field}
						{...inputProps}
						className={inputClassName}
						error={hasError}
						onChange={(event) => {
							field.onChange(event);
							inputProps.onChange?.(event);
						}}
					/>
				)}
			</FormControl>
		</FormField>
	);
};
