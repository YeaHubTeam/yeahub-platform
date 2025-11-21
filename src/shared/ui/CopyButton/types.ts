export interface CopyButtonProps extends Omit<React.ComponentPropsWithRef<'button'>, 'form'> {
	text: string | number;
}
