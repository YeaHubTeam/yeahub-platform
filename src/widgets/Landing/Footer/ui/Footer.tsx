import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import FigmaLogo from '@/shared/assets/icons/figma.svg';
import GithubLogo from '@/shared/assets/icons/github.svg';
import TelegramLogo from '@/shared/assets/icons/telegram.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { AppLogo } from '@/shared/ui/AppLogo';
import { Flex } from '@/shared/ui/Flex';

import styles from './Footer.module.css';

export const Footer = () => {
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles['container-logo']}>
					<AppLogo isOpen={false} fill="white" navigateTo="#" />
				</div>

				<p className={styles.subtitle}>{t(Landing.FOOTER_SLOGAN)} </p>
				<div className={styles['container-social']}>
					<NavLink to="https://github.com/YeaHubTeam/yeahub-platform">
						<GithubLogo />
					</NavLink>
					<NavLink to="https://t.me/yeahub">
						<TelegramLogo />
					</NavLink>
				</div>
				<p className={styles.about}>{t(Landing.FOOTER_ABOUT)}</p>
				<hr />
				<Flex justify="between">
					<p className={styles['company-name']}>© 2024 YeaHub</p>
					<div className={styles['copyright-icons']}>
						<NavLink className={styles['docs']} to="/docs">
							<p>{t(Landing.FOOTER_DOCS)}</p>
						</NavLink>
						<NavLink to="https://www.figma.com/community/file/1438482355619792777/yeahub-public">
							<FigmaLogo className={styles.figma} />
						</NavLink>
						<NavLink to="https://github.com/YeaHubTeam/yeahub-platform">
							<GithubLogo className={styles['github-icon']} />
						</NavLink>
					</div>
				</Flex>
			</div>
		</footer>
	);
};

Footer.displayName = 'Footer';
