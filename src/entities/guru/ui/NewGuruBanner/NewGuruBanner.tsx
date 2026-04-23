import { useTranslation } from 'react-i18next';

import { Guru, i18Namespace } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { NewGuru } from '@/entities/guru';

import styles from './NewGuruBanner.module.css';

interface NewGuruBannerProps {
	guru: NewGuru;
}

export const NewGuruBanner = ({ guru }: NewGuruBannerProps) => {
	const { specializationTitle, icons, title, description } = guru;

	const { t } = useTranslation(i18Namespace.guru);

	return (
		<Card withBorder>
			<div className={styles.header}>
				<Text variant="body3-accent" color="white-900" className={styles.specialization}>
					{specializationTitle}
				</Text>

				<Flex gap="8" direction="column" align="end" className={styles.grid}>
					{icons.map((iconBlock, index) => {
						return (
							<Flex key={index} gap="8">
								{iconBlock.map((icon, iconIndex) => {
									return (
										<div key={iconIndex} className={styles.wrapper}>
											{icon && <img width={18} height={18} src={icon} alt="tech" />}
										</div>
									);
								})}
							</Flex>
						);
					})}
				</Flex>
			</div>

			<div className={styles.content}>
				<Text variant="body5-strong" color="black-900">
					{title}
				</Text>
				<Text variant="body3" color="black-900">
					{description}
				</Text>

				<Button size="large" variant="primary" destructive={false} fullWidth={false}>
					{t(Guru.NEW_BANNER_BUTTON)}
				</Button>
			</div>
		</Card>
	);
};
