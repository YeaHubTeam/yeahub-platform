import { VariantType } from './types';

const tagNameByVariants: Record<VariantType, 'button' | 'a'> = {
	primary: 'button',
	secondary: 'button',
	outline: 'button',
	tertiary: 'button',
	destructive: 'button',
	'destructive-secondary': 'button',
	'destructive-outline': 'button',
	'destructive-tertiary': 'button',
	link: 'a',
	'link-gray': 'a',
	'link-purple': 'a',
};

export const getTagName = (variant: keyof typeof tagNameByVariants): 'button' | 'a' =>
	tagNameByVariants[variant];
