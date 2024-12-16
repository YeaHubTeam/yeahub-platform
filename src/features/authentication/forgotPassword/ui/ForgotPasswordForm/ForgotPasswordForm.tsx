import { useFormContext } from 'react-hook-form';

import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { Input } from '@/shared/ui/Input';
import { toast } from '@/shared/ui/Toast';

import { useSendEmailRecoveryPasswordMutation } from '../../api/forgotPasswordApi';
import { ForgotPasswordFormValues } from '../../model/types/forgotPasswordTypes';

import styles from './ForgotPasswordForm.module.css';

interface ForgotPasswordFormProps {
	onSubmit: (email: string) => void;
}

export const ForgotPasswordForm = ({ onSubmit: onSubmitProps }: ForgotPasswordFormProps) => {
	const { t } = useI18nHelpers(i18Namespace.auth);
	const {
		control,
		formState: { isValid },
		handleSubmit,
	} = useFormContext<ForgotPasswordFormValues>();
	const [sendEmailRecoveryPassword] = useSendEmailRecoveryPasswordMutation();

	const sendRecoveryEmail = async (email: string) => {
		try {
			await sendEmailRecoveryPassword({ email }).unwrap();
			onSubmitProps(email);
		} catch (error) {
			toast.error(t(Auth.FORGOT_PASSWORD_ENTERED_INCORRECT_EMAIL));
			// eslint-disable-next-line no-console
			console.error(error);
		}
	};

	const onSubmit = async (data: ForgotPasswordFormValues) => {
		const { username: email } = data;
		await sendRecoveryEmail(email);
	};

	return (
		<Flex direction="column">
			<div className={styles['input-wrapper']}>
				<FormControl name="username" control={control} label={t(Auth.FORGOT_PASSWORD_EMAIL)}>
					{(field) => (
						<Input
							{...field}
							className={styles.input}
							placeholder={t(Auth.FORGOT_PASSWORD_EMAIL_PLACEHOLDER)}
						/>
					)}
				</FormControl>
			</div>
			<Button onClick={handleSubmit(onSubmit)} disabled={!isValid}>
				{t(Auth.FORGOT_PASSWORD_SEND)}
			</Button>
		</Flex>
	);
};
