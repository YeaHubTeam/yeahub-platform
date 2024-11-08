import { useFormContext } from 'react-hook-form';
import { Input } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Auth } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';

import { ForgotPassword } from '@/entities/auth';

import styles from './ForgotPasswordForm.module.css';

interface ForgotPasswordFormProps {
	onSubmit: () => void;
}

export const ForgotPasswordForm = ({ onSubmit: onSubmitProps }: ForgotPasswordFormProps) => {
	const { t } = useI18nHelpers(i18Namespace.auth);
	const { control } = useFormContext<ForgotPassword>();

	const onSubmit = () => {
		onSubmitProps();
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
			<Button onClick={onSubmit}>{t(Auth.FORGOT_PASSWORD_SEND)}</Button>
		</Flex>
	);
};
