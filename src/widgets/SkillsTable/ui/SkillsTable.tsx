import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Icon, Popover, Button, IconButton } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Skills, Translation } from '@/shared/config/i18n/i18nTranslations';
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

	const [openPopovers, setOpenPopovers] = useState<number | null>(null);

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
		const openActions = () => {
			setOpenPopovers(skill.id);
		};

		const closeActions = () => {
			setOpenPopovers(null);
		};
		return (
			<Flex gap="4">
				<Popover
					placement="bottom-start"
					body={
						<div>
							<NavLink to={`/admin/skills/${skill.id}`}>
								<Flex align="center" gap="4">
									<Button
										style={{ width: 'auto' }}
										aria-label="Large"
										preffix={<Icon icon="eye" size={20} color={'--palette-ui-purple-700'} />}
										theme="tertiary"
									>
										{t(Translation.SHOW, { ns: i18Namespace.translation })}
									</Button>
								</Flex>
							</NavLink>
							<NavLink to={`/admin/skills/${skill.id}/edit`}>
								<Flex align="center" gap="4">
									<Button
										style={{ width: 'auto' }}
										aria-label="Large"
										preffix={<Icon icon="pencil" size={20} color={'--palette-ui-purple-700'} />}
										theme="tertiary"
									>
										{t(Translation.EDIT, { ns: i18Namespace.translation })}
									</Button>
								</Flex>
							</NavLink>
							<DeleteSkillButton skillId={skill.id} />
						</div>
					}
					isOpen={openPopovers === skill.id}
					onClickOutside={closeActions}
				>
					<div>
						<IconButton
							theme="tertiary"
							onClick={openActions}
							aria-label="Large"
							icon={<Icon icon="dotsThreeVertical" size={20} />}
						/>
					</div>
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
		/>
	);
};
