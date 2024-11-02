import { NavLink } from 'react-router-dom';

import FigmaLogo from '@/shared/assets/icons/figma.svg';
import GithubLogo from '@/shared/assets/icons/github.svg';
import InstagramLogo from '@/shared/assets/icons/instagram.svg';
import TelegramLogo from '@/shared/assets/icons/telegram.svg';
import YoutubeLogo from '@/shared/assets/icons/youtube.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { AppLogo } from '@/shared/ui/AppLogo';

import styles from './Footer.module.css';

export const Footer = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles['container-logo']}>
					<AppLogo isOpen={false} fill="white" navigateTo="#" />
				</div>

				<p className={styles.subtitle}>{t(Landing.FOOTER_SLOGAN)} </p>
				<div className={styles['container-social']}>
					<NavLink to="/">
						<YoutubeLogo />
					</NavLink>
					<NavLink to="/">
						<GithubLogo />
					</NavLink>
					<NavLink to="/">
						<InstagramLogo className={styles.test} />
					</NavLink>
					<NavLink to="/">
						<TelegramLogo />
					</NavLink>
				</div>
				<p className={styles.about}>{t(Landing.FOOTER_ABOUT)}</p>
				<hr />
				<div className={styles['container-copyright']}>
					<p className={styles['company-name']}>© 2024 YeaHub</p>
					<div className={styles['copyright-icons']}>
						<NavLink to="/">
							<FigmaLogo className={styles.figma} />
						</NavLink>
						<NavLink to="/">
							<GithubLogo className={styles['github-icon']} />
						</NavLink>
					</div>
				</div>
			</div>
		</footer>
	);
};

Footer.displayName = 'Footer';
