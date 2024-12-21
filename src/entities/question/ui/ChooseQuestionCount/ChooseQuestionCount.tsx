import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { Counter } from '@/shared/ui/Counter';

import styles from './ChooseQuestionCount.module.css';

interface ChooseQuestionCountProps {
	onChangeLimit: (limit: number) => void;
	count: number;
}

export const ChooseQuestionCount = ({ onChangeLimit, count }: ChooseQuestionCountProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	const onChange = (counter: number) => {
		onChangeLimit(counter);
	};

	return (
		<div>
			<h3 className={styles.title}>{t(Questions.COUNT)}</h3>
			<Counter count={count} onChange={onChange} />
		</div>
	);
};
