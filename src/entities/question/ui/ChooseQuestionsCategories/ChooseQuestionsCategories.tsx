import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Button } from '@/shared/ui/Button';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { getSkillDefaultIcon, Skill, useGetSkillsListQuery } from '@/entities/skill';

import styles from './ChooseQuestionsCategories.module.css';

const MAX_LIMIT = 5;

interface ChooseQuestionsCategoriesProps {
	selectedSkills?: number[];
	onChangeSkills: (skills: number[] | undefined) => void;
	skillsLimit?: number;
	shouldShowScroll?: boolean;
}

export const ChooseQuestionsCategories = ({
	selectedSkills,
	onChangeSkills,
	skillsLimit,
}: ChooseQuestionsCategoriesProps) => {
	const [showAll, setShowAll] = useState(false);
	const [limit, setLimit] = useState(skillsLimit || MAX_LIMIT);
	const { data: skills } = useGetSkillsListQuery({ limit });
	const { t } = useTranslation(i18Namespace.questions);
	const { isMobile } = useScreenSize();

	const toggleShowAll = () => {
		setShowAll(!showAll);
	};

	useEffect(() => {
		if (isMobile || showAll) {
			setLimit(skills?.total ?? (skillsLimit || MAX_LIMIT));
		} else {
			setLimit(skillsLimit || MAX_LIMIT);
		}
	}, [skills?.total, showAll, skillsLimit]);

	const onChooseSkill = (id: number) => {
		if (selectedSkills?.includes(id)) {
			const filtredSkills = selectedSkills.filter((skill) => skill !== id);
			onChangeSkills(filtredSkills.length > 0 ? filtredSkills : undefined);
		} else {
			onChangeSkills([...(selectedSkills || []), id]);
		}
	};

	const prepareData = skills?.data.map((skill) => ({
		...skill,
		active: selectedSkills?.includes(skill.id),
	}));

	if (!prepareData) return null;

	const skillIcon = (skill: Skill) => <Icon icon={getSkillDefaultIcon(skill)} />;

	return (
		<div className={classNames(styles.wrapper, { [styles.mobile]: isMobile })}>
			<BaseFilterSection
				data={prepareData}
				title={t(Questions.CATEGORIES_TITLE)}
				onClick={onChooseSkill}
				getDefaultIcon={(item) => skillIcon(item as Skill)}
			/>
			{!isMobile && (
				<Button className={styles.button} variant="link" onClick={toggleShowAll}>
					{!showAll ? t(Questions.CATEGORIES_SHOW_ALL) : t(Questions.CATEGORIES_HIDE)}
				</Button>
			)}
		</div>
	);
};
