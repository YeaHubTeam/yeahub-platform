import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useProfileQuery } from '@/entities/auth';

import { AuthorizedBlock } from '@/widgets/Landing/Header/ui/AuthorizedBlock/AuthorizedBlock';

import styles from './HeaderAuthDesktop.module.css';

export const HeaderAuthDesktop = () => {
	const { t } = useTranslation(i18Namespace.landing);

	const { data: profile } = useProfileQuery();

	return profile?.username ? (
		<AuthorizedBlock username={profile.username} avatarURL={profile.avatarUrl} />
	) : (
		<Flex justify="between" align="center" gap="26">
			<Link to={ROUTES.auth.login.page}>
				<Button variant="link" className={styles['login-link']}>
					{t(Landing.LOGIN)}
				</Button>
			</Link>

			<Link to={ROUTES.auth.register.page}>
				<Button size="large" className={styles['register-button']}>
					{t(Landing.REGISTER)}
				</Button>
			</Link>
		</Flex>
	);
};
