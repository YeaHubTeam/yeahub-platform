import { Icon, Button } from 'yeahub-ui-kit';

import styles from './ResponseButtons.module.css';

export const ResponseButtons = ({ className }: { className?: string }) => {
	return (
		<div className={`${styles.wrapper} ${className}`}>
			<Button
				textClassName={styles['action-button']}
				theme="tertiary"
				size="small"
				preffix={<Icon key="thumbsDown" icon="thumbsDown" size={24} />}
			>
				Не знаю
			</Button>
			<Button
				textClassName={styles['action-button']}
				theme="tertiary"
				size="small"
				preffix={<Icon key="clockCounterClockwise" icon="clockCounterClockwise" size={24} />}
			>
				Повторить
			</Button>
			<Button
				textClassName={styles['action-button']}
				theme="tertiary"
				size="small"
				preffix={<Icon key="thumbsUp" icon="thumbsUp" size={24} />}
			>
				Знаю
			</Button>
		</div>
	);
};
