import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormControl } from '@/shared/ui/FormControl';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';

import styles from './PasswordInput.module.css';

interface PasswordInputProps {
	label: string;
	placeholder: string;
	error?: string;
	name: string;
}

export const PasswordInput = ({ label, placeholder, error, name }: PasswordInputProps) => {
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
	const { control } = useFormContext();

	const onToggleShowPassword = () => {
		setIsPasswordHidden((prev) => !prev);
	};

	return (
		<FormControl name={name} control={control} label={label}>
			{(field, hasError) => (
				<Input
					{...field}
					className={styles.input}
					placeholder={placeholder}
					type={isPasswordHidden ? 'text' : 'password'}
					error={hasError}
					suffix={
						<Icon
							onClick={onToggleShowPassword}
							icon={isPasswordHidden ? 'eyeClosed' : 'eye'}
							color={error ? 'red-700' : 'black-300'}
							size={24}
						/>
					}
				/>
			)}
		</FormControl>
	);
};
