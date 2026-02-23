import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { i18Namespace, Landing } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { RESOURCES_LINKS } from '../../model/constants/footerConstants';

import styles from './FooterLinks.module.css';

export const FooterLinks = () => {
	const { isSmallScreen } = useScreenSize();
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<Flex dataTestId="FooterLinks" className={styles['footer-resources-links']}>
			<NavLink data-testid="Footer_NavDocs" to="/docs">
				<Text
					dataTestId="Footer_Docs"
					className={styles['docs-link']}
					variant={isSmallScreen ? 'body2' : 'body2-accent'}
					color="black-400"
				>
					{t(Landing.FOOTER_DOCS)}
				</Text>
			</NavLink>
			<NavLink data-testid="Footer_NavMedia" to="/media">
				<Text
					dataTestId="Footer_Media"
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
					<Icon icon={icon} color={color} dataTestId={`icon-${label}`} />
				</a>
			))}
		</Flex>
	);
};
