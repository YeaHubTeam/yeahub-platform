import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { useAppDispatch, useAppSelector, useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import { getSpecializationId } from '@/entities/profile';
import { useGetMostDifficultQuestionsBySpecializationIdQuery } from '@/entities/question';
import { SpecializationSelect } from '@/entities/specialization';

import { getDifficultQuestionsFilters } from '../../model/selectors/difficultQuestionsPageSelectors';
import { difficultQuestionsActions } from '../../model/slices/difficultQuestionsPageSlice';
import { DifficultQuestionsList } from '../DifficultQuestionsList/DifficultQuestionsList';
import { DifficultQuestionsTable } from '../DifficultQuestionsTable/DifficultQuestionsTable';

import styles from './DifficultQuestionsPage.module.css';

export const DifficultQuestionsPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const { isMobile } = useScreenSize();
	const dispatch = useAppDispatch();

	const profileSpecialization = useAppSelector(getSpecializationId);

	const { selectedSpecialization = profileSpecialization } = useAppSelector(
		getDifficultQuestionsFilters,
	);

	const { data: response } =
		useGetMostDifficultQuestionsBySpecializationIdQuery(selectedSpecialization);

	const onSelectSpecialization = (id: number | number[]) => {
		const value = Array.isArray(id) ? id[0] : id;
		dispatch(difficultQuestionsActions.setSelectedSpecialization(value));
	};

	const difficultQuestions = response?.topStat ?? [];

	useEffect(() => {
		return () => {
			dispatch(difficultQuestionsActions.resetSelectedSpecialization());
		};
	}, []);

	return (
		<Card>
			<Flex justify="between" className={styles.header}>
				<Text variant={isMobile ? 'body5-accent' : 'body6'} isMainTitle>
					{t(Analytics.MOST_DIFFICULT_QUESTIONS_PAGE_TITLE, {
						text: response?.specialization.title,
					})}
				</Text>
				<Tooltip
					className={styles.tooltip}
					title={t(Analytics.MOST_DIFFICULT_QUESTIONS_TOOLTIP)}
					offsetTooltip={7}
					placement="bottom"
					color="violet"
					titleVariant="body2"
				>
					<Icon icon="info" size={20} color="black-600" />
				</Tooltip>
			</Flex>
			<Flex className={styles['dropdown-container']}>
				<SpecializationSelect
					onChange={onSelectSpecialization}
					value={selectedSpecialization || 0}
				/>
			</Flex>
			{isMobile ? (
				<DifficultQuestionsList difficultQuestions={difficultQuestions} />
			) : (
				<DifficultQuestionsTable difficultQuestions={difficultQuestions} />
			)}
		</Card>
	);
};
