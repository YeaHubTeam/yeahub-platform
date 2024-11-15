import DotsVertical from '@/shared/assets/icons/DotsVertical.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { ChevronUp } from '@/shared/ui/Icons/ChevronUp';
import { PencilIcon } from '@/shared/ui/Icons/PencilIcon';

import styles from './QuestionInterface.module.css';

export const QuestionInterface = () => {
	const { t } = useI18nHelpers(i18Namespace.landing);

	return (
		<div className={styles['question-interface']}>
			<div className={styles.caption}>
				<PencilIcon />
				<p>
					{t(Landing.PLATFORM_INTERFACE_DESCRIPTION)} <br />
				</p>
			</div>
			<div className={styles['question-example']}>
				<DotsVertical className={styles['dots-icon']} />
				<ChevronUp className={styles['chevron-icon']} />
				<h3 className={styles.question}>Какие типы данных есть в JS?</h3>
				<div className={styles['question-body']}>
					<div className={styles['question-info']}>
						<div className={styles['question-tag']}>
							Рейтинг: <span>4</span>
						</div>
						<div className={styles['question-tag']}>
							Сложность: <span>10</span>
						</div>
					</div>
					<div className={styles.answer}>
						<p>
							Значение в JavaScript всегда относиться к данным определенного типа. Например, это
							может быть строка или число. Есть восемь основных типов данных в JavaScript. В этой
							главе мы рассмотрим их в общем, а в следующих главах поговорим подробнее о каждом.
						</p>
						<p>
							Переменная в JavaSctipt может содержать любые данные. В один момент там может быть
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
