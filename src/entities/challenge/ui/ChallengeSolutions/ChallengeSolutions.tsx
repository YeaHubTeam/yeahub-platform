import { useTranslation } from 'react-i18next';

import { i18Namespace, Challenge as ChallengeTranslations } from '@/shared/config';
import { Stub } from '@/shared/ui/Stub';

type ChallengeSolutionsProps = {
	solutions?: string[];
};

export const ChallengeSolutions = ({ solutions }: ChallengeSolutionsProps) => {
	const { t } = useTranslation(i18Namespace.challenge);

	if (!solutions || solutions.length === 0) {
		return (
			<Stub
				type="empty"
				title={t(ChallengeTranslations.SOLUTIONS_TAB_TITLE)}
				subtitle={t(ChallengeTranslations.SOLUTIONS_TAB_SUBTITLE)}
			/>
		);
	}

	return (
		<div>
			{solutions.map((solution, index) => (
				<pre key={index} style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
					{solution}
				</pre>
			))}
		</div>
	);
};
