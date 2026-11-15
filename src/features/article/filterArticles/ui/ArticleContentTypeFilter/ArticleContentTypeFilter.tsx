import { useTranslation } from 'react-i18next';

import { Articles, i18Namespace } from '@/shared/config';
import { BaseFilterItem, BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { ARTICLE_CONTENT_TYPE_OPTIONS, ArticleContentType } from '@/entities/article';

interface ArticleContentTypeFilterProps {
	selectedContentType?: ArticleContentType;
	onChangeContentType: (contentType?: ArticleContentType) => void;
}

export const ArticleContentTypeFilter = ({
	selectedContentType,
	onChangeContentType,
}: ArticleContentTypeFilterProps) => {
	const { t } = useTranslation(i18Namespace.article);

	const onClick = (contentType: ArticleContentType) => {
		onChangeContentType(contentType === selectedContentType ? undefined : contentType);
	};

	const preparedData: BaseFilterItem<ArticleContentType>[] = ARTICLE_CONTENT_TYPE_OPTIONS.map(
		({ value, labelKey }) => ({
			id: value,
			title: t(labelKey),
			active: selectedContentType === value,
		}),
	);

	return (
		<BaseFilterSection
			data={preparedData}
			title={t(Articles.CONTENT_TYPE_FULL)}
			onClick={onClick}
		/>
	);
};
