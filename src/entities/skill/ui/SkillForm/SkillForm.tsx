import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input, Text, TextArea } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Skills, Specializations } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SpecializationSelect } from '@/entities/specialization';

import styles from './SkillForm.module.css';

interface SkillFormProps {
	isEdit?: boolean;
}

export const SkillForm = ({ isEdit }: SkillFormProps) => {
	const { t } = useTranslation([i18Namespace.skill, i18Namespace.specialization]);

	const { control } = useFormContext();

	return (
		<Flex direction="column" gap="40">
			<Flex direction="column">
				<Text
					title={isEdit ? t(Skills.EDIT_PAGE_TITLE) : t(Skills.CREATE_PAGE_TITLE)}
					className={`${styles['title-base']} ${styles.title1}`}
				/>
				<Flex
					direction="row"
					style={{ marginTop: '60' }}
					className={`${styles['skills-input']}`}
					gap="120"
				>
					<Flex direction="column" gap="8">
						<Text
							title={t(Skills.TITLE_FULL)}
							className={`${styles['title-base']} ${styles.title2}`}
						/>
						<Text
							title={t(Skills.TITLE_LABEL)}
							className={`${styles['title-base']} ${styles.title3}`}
						/>
					</Flex>
					<FormControl name="title" control={control} className={`${styles['input-form']}`}>
						{(register, hasError) => <Input {...register} hasError={hasError} />}
					</FormControl>
				</Flex>
			</Flex>
			<Flex direction="row" className={`${styles['skills-select']}`} gap="120">
				<Flex direction="column" gap="8">
					<Text
						title={t(Specializations.TITLE_FULL, { ns: i18Namespace.specialization })}
						className={`${styles['title-base']} ${styles.title2}`}
					/>
					<Text
						title={t(Specializations.TITLE_LABEL, { ns: i18Namespace.specialization })}
						className={`${styles['title-base']} ${styles.title3}`}
					/>
				</Flex>
				<FormControl className={styles.select} name="specializations" control={control}>
					{({ onChange, value }) => (
						<SpecializationSelect onChange={onChange} value={value} hasMultiple />
					)}
				</FormControl>
			</Flex>
			<Flex direction="column" style={{ marginTop: '60' }} gap="8">
				<Text
					title={t(Skills.DESCRIPTION_FULL)}
					className={`${styles['title-base']} ${styles.title2}`}
				/>
				<Text
					title={t(Skills.DESCRIPTION_LABEL)}
					className={`${styles['title-base']} ${styles.title3}`}
				/>
				<FormControl name="description" control={control}>
					{(field, hasError) => (
						<TextArea
							id="description"
							className={styles.description}
							placeholder={t(Skills.DESCRIPTION_PLACEHOLDER)}
							state={hasError ? 'error' : 'default'}
							{...field}
						/>
					)}
				</FormControl>
			</Flex>
		</Flex>
	);
};
