import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { TextEditor } from '@/shared/ui/TextEditor';

import { ProfileSchema } from '../../model/types/editProfileTypes';

import styles from './AboutMeTabForm.module.css';

export const AboutMeTabForm = () => {
	const { t } = useTranslation(i18Namespace.profile);
	const { control } = useFormContext<ProfileSchema>();

	return (
		<Flex className={styles.container} gap="20">
			<FormField description={t(Profile.ABOUT_ME_DESCRIPTION)} label={t(Profile.ABOUT_ME_TITLE)}>
				<div className={styles['textarea-container']}>
					<FormControl name="aboutMe" control={control}>
						{(field) => (
							<TextEditor
								id="aboutMe"
								isInline
								data={field.value}
								onChange={(value) => field.onChange(value)}
								onBlur={field.onBlur}
							/>
						)}
					</FormControl>
				</div>
			</FormField>
		</Flex>
	);
};
