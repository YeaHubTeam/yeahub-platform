export type IconTheme =
	| 'primary'
	| 'secondary'
	| 'outline'
	| 'tertiary'
	| 'destructive'
	| 'destructive-secondary'
	| 'destructive-outline'
	| 'destructive-tertiary'
	| 'link';

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
	variant?: IconTheme;
	preffix?: React.ReactNode;
	suffix?: React.ReactNode;
	fullWidth?: boolean;
	size?: 'M' | 'L';
	tagName?: 'a' | 'button';
	badge?: string | number;
}
