import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace, Translation, ROUTES, Skills } from '@/shared/config';
import { route } from '@/shared/libs';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { SkillCard, useGetSkillByIdQuery } from '@/entities/skill';

import { DeleteSkillButton } from '@/features/skill/deleteSkill';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const SkillDetailPage = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { t: tSkill } = useTranslation(i18Namespace.skill);
	const { skillId } = useParams<{ skillId: string }>();

	const { data: skill, isLoading, isError, refetch } = useGetSkillByIdQuery({ skillId: skillId! });

	// ДОБАВЛЕНА ПРОВЕРКА ДЛЯ ОБЪЕКТА
	const isSkillEmpty = !skill || Object.keys(skill).length === 0;

	const stubs: PageWrapperStubs = {
		empty: {
			title: tSkill(Skills.STUB_EMPTY_SKILL_TITLE),
			subtitle: tSkill(Skills.STUB_EMPTY_SKILL_SUBTITLE),
			buttonText: tSkill(Skills.STUB_EMPTY_SKILL_SUBMIT),
			onClick: refetch,
		},
		error: {
			onClick: refetch,
		},
	};

	// ТЕПЕРЬ ИСПОЛЬЗУЕМ isSkillEmpty ДЛЯ ОТРИСОВКИ КОНТЕНТА
	const content = !isSkillEmpty ? (
		<main>
			<Flex align="center" justify="between" gap="8" style={{ marginBottom: 34 }}>
				<BackButton />

				<Flex gap="16">
					<DeleteSkillButton skillId={skill.id} isDetailPage />
					<NavLink to={route(ROUTES.admin.skills.edit.page, skill.id)}>
						<Button>{t(Translation.EDIT)}</Button>
					</NavLink>
				</Flex>
			</Flex>
			<SkillCard skill={skill} />
		</main>
	) : null;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={!isSkillEmpty} // ПЕРЕДАЕМ ПРАВИЛЬНЫЙ ФЛАГ СЮДА
			roles={['admin', 'author']}
			stubs={stubs}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default SkillDetailPage;
