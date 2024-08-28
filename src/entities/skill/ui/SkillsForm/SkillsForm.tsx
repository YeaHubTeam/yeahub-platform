import { Controller, useFormContext } from 'react-hook-form';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { HorizontalContainer, VerticalContainer } from '../CommonElements';
import { SkillSelect } from '../SkillSelect/SkillSelect';

import style from './SkillsForm.module.css';

//todo добавить рендер ошибок при валидации, добавить интерфейс для формы

export const SkillsForm = () => {
	const { t } = useI18nHelpers(i18Namespace.profile);

	const {
		control,
		//formState: { errors },
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} = useFormContext<any>();

	return (
		<>
			<VerticalContainer>
				<HorizontalContainer>
					<div className={style.description}>
						<h3>{t('skillForm.yourSkills')}</h3>
						<p>{t('skillForm.yourSkillsText')}</p>
					</div>
					<Controller
						name="skills"
						control={control}
						render={({ field: { onChange, value } }) => (
							<SkillSelect onChange={onChange} value={value} />
						)}
					/>
				</HorizontalContainer>
			</VerticalContainer>
			<div className={style['btn-container']}>
				<Button type="submit">{t('skillForm.submitButtonText')}</Button>
			</div>
		</>
	);
};
