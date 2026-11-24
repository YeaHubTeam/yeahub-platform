import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions, Skills } from '@/shared/config';
import { removeBase64Data } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { ImageLoaderWithoutCropper } from '@/shared/ui/ImageLoaderWithoutCropper';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { TextArea } from '@/shared/ui/TextArea';

import { SpecializationSelect } from '@/entities/specialization/@x/skill';

import styles from './SkillForm.module.css';

interface SkillFormProps {
	imageSrc?: string | null;
	isEdit?: boolean;
}

export const SkillForm = ({ isEdit, imageSrc }: SkillFormProps) => {
	const { t } = useTranslation([i18Namespace.skill, i18Namespace.questions]);

	const { control, setValue } = useFormContext();

	const skillImage = useWatch({ control, name: 'skillImage' });

	const formImageSrc = useWatch({ control, name: 'imageSrc' });

	const selectedSpecializations = useWatch({
		control,
		name: 'specializations',
	});

	const [previewImg, setPreviewImg] = useState<string | null>(imageSrc || null);

	const currentPreview = skillImage ? previewImg : (formImageSrc ?? null);

	const changeImage = (imageBase64: string) => {
		const image = removeBase64Data(imageBase64);

		setPreviewImg(imageBase64);
		setValue('skillImage', image, { shouldDirty: true });
		setValue('imageSrc', null, { shouldDirty: true });
	};

	const removeImage = () => {
		setPreviewImg(null);
		setValue('skillImage', null, { shouldDirty: true });
		setValue('imageSrc', null, { shouldDirty: true });
	};

	return (
		<>
			<Text variant="body6" className={styles['main-title']}>
				{isEdit ? t(Skills.EDIT_PAGE_TITLE) : t(Skills.CREATE_PAGE_TITLE)}
			</Text>
			<Flex direction="column" gap="60">
				<FormField label={t(Skills.TITLE_FULL)} description={t(Skills.TITLE_LABEL)}>
					<FormControl name="title" control={control} className={`${styles['input-form']}`}>
						{(register, hasError) => <Input {...register} error={hasError} />}
					</FormControl>
				</FormField>

				<FormField label={t(Skills.ICON_TITLE)} description={t(Skills.ICON_LABEL)}>
					<ImageLoaderWithoutCropper
						removeImage={removeImage}
						changeImage={changeImage}
						initialSrc={currentPreview}
					/>
				</FormField>

				<FormField
					label={t(Questions.SPECIALIZATION_TITLE, { ns: i18Namespace.questions })}
					description={t(Questions.SPECIALIZATION_LABEL, { ns: i18Namespace.questions })}
				>
					<FormControl className={styles.select} name="specializations" control={control}>
						{({ onChange, value }) => (
							<SpecializationSelect
								onChange={onChange}
								value={value}
								hasMultiple
								selectedSpecializationItems={selectedSpecializations ?? []}
							/>
						)}
					</FormControl>
				</FormField>

				<FormField
					label={t(Skills.DESCRIPTION_FULL)}
					direction="column"
					description={t(Skills.DESCRIPTION_LABEL)}
				>
					<FormControl name="description" control={control}>
						{(field, hasError) => (
							<TextArea
								id="description"
								className={styles.textarea}
								placeholder={t(Skills.DESCRIPTION_PLACEHOLDER)}
								state={hasError ? 'error' : 'default'}
								{...field}
							/>
						)}
					</FormControl>
				</FormField>
			</Flex>
		</>
	);
};
