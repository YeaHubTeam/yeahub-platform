import { ChipTheme, ChipVariant } from '../types';

export const chipTestIDs = {
	chip: 'chip',
	labelText: 'label_text',
	icon: 'Chip_icon',
	prefix: 'Chip_prefix',
	skeleton: 'Chip_skeleton',
};

export const ChipVariants: Record<ChipVariant, string> = {
	small: 'small',
	big: 'big',
} as const;

export const ChipThemes: Record<ChipTheme, string> = {
	primary: 'primary',
	outlined: 'outlined',
} as const;
