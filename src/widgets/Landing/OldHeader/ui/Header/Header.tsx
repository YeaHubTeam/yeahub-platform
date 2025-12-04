import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing, ROUTES } from '@/shared/config';
import { AppLogo } from '@/shared/ui/AppLogo';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';

import { useProfileQuery } from '@/entities/auth';

import { AuthorizedBlock } from '../AuthorizedBlock/AuthorizedBlock';
import { HeaderLink } from '../HeaderLink/HeaderLink';
import { HeaderSkeleton } from '../HeaderSkeleton/HeaderSkeleton';
import { UnauthorizedBlock } from '../UnauthorizedBlock/UnauthorizedBlock';

import styles from './Header.module.css';

interface HeaderProps {
	hasOnlyLogo?: boolean;
}

export const Header = ({ hasOnlyLogo }: HeaderProps = {}) => {
	const { t } = useTranslation(i18Namespace.landing);

	const { data: profile, isLoading } = useProfileQuery();

	const settingsMenuItems: PopoverMenuItem[] = [
		{
			renderComponent: () => (
				<HeaderLink link={ROUTES.questions.page} path="/questions/">
					{t(Landing.HEADER_NAV_QUESTIONS_LIST)}
				</HeaderLink>
			),
		},
		{
			renderComponent: () => (
				<HeaderLink link={ROUTES.quiz.page} path="/quiz/">
					{t(Landing.HEADER_NAV_PUBLIC_QUIZ)}
				</HeaderLink>
			),
		},
		{
			renderComponent: () => (
				<HeaderLink link={ROUTES.collections.page} path="/collections/">
					{t(Landing.HEADER_NAV_PUBLIC_COLLECTIONS)}
				</HeaderLink>
			),
		},
	];
	return (
		<header className={styles['header-background']}>
			<div className="container">
				<div className={styles.header}>
					<Flex className={styles['header-nav']}>
						<AppLogo isOpen={false} navigateTo={ROUTES.appRoute} />
						<Flex className={styles.links}>
							<HeaderLink link={ROUTES.questions.page} path="/questions/">
								{t(Landing.HEADER_NAV_QUESTIONS_LIST)}
							</HeaderLink>

							<HeaderLink link={ROUTES.quiz.page} path="/quiz/">
								{t(Landing.HEADER_NAV_PUBLIC_QUIZ)}
							</HeaderLink>

							<HeaderLink link={ROUTES.collections.page} path={'/collections/'}>
								{t(Landing.HEADER_NAV_PUBLIC_COLLECTIONS)}
							</HeaderLink>
						</Flex>
						<Popover menuItems={settingsMenuItems} className={styles.popover}>
							{({ onToggle, isOpen }) => (
								<Button
									suffix={
										<Icon icon="arrowShortDown" size={24} className={isOpen ? styles.arrow : ''} />
									}
									variant="link-gray"
									className={styles.button}
									onClick={onToggle}
								>
									Подготовка
								</Button>
							)}
						</Popover>
					</Flex>
					{isLoading ? (
						<HeaderSkeleton />
					) : (
						!hasOnlyLogo &&
						(profile?.username ? (
							<AuthorizedBlock username={profile.username} avatarURL={profile.avatarUrl} />
						) : (
							<UnauthorizedBlock />
						))
					)}
				</div>
			</div>
		</header>
	);
};
