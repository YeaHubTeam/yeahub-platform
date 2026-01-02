import React from 'react';

import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { SpecializationSelect } from '@/entities/specialization';

import type { HhAnalyticsMode } from '../../model/types/filters';
import { HhAnalyticsModeTabs } from '../HhAnalyticsModeTabs/HhAnalyticsModeTabs';

type HhAnalyticsFiltersProps = {
	specializationId: number;
	mode: HhAnalyticsMode;
	onChangeSpecialization: (specializationId: number) => void;
	onChangeMode: (mode: HhAnalyticsMode) => void;
};

export const HhAnalyticsFilters = ({
	onChangeSpecialization,
	specializationId,
	mode,
	onChangeMode,
}: HhAnalyticsFiltersProps) => {
	const { isMobile } = useScreenSize();

	const handleChangeSpecialization = (newSpecializationId: number | number[]) => {
		const value = Array.isArray(newSpecializationId) ? newSpecializationId[0] : newSpecializationId;

		onChangeSpecialization(value);
	};

	return (
		<Flex justify="between" direction={isMobile ? 'column' : 'row'} gap="24">
			<SpecializationSelect
				prefix={' '}
				value={specializationId}
				onChange={handleChangeSpecialization}
			/>

			<HhAnalyticsModeTabs mode={mode} onChange={onChangeMode} />
		</Flex>
	);
};
