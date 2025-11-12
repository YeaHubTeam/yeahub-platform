import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import { PopularQuestionStat, useGetPopularQuestionsQuery } from '@/entities/question';
import { SpecializationSelect } from '@/entities/specialization';

import { PopularQuestionsList } from '../PopularQuestionsList/PopularQuestionsList';
import { PopularQuestionsPagePagination } from '../PopularQuestionsPagePagination/PopularQuestionsPagePagination';
import { PopularQuestionsPageTable } from '../PopularQuestionsPageTable/PopularQuestionsPageTable';

import styles from './PopularQuestionsPage.module.css';

export const PopularQuestionsPage = () => {
	const DATA_LIMIT_IN_PAGE = 6;
	const { t } = useTranslation(i18Namespace.analytics);
	const { isMobile } = useScreenSize();
	const [selectedSpecialization, setSelectedSpecialization] = useState<null | number>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useGetPopularQuestionsQuery();

	const popularQuestionsByAllSpecializations = data?.reduce<PopularQuestionStat[]>(
		(accum, item) => [...accum, ...item.topStat],
		[],
	);
	const popularQuestionsBySpecialization = data?.find(
		(item) => item.specializationId === selectedSpecialization,
	);
	const popularQuestions =
		selectedSpecialization === null
			? popularQuestionsByAllSpecializations
			: popularQuestionsBySpecialization?.topStat;
	const popularQuestionsInPage =
		popularQuestions?.slice(
			DATA_LIMIT_IN_PAGE * (currentPage - 1),
			DATA_LIMIT_IN_PAGE * currentPage,
		) || [];

	const onSelectSpecialization = (id: number | number[]) => {
		const value = Array.isArray(id) ? id[0] : id;
		setSelectedSpecialization(value);
		setCurrentPage(1);
	};

	return (
		<Card>
			<Flex className={styles.header} justify="between">
				<Text variant={isMobile ? 'body5-accent' : 'body6'} isMainTitle>
					{t(Analytics.POPULAR_QUESTIONS_TITLE)}
				</Text>
				<Tooltip
					title={t(Analytics.POPULAR_QUESTIONS_TOOLTIP)}
					offsetTooltip={7}
					placement="bottom"
					color="violet"
				>
					<Icon icon="info" size={20} color="black-600" />
				</Tooltip>
			</Flex>
			<Flex
				className={styles['dropdown-container']}
				direction={isMobile ? 'column' : 'row'}
				align={isMobile ? 'center' : 'start'}
			>
				<SpecializationSelect
					onChange={onSelectSpecialization}
					value={selectedSpecialization || 0}
					disabled={isLoading}
				/>
			</Flex>
			{isMobile ? (
				<PopularQuestionsList popularQuestions={popularQuestionsInPage} />
			) : (
				<PopularQuestionsPageTable popularQuestions={popularQuestionsInPage} />
			)}
			<PopularQuestionsPagePagination
				popularQuestions={popularQuestions}
				currentPage={currentPage}
				onChangePage={(page) => setCurrentPage(page)}
				limit={DATA_LIMIT_IN_PAGE}
			/>
		</Card>
	);
};
