import { AppLogo } from '@/shared/ui/AppLogo';

import { useProfileQuery } from '@/entities/auth';

import { AuthorizedBlock } from '../AuthorizedBlock/AuthorizedBlock';
import { UnauthorizedBlock } from '../UnauthorizedBlock/UnauthorizedBlock';

import cls from './Header.module.css';

export const Header = () => {
	const { data: profile } = useProfileQuery();

	return (
		<header className={cls.header}>
			<div className={cls.container}>
				<AppLogo isOpen={false} isLanding />
			</div>
			{profile?.firstName ? (
				<AuthorizedBlock firstName={profile.firstName} avatarURL={profile.avatarUrl} />
			) : (
				<UnauthorizedBlock />
			)}
		</header>
	);
};
