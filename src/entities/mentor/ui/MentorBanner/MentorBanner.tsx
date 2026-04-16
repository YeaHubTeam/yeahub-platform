import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

import { mentor } from '../../model/constans/mentor';

import styles from './MentorBanner.module.css';

export const MentorBanner = () => {
	const { specializations, icons, title, description, buttonText } = mentor;

	return (
		<Card withBorder>
			<div className={styles.header}>
				<Text variant="body3-accent" color="white-900" className={styles.specialization}>
					{specializations}
				</Text>

				<div className={styles.grid}>
					{icons.map((icon, index) => (
						<div key={index} className={styles.wrapper}>
							{icon && <img src={icon} alt="tech" />}
						</div>
					))}
				</div>
			</div>

			<div className={styles.content}>
				<Text variant="body5-strong" color="black-900">
					{title}
				</Text>
				<Text variant="body3" color="black-900">
					{description}
				</Text>

				<Button size="large" variant="primary" destructive={false} fullWidth={false}>
					{buttonText}
				</Button>
			</div>
		</Card>
	);
};
