import { useTranslation } from 'react-i18next';

import { quizCardPreview } from '@/shared/assets';
import Vector from '@/shared/assets/icons/vector.svg';
import { i18Namespace, InterviewQuiz as InterviewQuiz18 } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './PreviewInactiveQuiz.module.css';

interface quizSetupListProps {
	id: string;
	title: string;
}

export const PreviewInactiveQuiz = () => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);
	const { isMobile } = useScreenSize();

	const quizSetupList: quizSetupListProps[] = [
		{
			id: '1.',
			title: t(InterviewQuiz18.START_QUIZ_SETUP_LIST_FIRST),
		},
		{
			id: '2.',
			title: t(InterviewQuiz18.START_QUIZ_SETUP_LIST_SECOND),
		},
		{
			id: '3.',
			title: t(InterviewQuiz18.START_QUIZ_SETUP_LIST_THIRD),
		},
		{
			id: '4.',
			title: t(InterviewQuiz18.START_QUIZ_SETUP_LIST_FOURTH),
		},
	];

	return (
		<Flex gap={'20'} className={styles['preparation-empty']}>
			<div className={styles['inactive-description']}>
				<div className={styles['inactive-title']}>
					<Vector className={styles['vector-icon']} />
					<Text variant="body4">{t(InterviewQuiz18.START_QUIZ_TITLE)}</Text>
				</div>
				<Flex direction={'column'} gap={'20'}>
					<Text variant={'body3-accent'}>{t(InterviewQuiz18.START_QUIZ_DESCRIPTION)}</Text>
					<Flex componentType="ul" gap="16" direction={'column'} wrap="nowrap">
						{quizSetupList.map(({ id, title }) => (
							<Flex key={id} gap="10">
								<Text variant="body4">{id}</Text>
								<Text variant="body3-accent">{title}</Text>
							</Flex>
						))}
					</Flex>
				</Flex>
			</div>
			{!isMobile && (
				<img
					className={styles['preparation-noactiveimage']}
					src={quizCardPreview}
					alt="no active quiz"
					loading="lazy"
				/>
			)}
		</Flex>
	);
};
