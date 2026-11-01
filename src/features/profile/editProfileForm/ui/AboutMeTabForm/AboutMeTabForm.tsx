import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Profile } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { FormInputEditor } from '@/shared/ui/Form';

import { ProfileSchema } from '../../model/types/editProfileTypes';

import styles from './AboutMeTabForm.module.css';

export const AboutMeTabForm = () => {
	const { t } = useTranslation(i18Namespace.profile);
	const { control } = useFormContext<ProfileSchema>();

	return (
		<Flex className={styles.container} gap="20">
			<FormInputEditor
				fieldProps={{
					label: t(Profile.ABOUT_ME_TITLE),
					description: t(Profile.ABOUT_ME_DESCRIPTION),
					direction: 'row',
				}}
				controlProps={{
					name: 'aboutMe',
					control,
				}}
				textEditorProps={{
					id: 'aboutMe',
					isInline: true,
				}}
				wrapperDivClassName={styles['textarea-container']}
				onChange
				onBlur
			/>
		</Flex>
	);
};
