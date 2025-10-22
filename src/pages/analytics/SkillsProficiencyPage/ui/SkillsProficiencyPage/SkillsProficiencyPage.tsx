import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import { useGetLearnedQuestionsQuery } from '@/entities/question';
import { Skill, useGetSkillsListQuery } from '@/entities/skill';
import { Specialization, useGetSpecializationsListQuery } from '@/entities/specialization';

import { SkillsProficiencyPageTable } from '../SkillsProficiencyPageTable/SkillsProficiencyPageTable';

import styles from './SkillsProficiencyPage.module.css';

export const SkillsProficiencyPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const { isMobile } = useScreenSize();

	const [selectedSpecialization, setSelectedSpecialization] = useState(0);
	const [selectedSkill, setSelectedSkill] = useState(0);

	const { data: specializations, isLoading: specializationsLoading } =
		useGetSpecializationsListQuery({ limit: 100 });
	const { data: skills, isLoading: skillsLoading } = useGetSkillsListQuery({ limit: 100 });
	const { data: response } = useGetLearnedQuestionsQuery({
		page: 1,
		limit: 6,
		specializationId: selectedSpecialization || undefined,
		skillId: selectedSkill || undefined,
	});
	const learnedQuestions = response?.data ?? [];

	const specializationOptions = useMemo(() => {
		return (specializations?.data || []).map((specialization) => ({
			label: specialization.title,
			value: specialization.id.toString(),
			limit: 100,
		}));
	}, [specializations]);

	const specializationsDictionary = useMemo(() => {
		const emptySpecialization: Specialization = {
			id: 0,
			title: t(Analytics.SKILL_PROFICIENCY_SKILL_SPECIALIZATION_CHOOSE),
			imageSrc: null,
			description: '',
		};
		return (specializations?.data || []).reduce(
			(acc, specialization) => {
				acc[specialization.id] = specialization;
				return acc;
			},
			{ 0: emptySpecialization } as Record<number, Specialization>,
		);
	}, [specializations]);

	const skillOptions = useMemo(() => {
		return (skills?.data || []).map((skill) => ({
			label: skill.title,
			value: skill.id.toString(),
			limit: 100,
		}));
	}, [skills]);

	const skillsDictionary = useMemo(() => {
		const emptySkills: Skill = {
			id: 0,
			title: t(Analytics.SKILL_PROFICIENCY_SKILL_SELECT_CHOOSE),
			imageSrc: null,
			description: '',
		};
		return (skills?.data || []).reduce(
			(acc, skill) => {
				acc[skill.id] = skill;
				return acc;
			},
			{ 0: emptySkills } as Record<string, Skill>,
		);
	}, [skills]);

	if (!learnedQuestions.length) {
		return null;
	}

	return (
		<Card className={styles.content}>
			<Flex className={styles.header} justify="between">
				<Text variant={isMobile ? 'body5-accent' : 'body6'} isMainTitle>
					{t(Analytics.SKILL_PROFICIENCY_TITLE)}
				</Text>
				<Tooltip
					className={styles.tooltip}
					title={t(Analytics.SKILL_PROFICIENCY_TOOLTIP)}
					offsetTooltip={7}
					placement="bottom"
					color="violet"
				>
					<Icon icon="info" size={20} color="black-600" />
				</Tooltip>
			</Flex>
			<Flex
				gap="14"
				className={styles['dropdown-container']}
				direction={isMobile ? 'column' : 'row'}
				align={isMobile ? 'center' : 'start'}
			>
				<Dropdown
					size="S"
					value={specializationsDictionary[selectedSpecialization || 0]?.title ?? ''}
					onSelect={(value) => setSelectedSpecialization(Number(value))}
					disabled={specializationsLoading}
					width={isMobile ? '100%' : 'auto'}
				>
					{specializationOptions.map((option) => (
						<Option value={option.value} label={option.label} key={option.label} />
					))}
				</Dropdown>

				<Dropdown
					size="S"
					value={skillsDictionary[selectedSkill || 0]?.title ?? ''}
					onSelect={(value) => setSelectedSkill(Number(value))}
					disabled={skillsLoading}
					width={isMobile ? '100%' : 'auto'}
				>
					{skillOptions.map((option) => (
						<Option value={option.value} label={option.label} key={option.label} />
					))}
				</Dropdown>
			</Flex>
			<SkillsProficiencyPageTable items={learnedQuestions} />
		</Card>
	);
};
