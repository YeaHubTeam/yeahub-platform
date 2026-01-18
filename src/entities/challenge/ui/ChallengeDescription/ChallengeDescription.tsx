import { useTranslation } from 'react-i18next';

import { i18Namespace, Challenge as ChallengeTranslations } from '@/shared/config';
import { Text } from '@/shared/ui/Text';
import { TextHtml } from '@/shared/ui/TextHtml';

import type { Challenge } from '../../model/types/challenge';

import styles from './ChallengeDescription.module.css';

type ChallengeDescriptionProps = {
	challenge: Challenge;
};

export const ChallengeDescription = ({ challenge }: ChallengeDescriptionProps) => {
	const { t } = useTranslation(i18Namespace.challenge);
	return (
		<div className={styles.wrapper}>
			<Text variant="head4">{challenge.name}</Text>
			<TextHtml html={challenge.description} className={styles.description} />

			{challenge.constraints?.length > 0 && (
				<div className={styles.constraints}>
					<Text variant="head4" className={styles['constraints-title']}>
						{t(ChallengeTranslations.DESCRIPTION_CONSTRAINTS_TITLE)}
					</Text>

					<ul className={styles['constraints-list']}>
						{challenge.constraints.map((constraint, index) => (
							<li key={`${constraint}-${index}`} className={styles['constraint-item']}>
								<Text variant="body2">{constraint}</Text>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};
