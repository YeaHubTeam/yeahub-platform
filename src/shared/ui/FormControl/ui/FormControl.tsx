import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControl as FormControlKit } from 'yeahub-ui-kit';

import styles from './FormControl.module.css';

interface FormControlProps {
	name: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control?: Control<any>;
	label?: string;
	error?: string;
	children: React.ReactElement;
}

export const FormControl = ({ name, control, label, error, children }: FormControlProps) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value } }) => (
				<FormControlKit label={label} error={error} className={styles.kit}>
					{React.cloneElement(children, { onChange, value })}
				</FormControlKit>
			)}
		/>
	);
};
