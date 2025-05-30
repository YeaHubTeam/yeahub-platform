import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions, Skills } from '@/shared/config/i18n/i18nTranslations';
import { MAX_LIMIT_CATEGORIES } from '@/shared/constants/queryConstants';
import { useScreenSize } from '@/shared/hooks';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Button } from '@/shared/ui/Button';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetSkillsListQuery } from '@/entities/skill';

import styles from './ChooseQuestionsCategories.module.css';

interface ChooseQuestionsCategoriesProps {
	selectedSkills?: number[];
	onChangeSkills: (skills: number[] | undefined) => void;
	skillsLimit?: number;
	shouldShowScroll?: boolean;
	selectedSpecialization: number;
	showAllLabel?: boolean;
}

export const ChooseQuestionsCategories = ({
	selectedSkills,
	onChangeSkills,
	skillsLimit,
	selectedSpecialization,
	showAllLabel = true,
}: ChooseQuestionsCategoriesProps) => {
	const [showAll, setShowAll] = useState(false);
	const [limit, setLimit] = useState(skillsLimit || MAX_LIMIT_CATEGORIES);

	const { data: skills } = useGetSkillsListQuery({
		limit,
		specializations: [selectedSpecialization],
	});
	const { t } = useTranslation([i18Namespace.questions, i18Namespace.skill]);
	const { isMobile } = useScreenSize();

	const toggleShowAll = () => {
		setShowAll(!showAll);
	};

	useEffect(() => {
		if (isMobile || showAll) {
			setLimit(skills?.total ?? (skillsLimit || MAX_LIMIT_CATEGORIES));
		} else {
			setLimit(skillsLimit || MAX_LIMIT_CATEGORIES);
		}
	}, [skills?.total, showAll, skillsLimit]);

	const onChooseSkill = (id: number) => {
		if (selectedSkills?.includes(id)) {
			const filteredSkills = selectedSkills.filter((skill) => skill !== id);
			onChangeSkills(filteredSkills.length > 0 ? filteredSkills : undefined);
		} else {
			onChangeSkills([...(selectedSkills || []), id]);
		}
	};

	const prepareData = skills?.data.map((skill) => ({
		...skill,
		active: selectedSkills?.includes(skill.id),
	}));

	if (!prepareData) return null;

	return (
		<div className={classNames(styles.wrapper)}>
			<BaseFilterSection
				data={prepareData}
				title={t(Skills.SELECT_CHOOSE, { ns: i18Namespace.skill })}
				onClick={onChooseSkill}
			/>

			{!isMobile && showAllLabel && (
				<Button className={styles.button} variant="link" onClick={toggleShowAll}>
					{!showAll ? t(Questions.CATEGORIES_SHOW_ALL) : t(Questions.CATEGORIES_HIDE)}
				</Button>
			)}
		</div>
	);
};
