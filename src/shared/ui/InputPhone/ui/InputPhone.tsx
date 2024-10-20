import classNames from 'classnames';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import InputMask from 'react-input-mask';

import styles from './InputPhone.module.css';

type FieldProps = Omit<ControllerRenderProps<FieldValues, string>, 'ref'>;

interface InputPhoneProps {
	fields: FieldProps;
	hasError?: boolean;
	className?: 'registration' | 'edit' | '';
}

export const InputPhone = ({ fields, hasError, className = '' }: InputPhoneProps) => (
	<InputMask
		{...fields}
		className={classNames(styles.phone, styles[className], {
			[styles.error]: hasError,
		})}
		mask={'+7-(999)-999-99-99'}
		placeholder={'+7-(XXX)-XXX-XX-XX'}
	/>
);
