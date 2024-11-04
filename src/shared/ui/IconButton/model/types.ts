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
	variant?: VariantType;
	form?: 'square' | 'round';
	size?: 'S' | 'M' | 'L';
	icon: React.ReactNode;
	destructive?: boolean;
	'aria-label': string;
}
