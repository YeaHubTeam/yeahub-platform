import { ROUTES } from '@/shared/config/router/routes';
import { AppLogo } from '@/shared/ui/AppLogo';

import { useProfileQuery } from '@/entities/auth';

import { AuthorizedBlock } from '../AuthorizedBlock/AuthorizedBlock';
import { HeaderSkeleton } from '../HeaderSkeleton/HeaderSkeleton';
import { UnauthorizedBlock } from '../UnauthorizedBlock/UnauthorizedBlock';

import styles from './Header.module.css';

interface HeaderProps {
	hasOnlyLogo?: boolean;
}

export const Header = ({ hasOnlyLogo }: HeaderProps = {}) => {
	const { data: profile, isLoading } = useProfileQuery();

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<AppLogo isOpen={false} navigateTo={ROUTES.appRoute} hideOnMobile={false} />
			</div>
			{isLoading ? (
				<HeaderSkeleton />
			) : (
				!hasOnlyLogo &&
				(profile?.firstName ? (
					<AuthorizedBlock firstName={profile.firstName} avatarURL={profile.avatarUrl} />
				) : (
					<UnauthorizedBlock />
				))
			)}
		</header>
	);
};
