import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';

import { HEADER_NAV_LINKS } from '../../../model/constants/headerConstants';
import { HeaderNavLink } from '../../HeaderNavLink/HeaderNavLink';

import styles from './HeaderNavMobile.module.css';

export const HeaderNavMobile = () => {
	const { t } = useTranslation(i18Namespace.landing);

	const popoverLinks: PopoverMenuItem[] = HEADER_NAV_LINKS.map(({ link, path, title }) => ({
		renderComponent: (onToggle) => (
			<Flex onClick={onToggle}>
				<HeaderNavLink link={link} path={path}>
					{t(title)}
				</HeaderNavLink>
			</Flex>
		),
	}));

	return (
		<Popover menuItems={popoverLinks} className={styles['header-popover']}>
			{({ onToggle, isOpen }) => (
				<Button
					dataTestId={'PopoverButton'}
					suffix={
						<Icon
							dataTestId={'ArrowShortDown_Icon'}
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
	);
};
