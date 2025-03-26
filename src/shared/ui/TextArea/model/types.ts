export interface TextAreaProps extends React.ComponentPropsWithoutRef<'textarea'> {
	isReadonly?: boolean;
	state?: 'default' | 'error' | 'valid';
}
