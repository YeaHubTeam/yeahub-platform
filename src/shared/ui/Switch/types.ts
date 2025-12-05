import { ChangeEvent, InputHTMLAttributes, RefObject, ComponentPropsWithoutRef } from 'react';

export interface SwitchProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
	checked: boolean;
	disabled?: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	inputRef?: RefObject<HTMLInputElement>;
	inputProps?: InputHTMLAttributes<HTMLInputElement>;
	label?: string;
	labelClassName?: string;
	switchClassName?: string;
}
