import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Flex } from '@/shared/ui/Flex';

import { HEADER_NAV_LINKS } from '../../../model/constants/headerConstants';
import { HeaderNavLink } from '../../HeaderNavLink/HeaderNavLink';

export const HeaderNavDesktop = () => {
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<Flex dataTestId={'HeaderNavDesktop_Wrapper'} gap="6">
			{HEADER_NAV_LINKS.map(({ link, path, title }) => (
				<HeaderNavLink key={title} link={link} path={path}>
					{t(title)}
				</HeaderNavLink>
			))}
		</Flex>
	);
};
