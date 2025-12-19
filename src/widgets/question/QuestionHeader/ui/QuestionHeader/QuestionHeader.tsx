import React from 'react';

import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import { Question, getQuestionImage } from '@/entities/question';

import { QuestionAdditionalInfoDrawer } from '../QuestionAdditionalInfoDrawer/QuestionAdditionalInfoDrawer';

import styles from './QuestionHeader.module.css';

interface QuestionHeaderProps {
	question: Question;
}

export const QuestionHeader = ({ question }: QuestionHeaderProps) => {
	const { isMobile, isTablet, isDesktop } = useScreenSize();
	const { title, description } = question;
	const imagePriorityToShow = getQuestionImage(question);

	const imageClassName = isMobile ? styles['image-mobile'] : styles['image-default'];

	return (
		<Card withOutsideShadow className={styles.header}>
			<Flex gap="10" direction={isMobile ? 'column' : 'row'}>
				{isDesktop && <ImageWithWrapper className={imageClassName} src={imagePriorityToShow} />}
				<Flex direction="column" gap="8" maxWidth>
					<Flex justify="between" align="start" gap="8" maxWidth>
						<Text
							variant={isMobile ? 'body5' : 'body6'}
							color="black-800"
							isMainTitle
							className={styles.title}
						>
							{title}
						</Text>
						{(isMobile || isTablet) && <QuestionAdditionalInfoDrawer question={question} />}
						{/*// TODO подумать куда добавить статус вопроса к моменту выпуска заявок*/}
						{/*{project === 'admin' && <QuestionStatusChip status={status} />}*/}
					</Flex>
					<Text variant="body3-accent" color="black-800">
						{description}
					</Text>
				</Flex>
			</Flex>
		</Card>
	);
};
