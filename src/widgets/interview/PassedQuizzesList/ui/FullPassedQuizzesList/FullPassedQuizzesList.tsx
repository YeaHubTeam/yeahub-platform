import { MutableRefObject, useRef } from 'react';

import { useInfiniteScroll } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import type { QuizWithoutQuestions } from '@/entities/quiz';

import { FullPassedQuizzesItem } from '../FullPassedQuizzesItem/FullPassedQuizzesItem';

interface FullPassedQuizzesListProps {
	data: QuizWithoutQuestions[];
	onLoadNext: () => void;
}

export const FullPassedQuizzesList = ({ data, onLoadNext }: FullPassedQuizzesListProps) => {
	const lastItemRef = useRef() as MutableRefObject<HTMLElement>;
	useInfiniteScroll({ callback: onLoadNext, lastItemRef });

	return (
		<Flex componentType="ul" direction="column" maxWidth gap="20">
			{data.map((interview, index) => (
				<FullPassedQuizzesItem
					key={interview.id}
					interview={interview}
					itemRef={data.length === index + 1 ? lastItemRef : null}
				/>
			))}
		</Flex>
	);
};
