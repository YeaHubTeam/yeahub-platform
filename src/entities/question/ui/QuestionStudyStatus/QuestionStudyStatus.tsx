import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';

import { StudyStatus } from '../../lib/getStudyStatus';

import styles from './QuestionStudyStatus.module.css';

interface Props {
	status: StudyStatus | undefined;
}

export const QuestionStudyStatus = ({ status }: Props) => {
	const { t } = useTranslation(i18Namespace.questions);

	if (!status) return null;

	const labels = {
		learned: t(Questions.STUDY_STATUS_LEARNED),
		'in-progress': t(Questions.STUDY_STATUS_IN_PROGRESS),
		'not-learned': t(Questions.STUDY_STATUS_NOT_LEARNED),
	};

	return <span className={classNames(styles.indicator, styles[status])}>{labels[status]}</span>;
};
