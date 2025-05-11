import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';

import { HeaderNavItem } from '../../model/types/headerTypes';
import { HeaderNavLink } from '../HeaderNavLink/HeaderNavLink';

import styles from './HeaderNav.module.css';

export const HeaderNav = () => {
	const { isLargeScreen } = useScreenSize();
	const { t } = useTranslation(i18Namespace.landing);

	const navItems: HeaderNavItem[] = [
		{
			link: ROUTES.questions.page,
			path: '/questions/',
			title: Landing.HEADER_NAV_QUESTIONS_LIST,
		},
		{
			link: ROUTES.quiz.page,
			path: '/quiz/',
			title: Landing.HEADER_NAV_PUBLIC_QUIZ,
		},
	];

	const renderLink = (item: HeaderNavItem, onToggle?: () => void) => (
		<Flex onClick={onToggle}>
			<HeaderNavLink link={item.link} path={item.path}>
				{t(item.title)}
			</HeaderNavLink>
		</Flex>
	);

	const popoverItems: PopoverMenuItem[] = navItems.map((item) => ({
		renderComponent: (onToggle) => renderLink(item, onToggle),
	}));

	return (
		<nav aria-label={t(Landing.HEADER_NAV_ARIA_LABEL)}>
			{isLargeScreen ? (
				<Flex className={styles['header-nav']}>
					{navItems.map((item) => (
						<Fragment key={item.title}>{renderLink(item)}</Fragment>
					))}
				</Flex>
			) : (
				<Popover menuItems={popoverItems} className={styles['header-popover']}>
					{({ onToggle, isOpen }) => (
						<Button
							suffix={
								<Icon
									icon="arrowShortDown"
									size={24}
									className={`${styles.arrow} ${isOpen ? styles['arrow-open'] : ''}`}
								/>
							}
							variant="link-gray"
							className={styles.button}
							onClick={onToggle}
						>
							{t(Landing.HEADER_NAV_POPOVER_TITLE)}
						</Button>
					)}
				</Popover>
			)}
		</nav>
	);
};
