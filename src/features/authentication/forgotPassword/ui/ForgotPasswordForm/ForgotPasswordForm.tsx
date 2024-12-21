import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Auth, Translation } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { toast } from '@/shared/ui/Toast';

import { useSendEmailRecoveryPasswordMutation } from '../../api/forgotPasswordApi';
import { ForgotPasswordFormValues } from '../../model/types/forgotPasswordTypes';

import styles from './ForgotPasswordForm.module.css';

interface ForgotPasswordFormProps {
	onSubmit: (email: string) => void;
}

export const ForgotPasswordForm = ({ onSubmit: onSubmitProps }: ForgotPasswordFormProps) => {
	const { t } = useTranslation([i18Namespace.auth, i18Namespace.translation]);
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
			toast.error(
				t(Translation.TOAST_CHANGE_PASSWORD_FAILED_EMAIL, { ns: i18Namespace.translation }),
			);
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
				<FormControl name="username" control={control} label={t(Auth.FORM_EMAIL_LABEL)}>
					{(field) => (
						<Input
							{...field}
							className={styles.input}
							placeholder={t(Auth.FORM_EMAIL_PLACEHOLDER)}
						/>
					)}
				</FormControl>
			</div>
			<Button onClick={handleSubmit(onSubmit)} disabled={!isValid}>
				{t(Auth.FORGOT_PASSWORD_SUBMIT)}
			</Button>
		</Flex>
	);
};
