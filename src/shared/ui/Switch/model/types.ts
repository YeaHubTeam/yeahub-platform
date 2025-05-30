import React, { InputHTMLAttributes } from 'react';

export interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
	checked: boolean;
	disabled?: boolean;
	onChange: (e: React.ChangeEvent) => void;
	inputRef?: React.RefObject<HTMLInputElement>;
	inputProps?: InputHTMLAttributes<HTMLInputElement>;
	label?: string;
	labelClassName?: string;
	switchClassName?: string;
}
