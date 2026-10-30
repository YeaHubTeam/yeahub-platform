import { useTranslation } from 'react-i18next';

import { Articles, i18Namespace } from '@/shared/config';
import { BaseFilterItem, BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { ARTICLE_FORMAT_OPTIONS, ArticleFormat } from '@/entities/article';

interface ArticleFormatFilterProps {
	selectedFormat?: ArticleFormat;
	onChangeFormat: (format?: ArticleFormat) => void;
}

export const ArticleFormatFilter = ({
	selectedFormat,
	onChangeFormat,
}: ArticleFormatFilterProps) => {
	const { t } = useTranslation(i18Namespace.article);

	const onClick = (format: ArticleFormat) => {
		onChangeFormat(format === selectedFormat ? undefined : format);
	};

	const preparedData: BaseFilterItem<ArticleFormat>[] = ARTICLE_FORMAT_OPTIONS.map(
		({ value, labelKey }) => ({
			id: value,
			title: t(labelKey),
			active: selectedFormat === value,
		}),
	);

	return (
		<BaseFilterSection data={preparedData} title={t(Articles.FORMAT_FULL)} onClick={onClick} />
	);
};
