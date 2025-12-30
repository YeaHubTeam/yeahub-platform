import { Link } from 'react-router-dom';

import { useCurrentProject, useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import { getQuestionRoute } from '../../lib/getQuestionRoute';
import { QuestionGradeList } from '../QuestionGradeList/QuestionGradeList';

import styles from './PreviewQuestionsItem.module.css';

interface PreviewQuestionsItemProps {
	title: string;
	questionId: number;
	rate?: number;
	complexity?: number;
	frequency?: number;
	imageSrc?: string;
}

export const PreviewQuestionsItem = ({
	title,
	questionId,
	rate,
	complexity,
	frequency,
	imageSrc,
}: PreviewQuestionsItemProps) => {
	const { isMobileS } = useScreenSize();
	const project = useCurrentProject();
	const questionRoute = getQuestionRoute[project](questionId);

	return (
		<li>
			<Card withOutsideShadow size="small">
				<Link to={questionRoute} className={styles.link}>
					{!isMobileS && imageSrc && <ImageWithWrapper src={imageSrc} className={styles.image} />}
					<Flex direction="column" gap="8">
						<Text variant="body3-accent" maxRows={1} className={styles.title}>
							{title}
						</Text>
						<QuestionGradeList
							rate={rate}
							complexity={complexity}
							className={styles.params}
							frequency={frequency}
							size="small"
						/>
					</Flex>
				</Link>
			</Card>
		</li>
	);
};
