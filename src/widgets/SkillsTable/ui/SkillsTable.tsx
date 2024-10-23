import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Text, Icon } from 'yeahub-ui-kit';

import { Skills } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { Table } from '@/shared/ui/Table';

import { Skill } from '@/entities/skill';

import { DeleteSkillButton } from '@/features/skill/deleteSkill';

interface SkillsTableProps {
	skills?: Skill[];
	selectedSkills?: number[];
	onSelectSkills?: (ids: number[]) => void;
}

export const SkillsTable = ({ skills, selectedSkills, onSelectSkills }: SkillsTableProps) => {
	const { t } = useTranslation('skill');

	const renderTableHeader = () => {
		const columns = {
			title: t(Skills.TITLE),
			description: t(Skills.DESCRIPTION),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (skill: Skill) => {
		const columns = {
			title: skill.title,
			description: skill.description,
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderActions = (skill: Skill) => {
		return (
			<Flex gap="4">
				<NavLink to={`/admin/skills/${skill.id}`}>
					<Icon icon="eye" size={20} color={'--palette-ui-purple-700'} />
				</NavLink>
				<NavLink to={`/admin/skills/${skill.id}/edit`}>
					<Icon icon="pencil" size={20} color={'--palette-ui-purple-700'} />
				</NavLink>
				<DeleteSkillButton skillId={skill.id} />
			</Flex>
		);
	};

	if (!skills) {
		return (
			<Flex maxHeight align="center" justify="center">
				<Text title={t(Skills.NOT_ITEMS)} />
			</Flex>
		);
	}

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderActions={renderActions}
			items={skills}
			selectedItems={selectedSkills}
			onSelectItems={onSelectSkills}
		/>
	);
};
