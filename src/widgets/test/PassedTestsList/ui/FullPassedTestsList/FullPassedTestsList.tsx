import { useRef } from 'react';

import { useInfiniteScroll } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import type { TestHistoryItem } from '@/entities/test';

import { FullPassedTestsItem } from '../FullPassedTestsItem/FullPassedTestsItem';

interface FullPassedTestsListProps {
	data: TestHistoryItem[];
	onLoadNext: () => void;
}

export const FullPassedTestsList = ({ data, onLoadNext }: FullPassedTestsListProps) => {
	const lastItemRef = useRef<HTMLLIElement>(null);
	useInfiniteScroll({ callback: onLoadNext, lastItemRef });

	return (
		<Flex componentType="ul" direction="column" maxWidth gap="20">
			{data.map((test, index) => (
				<FullPassedTestsItem
					key={test.id}
					test={test}
					itemRef={data.length === index + 1 ? lastItemRef : null}
				/>
			))}
		</Flex>
	);
};
