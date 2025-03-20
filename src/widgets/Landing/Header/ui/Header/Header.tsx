import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { AppLogo } from '@/shared/ui/AppLogo';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useProfileQuery } from '@/entities/auth';

import { AuthorizedBlock } from '../AuthorizedBlock/AuthorizedBlock';
import { HeaderSkeleton } from '../HeaderSkeleton/HeaderSkeleton';
import { UnauthorizedBlock } from '../UnauthorizedBlock/UnauthorizedBlock';

import styles from './Header.module.css';

interface HeaderProps {
	hasOnlyLogo?: boolean;
}

export const Header = ({ hasOnlyLogo }: HeaderProps = {}) => {
	const { t } = useTranslation(i18Namespace.landing);

	const { data: profile, isLoading } = useProfileQuery();

	return (
		<header className={styles['header-background']}>
			<div className="container">
				<div className={styles.header}>
					<Flex className={styles['header-nav']}>
						<AppLogo isOpen={false} navigateTo={ROUTES.appRoute} navigation="header" />
						<Flex className={styles.links}>
							<NavLink
								to={ROUTES.questions.page}
								className={({ isActive }) =>
									classNames(styles['questions-link'], {
										[styles.active]: isActive || location.pathname.includes('/questions/'),
									})
								}
							>
								<Text variant="body3-accent">{t(Landing.HEADER_LINKS_QUESTIONS_LIST)}</Text>
							</NavLink>
						</Flex>
					</Flex>
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
				</div>
			</div>
		</header>
	);
};
