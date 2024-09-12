import { useFormContext } from 'react-hook-form';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { FormControl } from '@/shared/ui/FormControl';

import { HorizontalContainer, VerticalContainer } from '../CommonElements';
import { SkillSelect } from '../SkillSelect/SkillSelect';

import style from './SkillsForm.module.css';

export const SkillsForm = () => {
	const { t } = useI18nHelpers(i18Namespace.profile);
	const { control } = useFormContext();

	return (
		<>
			<VerticalContainer>
				<HorizontalContainer>
					<div className={style.description}>
						<h3>{t('skillForm.yourSkills')}</h3>
						<p>{t('skillForm.yourSkillsText')}</p>
					</div>
					<FormControl name="skills" control={control}>
						{({ onChange, value }) => <SkillSelect onChange={onChange} value={value} />}
					</FormControl>
				</HorizontalContainer>
			</VerticalContainer>
			<div className={style['btn-container']}>
				<Button type="submit">{t('skillForm.submitButtonText')}</Button>
			</div>
		</>
	);
};
