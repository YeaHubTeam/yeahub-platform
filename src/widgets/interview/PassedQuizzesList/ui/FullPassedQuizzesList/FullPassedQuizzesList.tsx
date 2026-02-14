import { MutableRefObject, useRef } from 'react';

import { useInfiniteScroll } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { QuizWithoutQuestions } from '@/entities/quiz';

import { FullPassedQuizzesItem } from '../FullPassedQuizzesItem/FullPassedQuizzesItem';

interface InterviewHistoryProps {
	interviews: QuizWithoutQuestions[];
	onLoadNext: () => void;
}

export const FullPassedQuizzesList = ({ interviews, onLoadNext }: InterviewHistoryProps) => {
	const lastItemRef = useRef() as MutableRefObject<HTMLElement>;

	useInfiniteScroll({ callback: onLoadNext, lastItemRef });

	return (
		<Flex componentType="ul" direction="column" maxWidth gap="20">
			{interviews.map((interview, index) => (
				<FullPassedQuizzesItem
					key={interview.id}
					interview={interview}
					itemRef={interviews.length === index + 1 ? lastItemRef : null}
				/>
			))}
		</Flex>
	);
};
