import React, { InputHTMLAttributes } from 'react';

export interface RadioProps extends Omit<React.ComponentPropsWithoutRef<'label'>, 'onChange'> {
	inputRef?: React.RefObject<HTMLInputElement>;
	inputProps?: InputHTMLAttributes<HTMLInputElement>;
	disabled?: boolean;
	checked: boolean;
	labelClassName?: string;
	RadioButtonClassName?: string;
	label?: string;
	onChange: (e: React.ChangeEvent) => void;
}
