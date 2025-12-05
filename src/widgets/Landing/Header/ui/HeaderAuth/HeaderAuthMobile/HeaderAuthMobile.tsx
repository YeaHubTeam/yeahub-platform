import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Landing, ROUTES } from '@/shared/config';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { ProfileIcon, UserPlusIcon } from '@/shared/ui/Icons';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';

import { useProfileQuery } from '@/entities/auth';

import { AuthorizedBlock } from '../../AuthorizedBlock/AuthorizedBlock';

import styles from './HeaderAuthMobile.module.css';

export const HeaderAuthMobile = () => {
	const { t } = useTranslation(i18Namespace.landing);
	const navigate = useNavigate();

	const { data: profile } = useProfileQuery();

	const authMenuLinks: PopoverMenuItem[] = [
		{
			icon: <ProfileIcon isCurrentColor />,
			title: t(Landing.LOGIN),
			onClick: () => {
				navigate(ROUTES.auth.login.page);
			},
		},
		{
			icon: <UserPlusIcon isCurrentColor />,
			title: t(Landing.REGISTER),
			onClick: () => {
				navigate(ROUTES.auth.register.page);
			},
		},
	];

	return profile?.username ? (
		<AuthorizedBlock username={profile.username} avatarURL={profile.avatarUrl} />
	) : (
		<Popover menuItems={authMenuLinks} className={styles['auth-popover']}>
			{({ onToggle }) => (
				<IconButton
					dataTestId={'HeaderAuthMobile_IconButton'}
					form="square"
					variant="tertiary"
					onClick={onToggle}
					className={styles['burger-button']}
					icon={<Icon icon="burger" size={32} />}
					aria-label={t(Landing.HEADER_AUTH_ICONBUTTON_ARIA_LABEL)}
				/>
			)}
		</Popover>
	);
};
