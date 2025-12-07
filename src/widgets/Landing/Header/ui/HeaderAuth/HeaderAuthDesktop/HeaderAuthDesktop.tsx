import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace, Landing, ROUTES } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useProfileQuery } from '@/entities/auth';

import { AuthorizedBlock } from '../../AuthorizedBlock/AuthorizedBlock';

import styles from './HeaderAuthDesktop.module.css';

export const HeaderAuthDesktop = () => {
	const { t } = useTranslation(i18Namespace.landing);

	const { data: profile } = useProfileQuery();

	return profile?.username ? (
		<AuthorizedBlock username={profile.username} avatarURL={profile.avatarUrl} />
	) : (
		<Flex dataTestId="HeaderAuthDesktop_Wrapper" justify="between" align="center" gap="26">
			<Link to={ROUTES.auth.login.page}>
				<Button dataTestId="LoginButton" variant="link" className={styles['login-link']}>
					{t(Landing.LOGIN)}
				</Button>
			</Link>

			<Link to={ROUTES.auth.register.page}>
				<Button dataTestId="RegisterButton" size="large" className={styles['register-button']}>
					{t(Landing.REGISTER)}
				</Button>
			</Link>
		</Flex>
	);
};
