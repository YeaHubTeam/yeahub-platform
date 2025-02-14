export type VariantType =
	| 'primary'
	| 'secondary'
	| 'outline'
	| 'tertiary'
	| 'destructive'
	| 'destructive-secondary'
	| 'destructive-outline'
	| 'destructive-tertiary'
	| 'link'
	| 'link-gray'
	| 'link-purple';

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
	variant?: VariantType;
	preffix?: React.ReactNode;
	suffix?: React.ReactNode;
	fullWidth?: boolean;
	size?: 'L' | 'M' | 'S';
	badge?: string | number;
	destructive?: boolean;
}
