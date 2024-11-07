import { ROUTES } from '@/shared/config/router/routes';
import { AppLogo } from '@/shared/ui/AppLogo';

import { useProfileQuery } from '@/entities/auth';

import { AuthorizedBlock } from '../AuthorizedBlock/AuthorizedBlock';
import { UnauthorizedBlock } from '../UnauthorizedBlock/UnauthorizedBlock';

import styles from './Header.module.css';

export const Header = () => {
	const { data: profile } = useProfileQuery();

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<AppLogo isOpen={false} navigateTo={ROUTES.appRoute} />
			</div>
			{profile?.firstName ? (
				<AuthorizedBlock firstName={profile.firstName} avatarURL={profile.avatarUrl} />
			) : (
				<UnauthorizedBlock />
			)}
		</header>
	);
};
