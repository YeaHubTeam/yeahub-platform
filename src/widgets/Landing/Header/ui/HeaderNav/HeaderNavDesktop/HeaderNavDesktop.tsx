import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { LS_ACCESS_TOKEN_KEY, getFromLS } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { HEADER_NAV_LINKS, HEADER_NAV_LINKS_AUTH } from '../../../model/constants/headerConstants';
import { HeaderNavLink } from '../../HeaderNavLink/HeaderNavLink';

export const HeaderNavDesktop = () => {
	const { t } = useTranslation(i18Namespace.landing);
	const accessToken = getFromLS(LS_ACCESS_TOKEN_KEY);
	const navLinks = accessToken ? HEADER_NAV_LINKS_AUTH : HEADER_NAV_LINKS;

	return (
		<Flex dataTestId={'HeaderNavDesktop_Wrapper'} gap="6">
			{navLinks.map(({ link, path, title }) => (
				<HeaderNavLink key={title} link={link} path={path}>
					{t(title)}
				</HeaderNavLink>
			))}
		</Flex>
	);
};
