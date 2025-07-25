import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { RESOURCES_LINKS } from '../../model/constants/footerConstants';

import styles from './FooterLinks.module.css';

export const FooterLinks = () => {
	const { isSmallScreen } = useScreenSize();
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<Flex className={styles['footer-resources-links']}>
			<NavLink to={'/docs'}>
				<Text
					className={styles['docs-link']}
					variant={isSmallScreen ? 'body2' : 'body2-accent'}
					color="black-400"
				>
					{t(Landing.FOOTER_DOCS)}
				</Text>
			</NavLink>
			<NavLink to={'/media'}>
				<Text
					className={styles['docs-link']}
					variant={isSmallScreen ? 'body2' : 'body2-accent'}
					color="black-400"
				>
					{t(Landing.FOOTER_MEDIA)}
				</Text>
			</NavLink>
			{RESOURCES_LINKS.map(({ url, label, icon, color, className }) => (
				<a
					key={url}
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`${label} ${t(Landing.FOOTER_LINKS_LINK_ARIA_LABEL)}`}
					className={styles[className]}
				>
					<Icon icon={icon} color={color} />
				</a>
			))}
		</Flex>
	);
};
