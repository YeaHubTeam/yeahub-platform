import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { Skills, Translation, i18Namespace, ROUTES } from '@/shared/config';
import { route, SelectedAdminEntities } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { Skill } from '@/entities/skill';

import { DeleteSkillButton } from '@/features/skill/deleteSkill';

import styles from './SkillsTable.module.css';

interface SkillsTableProps {
	skills?: Skill[];
	selectedSkills?: SelectedAdminEntities;
	onSelectSkills?: (ids: SelectedAdminEntities) => void;
}

export const SkillsTable = ({ skills, selectedSkills, onSelectSkills }: SkillsTableProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation([i18Namespace.skill, i18Namespace.translation]);

	const renderTableColumnWidths = () => {
		const columnWidths = {
			title: '20%',
			description: 'auto',
		};

		return Object.values(columnWidths)?.map((width, idx) => <col key={idx} style={{ width }} />);
	};

	const renderTableHeader = () => {
		const columns = {
			title: t(Skills.TITLE_SHORT),
			description: t(Skills.DESCRIPTION_SHORT),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (skill: Skill) => {
		const columns = {
			title: skill.title,
			description: skill.description,
		};

		return Object.entries(columns)?.map(([k, v]) => (
			<td key={k} className={k === 'description' ? styles.description : undefined}>
				{k === 'title' ? (
					<Link to={route(ROUTES.admin.skills.detail.page, skill.id)}>
						<Text variant="body3-accent">{v}</Text>
					</Link>
				) : (
					<Text variant="body3-accent">{v}</Text>
				)}
			</td>
		));
	};

	const renderActions = (skill: Skill) => {
		const menuItems: PopoverMenuItem[] = [
			{
				icon: <Icon icon="eye" size={24} />,
				title: t(Translation.SHOW, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.skills.detail.page, skill.id));
				},
			},
			{
				icon: <Icon icon="pen" size={24} />,
				title: t(Translation.EDIT, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.skills.edit.page, skill.id));
				},
			},
			{
				renderComponent: () => <DeleteSkillButton skillId={skill.id} />,
			},
		];

		return (
			<Flex gap="4">
				<Popover menuItems={menuItems}>
					{({ onToggle }) => (
						<IconButton
							aria-label="go to details"
							form="square"
							icon={<Icon icon="dotsThreeVertical" />}
							size="medium"
							variant="tertiary"
							onClick={onToggle}
						/>
					)}
				</Popover>
			</Flex>
		);
	};

	if (!skills) {
		return null;
	}

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderActions={renderActions}
			items={skills}
			selectedItems={selectedSkills}
			onSelectItems={onSelectSkills}
			renderTableColumnWidths={renderTableColumnWidths}
			hasCopyButton
		/>
	);
};
