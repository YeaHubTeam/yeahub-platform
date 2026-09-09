import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './ResumeProgressBar.module.css';

interface ResumeProgressBarProps {
	value: number;
}

export const ResumeProgressBar = ({ value }: ResumeProgressBarProps) => {
	const labels = ['0%', '50%', '100%'];

	return (
		<Flex direction="column" gap="10">
			<div className={styles.track}>
				<div className={styles.fill} style={{ '--progress': `${value}%` } as React.CSSProperties} />
			</div>

			<Flex justify="between">
				{labels.map((label) => (
					<Text key={label} variant="body5" color="black-500">
						{label}
					</Text>
				))}
			</Flex>
		</Flex>
	);
};
