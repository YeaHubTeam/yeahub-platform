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
	| 'link-purple'
	| 'primary-inverse';

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
	variant?: VariantType;
	preffix?: React.ReactNode;
	suffix?: React.ReactNode;
	fullWidth?: boolean;
	size?: 'large' | 'medium' | 'small' | 'x-large';
	badge?: string | number;
	destructive?: boolean;
	dataTestId?: string;
}
