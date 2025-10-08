import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { Switch } from '@/shared/ui/Switch';

import styles from './QuestionAuthorFilter.module.css';

interface QuestionAuthorFilterProps {
	selectedAuthorQuestions?: boolean | null;
	onChangeAuthorQuestions: (isMine: boolean) => void;
}

export const QuestionAuthorFilter = ({
	selectedAuthorQuestions,
	onChangeAuthorQuestions,
}: QuestionAuthorFilterProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	const handleSwitchChange = (e: React.ChangeEvent<Element>) => {
		onChangeAuthorQuestions((e.target as HTMLInputElement).checked);
	};

	return (
		<Switch
			className={styles.switch}
			checked={selectedAuthorQuestions ?? false}
			onChange={handleSwitchChange}
			label={t(Questions.SORT_AUTHOR)}
		/>
	);
};
