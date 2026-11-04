import { CSSProperties, ReactNode } from 'react';

import { TextVariant } from '../Text/types';

export interface ChipProps {
	variant?: 'small' | 'big';
	theme?: 'primary' | 'outlined';
	label?: string | ReactNode;
	labelVariant?: TextVariant;
	activeInverse?: boolean;
	onDelete?: () => void;
	disabled?: boolean;
	active?: boolean;
	prefix?: ReactNode;
	onClick?: () => void;
	className?: string;
	style?: CSSProperties;
	withText?: number | string;
	dataTestId?: string;
}
