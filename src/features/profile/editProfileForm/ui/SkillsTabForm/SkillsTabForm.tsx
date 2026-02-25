import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Profile } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';

import { SkillSelect } from '@/entities/skill';

import { ProfileSchema } from '../../model/types/editProfileTypes';

import styles from './SkillsTabForm.module.css';

export const SkillsTabForm = () => {
	const { t } = useTranslation(i18Namespace.profile);
	const { control } = useFormContext<ProfileSchema>();

	return (
		<Flex className={styles.container} gap="20">
			<FormField description={t(Profile.SKILLS_DESCRIPTION)} label={t(Profile.SKILLS_TITLE)}>
				<FormControl name="skills" control={control} label={t(Profile.FORM_SKILLS)}>
					{({ onChange, value }) => (
						<SkillSelect withSpecialization={false} onChange={onChange} value={value} />
					)}
				</FormControl>
			</FormField>
		</Flex>
	);
};
