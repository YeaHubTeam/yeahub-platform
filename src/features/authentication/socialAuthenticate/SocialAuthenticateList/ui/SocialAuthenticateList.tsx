import GitHubIcon from '@/shared/assets/icons/github1.svg';
import { Text } from '@/shared/ui/Text';

import styles from './SocialAuthenticateList.module.css';

interface SocialAuthenticateListProps {
	isAuthenticate: boolean;
}

export const SocialAuthenticateList = ({ isAuthenticate }: SocialAuthenticateListProps) => {
	return (
		<div className={styles.wrapper}>
			<Text variant="body2" className={styles.title}>
				{isAuthenticate
					? 'Авторизоваться через социальные сети'
					: 'Зарегистрироваться через социальные сети'}
			</Text>
			<div className={styles['icons-wrapper']}>
				<GitHubIcon className={styles.icon} />
				<GitHubIcon className={styles.icon} />
				<GitHubIcon className={styles.icon} />
			</div>
		</div>
	);
};
