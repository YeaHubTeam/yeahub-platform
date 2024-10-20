import GitHubIcon from '@/shared/assets/icons/github.svg';

import styles from './SocialAuthenticateList.module.css';

interface SocialAuthenticateListProps {
	isAuthenticate: boolean;
}

export const SocialAuthenticateList = ({ isAuthenticate }: SocialAuthenticateListProps) => {
	return (
		<div className={styles.wrapper}>
			<p className={styles.title}>
				{isAuthenticate
					? 'Авторизоваться через социальные сети'
					: 'Зарегистрироваться через социальные сети'}
			</p>
			<div className={styles['icons-wrapper']}>
				<GitHubIcon className={styles.icon} />
				<GitHubIcon className={styles.icon} />
				<GitHubIcon className={styles.icon} />
			</div>
		</div>
	);
};
