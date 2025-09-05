export type VariantType =
	| 'primary'
	| 'secondary'
	| 'outline'
	| 'tertiary'
	| 'link'
	| 'destructive'
	| 'destructive-secondary'
	| 'destructive-outline'
	| 'destructive-tertiary';

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
	dataTestId?: string;
	variant?: VariantType;
	form?: 'square' | 'round';
	size?: 'small' | 'medium' | 'large';
	icon: React.ReactNode;
	destructive?: boolean;
	'aria-label': string;
}
