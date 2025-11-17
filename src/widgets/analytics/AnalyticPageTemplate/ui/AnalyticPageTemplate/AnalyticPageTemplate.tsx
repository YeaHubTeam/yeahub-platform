import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { TablePagination } from '@/shared/ui/TablePagination';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import { SkillSelect } from '@/entities/skill';
import { SpecializationSelect } from '@/entities/specialization';

import styles from './AnalyticPageTemplate.module.css';

interface AnalyticPageTemplateFilters {
	specialization?: number;
	skill?: number;
	page?: number;
	total?: number;
	limit?: number;
	hasFilters?: boolean;
	onChangeSpecialization: (specialization: number) => void;
	onChangeSkill?: (skill?: number) => void;
	onChangePage?: (page: number) => void;
	onResetFilters?: () => void;
}

interface AnalyticPageTemplateProps {
	title: string;
	tooltip?: string;
	list: ReactNode;
	table: ReactNode;
	filters: AnalyticPageTemplateFilters;
}

export const AnalyticPageTemplate = ({
	title,
	tooltip,
	table,
	list,
	filters,
}: AnalyticPageTemplateProps) => {
	const {
		specialization,
		skill,
		page,
		total,
		limit,
		hasFilters,
		onChangeSpecialization,
		onChangePage,
		onChangeSkill,
		onResetFilters,
	} = filters;

	const { t } = useTranslation(i18Namespace.translation);

	const onSelectSpecialization = (specializations: number[] | number) => {
		onChangeSpecialization(Array.isArray(specializations) ? specializations[0] : specializations);
	};

	const onSelectSkill = (skills?: number[]) => {
		onChangeSkill?.(skills?.[0]);
	};

	const { isMobile } = useScreenSize();

	return (
		<Card>
			<Flex className={styles.header} justify="between">
				<Text variant={isMobile ? 'body5-accent' : 'body6'} isMainTitle>
					{title}
				</Text>
				{tooltip && (
					<Tooltip
						className={styles.tooltip}
						title={tooltip}
						offsetTooltip={7}
						placement="bottom"
						color="violet"
					>
						<Icon icon="info" size={20} color="black-600" />
					</Tooltip>
				)}
			</Flex>
			<Flex
				gap="14"
				wrap="wrap"
				className={styles['dropdown-container']}
				direction={isMobile ? 'column' : 'row'}
			>
				<SpecializationSelect onChange={onSelectSpecialization} value={specialization || 0} />
				{onChangeSkill && (
					<SkillSelect
						onChange={onSelectSkill}
						value={skill || 0}
						selectedSpecializations={specialization ? [specialization] : []}
						hasMultiple={false}
						disabled={!specialization}
					/>
				)}
				{onResetFilters && hasFilters && (
					<Button size="large" onClick={onResetFilters} variant="outline">
						{t(Translation.STUB_FILTER_SUBMIT)}
					</Button>
				)}
			</Flex>
			{isMobile ? list : table}
			{page && total && limit && onChangePage ? (
				<TablePagination page={page} onChangePage={onChangePage} total={total} limit={limit} />
			) : null}
		</Card>
	);
};
