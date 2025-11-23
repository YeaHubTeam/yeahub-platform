import React from 'react';

import { useScreenSize } from '@/shared/hooks';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { PaginationSkeleton } from '@/shared/ui/Pagination';
import { TableSkeleton } from '@/shared/ui/Table';
import { TextSkeleton } from '@/shared/ui/Text';

import { SpecializationSelectSkeleton } from '@/entities/specialization';

export const AnalyticsPageSkeleton = () => {
	const { isMobile } = useScreenSize();
	return (
		<CardSkeleton>
			<Flex direction="column" gap="24">
				<TextSkeleton width={isMobile ? 'auto' : '550px'} variant={'body3'} />

				<Flex direction="column" gap="20">
					<Flex justify="between" direction={isMobile ? 'column' : 'row'} gap="24">
						<SpecializationSelectSkeleton />
						<Flex gap="14" direction={isMobile ? 'column' : 'row'}>
							<ButtonSkeleton width={isMobile ? undefined : 146} />
							<ButtonSkeleton width={isMobile ? undefined : 146} />
						</Flex>
					</Flex>
					<Flex align="center" direction="column" gap="20">
						<TableSkeleton columnCount={1} />
						<PaginationSkeleton />
					</Flex>
				</Flex>
			</Flex>
		</CardSkeleton>
	);
};
