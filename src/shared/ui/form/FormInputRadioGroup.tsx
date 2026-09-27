import { Control, FieldValues, Path } from 'react-hook-form';

import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Radio } from '@/shared/ui/Radio';

export interface FormInputRadioGroupOption {
	label: string;
	value: string | number | boolean;
	labelClassName?: string;
}

export interface FormInputRadioGroupProps<T extends FieldValues> {
	name: Path<T>;
	control: Control<T>;
	label: string;
	description?: string;
	options: FormInputRadioGroupOption[];
	className?: string;
}

export const FormInputRadioGroup = <T extends FieldValues>({
	name,
	control,
	label,
	description,
	options,
	className,
}: FormInputRadioGroupProps<T>) => {
	return (
		<FormField label={label} description={description}>
			<FormControl name={name} control={control} className={className}>
				{({ value, onChange, onBlur }) => (
					<Flex gap="60">
						{options.map((option) => (
							<Radio
								key={String(option.value)}
								label={option.label}
								labelClassName={option.labelClassName}
								checked={value === option.value}
								onChange={() => onChange(option.value)}
								inputProps={{ name, onBlur }}
							/>
						))}
					</Flex>
				)}
			</FormControl>
		</FormField>
	);
};
