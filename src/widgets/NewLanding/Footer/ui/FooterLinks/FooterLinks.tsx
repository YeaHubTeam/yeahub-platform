import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { FooterLinksProps } from '../../model/types/footerTypes';

import styles from './FooterLinks.module.css';

export const FooterLinks = ({ className, links }: FooterLinksProps) => {
	const { isSmallScreen } = useScreenSize();
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<Flex className={styles[className]}>
			{links.map(({ url, label, icon, color, className, isTextLink }) =>
				isTextLink ? (
					<NavLink className={className ? styles[className] : ''} key={url} to={url}>
						<Text variant={isSmallScreen ? 'body2' : 'body2-accent'} color="black-400">
							{t(label)}
						</Text>
					</NavLink>
				) : (
					<a
						key={url}
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`${label} ${t(Landing.FOOTER_LINKS_LINK_ARIA_LABEL)}`}
						className={className ? styles[className] : ''}
					>
						{icon && <Icon icon={icon} color={color} />}
					</a>
				),
			)}
		</Flex>
	);
};
