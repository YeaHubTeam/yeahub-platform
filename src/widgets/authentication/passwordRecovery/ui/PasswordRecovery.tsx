import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { Auth } from '@/shared/config';
import { Card } from '@/shared/ui/Card';

import { PasswordRecoveryForm } from '@/features/authentication/passwordRecovery';

import { passwordRecoverySchema } from '../lib/validation/passwordRecoverySchema';
import { PasswordRecoverySchema } from '../model/types/passwordRecoveryTypes';

import styles from './PasswordRecovery.module.css';

export const PasswordRecovery = () => {
	const methods = useForm<PasswordRecoverySchema>({
		resolver: yupResolver(passwordRecoverySchema),
		mode: 'onTouched',
	});

	const { t } = useTranslation(i18Namespace.auth);

	return (
		<Card className={styles.wrapper}>
			<h1 className={styles.title}>{t(Auth.PASSWORD_RECOVERY_TITLE)}</h1>
			<p className={styles.subtitle}>{t(Auth.PASSWORD_RECOVERY_SUBTITLE)}</p>
			<FormProvider {...methods}>
				<PasswordRecoveryForm />
			</FormProvider>
		</Card>
	);
};
