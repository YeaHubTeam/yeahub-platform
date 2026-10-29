import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Articles, i18Namespace } from '@/shared/config';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { TextArea } from '@/shared/ui/TextArea';
import { TextEditor } from '@/shared/ui/TextEditor';

import { SkillSelect } from '@/entities/skill/@x/article';
import { SpecializationSelect } from '@/entities/specialization/@x/article';

import {
	ARTICLE_CONTENT_TYPE_OPTIONS,
	ARTICLE_FORMAT_OPTIONS,
} from '../../model/constants/articleOptions';
import { ArticleTopicSelect } from '../ArticleTopicSelect/ArticleTopicSelect';

import styles from './ArticleForm.module.css';

export const ArticleForm = () => {
	const { t } = useTranslation([i18Namespace.article, i18Namespace.translation]);

	const { control, watch } = useFormContext();
	const selectedSpecializations = watch('specializations');

	const articleContentTypeItems = ARTICLE_CONTENT_TYPE_OPTIONS.map(({ value, labelKey }) => ({
		label: t(labelKey),
		value,
	}));
	const articleFormatItems = ARTICLE_FORMAT_OPTIONS.map(({ value, labelKey }) => ({
		label: t(labelKey),
		value,
	}));

	return (
		<>
			<Text variant="body5-strong" className={styles['main-title']}>
				{t(Articles.CREATE_PAGE_TITLE)}
			</Text>

			<Flex direction="column" gap="40">
				<div className={styles.wrapper}>
					<Flex direction="column" gap="60">
						<FormField label={t(Articles.TITLE_SHORT)} description={t(Articles.TITLE_LABEL)}>
							<FormControl className={styles.field} name="title" control={control}>
								{(field, hasError) => (
									<Input
										error={hasError}
										placeholder={t(Articles.TITLE_LABEL)}
										maxLength={255}
										{...field}
									/>
								)}
							</FormControl>
						</FormField>

						<FormField
							label={t(Articles.CONTENT_TITLE_FULL)}
							description={t(Articles.CONTENT_LABEL)}
							direction="column"
						>
							<FormControl name="bodyHtml" control={control}>
								{(field) => (
									<TextEditor
										id="bodyHtml"
										className={styles.description}
										data={field.value ?? ''}
										onChange={field.onChange}
										onBlur={field.onBlur}
									/>
								)}
							</FormControl>
						</FormField>

						<FormField label={t(Articles.URL_TITLE)} description={t(Articles.URL_LABEL)}>
							<FormControl className={styles.field} name="slug" control={control}>
								{(field, hasError) => (
									<Flex direction="column" gap="8">
										<Input placeholder={t(Articles.URL_PLACEHOLDER)} error={hasError} {...field} />
										<Text variant="body2" color="black-500">
											{t(Articles.URL_HINT)}
										</Text>
									</Flex>
								)}
							</FormControl>
						</FormField>
					</Flex>

					<Flex direction="column" gap="20">
						<FormField
							label={t(Articles.SPECIALIZATIONS_TITLE)}
							description={t(Articles.SPECIALIZATIONS_LABEL)}
						>
							<FormControl className={styles.field} name="specializations" control={control}>
								{({ onChange, value }) => (
									<SpecializationSelect
										onChange={onChange}
										value={Array.isArray(value) && value.length > 0 ? value : []}
										hasMultiple
									/>
								)}
							</FormControl>
						</FormField>

						<FormField label={t(Articles.SKILLS_TITLE)} description={t(Articles.SKILLS_LABEL)}>
							<FormControl className={styles.field} name="skills" control={control}>
								{({ onChange, value }) => (
									<div className={styles.select}>
										<SkillSelect
											onChange={onChange}
											value={value}
											selectedSpecializations={selectedSpecializations}
										/>
									</div>
								)}
							</FormControl>
						</FormField>

						<FormField label={t(Articles.TOPICS_TITLE)} description={t(Articles.TOPICS_LABEL)}>
							<FormControl className={styles.field} name="topics" control={control}>
								{({ onChange, value }) => (
									<ArticleTopicSelect
										value={Array.isArray(value) ? value : []}
										onChange={onChange}
									/>
								)}
							</FormControl>
						</FormField>

						<FormField
							label={t(Articles.CONTENT_TYPE_TITLE)}
							description={t(Articles.CONTENT_TYPE_LABEL)}
						>
							<FormControl className={styles.field} name="contentType" control={control}>
								{({ onChange, value }) => (
									<Dropdown
										label={t(Articles.CONTENT_TYPE_PLACEHOLDER)}
										onSelect={(val) => onChange(String(val))}
										value={
											articleContentTypeItems.find((contentType) => contentType.value === value)
												?.label || ''
										}
									>
										{articleContentTypeItems.map((option) => (
											<Option value={option.value} label={option.label} key={option.label} />
										))}
									</Dropdown>
								)}
							</FormControl>
						</FormField>

						<FormField label={t(Articles.FORMAT_TITLE)} description={t(Articles.FORMAT_LABEL)}>
							<FormControl className={styles.field} name="format" control={control}>
								{({ onChange, value }) => (
									<Dropdown
										label={t(Articles.FORMAT_PLACEHOLDER)}
										onSelect={(val) => onChange(String(val))}
										value={articleFormatItems.find((format) => format.value === value)?.label || ''}
									>
										{articleFormatItems.map((option) => (
											<Option value={option.value} label={option.label} key={option.label} />
										))}
									</Dropdown>
								)}
							</FormControl>
						</FormField>
					</Flex>
				</div>

				<Flex direction="column" gap="20">
					<FormField label={t(Articles.SEO_TITLE_TITLE)} description={t(Articles.SEO_TITLE_LABEL)}>
						<FormControl className={styles.field} name="metaTitle" control={control}>
							{(field, hasError) => (
								<Input
									error={hasError}
									placeholder={t(Articles.SEO_TITLE_PLACEHOLDER)}
									{...field}
								/>
							)}
						</FormControl>
					</FormField>

					<FormField
						label={t(Articles.SEO_DESCRIPTION_TITLE)}
						description={t(Articles.SEO_DESCRIPTION_LABEL)}
						direction="column"
					>
						<FormControl name="metaDescription" control={control}>
							{(field, hasError) => (
								<TextArea
									state={hasError ? 'error' : 'default'}
									placeholder={t(Articles.SEO_DESCRIPTION_PLACEHOLDER)}
									className={styles.description}
									limit={512}
									{...field}
								/>
							)}
						</FormControl>
					</FormField>

					<FormField label={t(Articles.OG_TITLE_TITLE)} description={t(Articles.OG_TITLE_LABEL)}>
						<FormControl className={styles.field} name="ogTitle" control={control}>
							{(field, hasError) => (
								<Input
									error={hasError}

									placeholder={t(Articles.OG_TITLE_PLACEHOLDER)}
									{...field}
								/>
							)}
						</FormControl>
					</FormField>

					<FormField
						label={t(Articles.OG_DESCRIPTION_TITLE)}
						description={t(Articles.OG_DESCRIPTION_LABEL)}
						direction="column"
					>
						<FormControl name="ogDescription" control={control}>
							{(field, hasError) => (
								<TextArea
									state={hasError ? 'error' : 'default'}
									placeholder={t(Articles.OG_DESCRIPTION_PLACEHOLDER)}
									className={styles.description}
									limit={512}
									{...field}
								/>
							)}
						</FormControl>
					</FormField>
				</Flex>
			</Flex>
		</>
	);
};
