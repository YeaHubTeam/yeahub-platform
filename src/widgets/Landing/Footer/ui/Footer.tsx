import { NavLink } from 'react-router-dom';

import FigmaLogo from '@/shared/assets/icons/figma.svg';
import GithubLogo from '@/shared/assets/icons/github.svg';
import InstagramLogo from '@/shared/assets/icons/instagram.svg';
import TelegramLogo from '@/shared/assets/icons/telegram.svg';
import YoutubeLogo from '@/shared/assets/icons/youtube.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useResize } from '@/shared/hooks/useResize';
import { AppLogo } from '@/shared/ui/AppLogo';

import cls from './Footer.module.css';

export const Footer = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	const size = useResize();
	const isMobile = size < 360;

	return (
		<footer className={cls.footer}>
			<div className={cls.container}>
				<div className={cls['container-logo']}>
					<AppLogo isLanding isOpen={false} fill="white" />
				</div>
				{isMobile ? (
					<p className={cls.subtitle}>{t(Landing.FOOTER_SLOGAN_MOBILE)}</p>
				) : (
					<p className={cls.subtitle}>{t(Landing.FOOTER_SLOGAN_DEFAULT)} </p>
				)}
				<div className={cls['container-social']}>
					<NavLink to="/">
						<YoutubeLogo />
					</NavLink>
					<NavLink to="/">
						<GithubLogo />
					</NavLink>
					<NavLink to="/">
						<InstagramLogo className={cls.test} />
					</NavLink>
					<NavLink to="/">
						<TelegramLogo />
					</NavLink>
				</div>
				<p className={cls.about}>{t(Landing.FOOTER_ABOUT)}</p>
				<hr />
				<div className={cls['container-copyright']}>
					<p className={cls['company-name']}>© 2024 YeaHub</p>
					<div className={cls['copyright-icons']}>
						<NavLink to="/">
							<FigmaLogo className={cls.figma} />
						</NavLink>
						<NavLink to="/">
							<div>
								<GithubLogo className={cls['github-icon']} />
							</div>
						</NavLink>
					</div>
				</div>
			</div>
		</footer>
	);
};

Footer.displayName = 'Footer';
