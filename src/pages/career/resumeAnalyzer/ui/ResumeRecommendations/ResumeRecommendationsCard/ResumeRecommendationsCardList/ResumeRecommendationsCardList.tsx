import classNames from 'classnames';

import { Pallete } from '@/shared/libs';
import { capitalizeFirstLetter } from '@/shared/libs/fp/capitalizeFirstLetter';
import { Flex } from '@/shared/ui/Flex';
import { Icon, IconName } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './ResumeRecommendationsCardList.module.css';
type ComparisonListVariant = 'matched' | 'weakly' | 'missing';

type Signal = {
	title: string;
	evidence: string;
};
interface ResumeRecommendationsCardListProps {
	variant: ComparisonListVariant;
	title: string;
	signals: Signal[];
	isExpanded: boolean;
}

export const ResumeRecommendationsCardList = ({
	variant,
	title,
	signals,
	isExpanded,
}: ResumeRecommendationsCardListProps) => {
	const iconName: Record<ComparisonListVariant, IconName> = {
		matched: 'successCircle',
		missing: 'errorCircle',
		weakly: 'successCircle',
	};

	const iconColor: Record<ComparisonListVariant, Pallete> = {
		matched: 'green-700',
		missing: 'red-800',
		weakly: 'yellow-900',
	};

	const visibleSignals = isExpanded ? signals : signals.slice(0, 2);

	return (
		<Flex componentType="section" direction="column" gap="20" maxWidth>
			<Flex align="center" gap="8">
				<Text variant="body3-accent" color="black-900">
					{title}
				</Text>
			</Flex>

			<Flex componentType="ul" direction="column" gap="20" maxWidth>
				{visibleSignals.map((item, index) => (
					<Flex key={`${item}-${index}`} componentType="li" align="start" gap="8">
						<Icon
							icon={iconName[variant]}
							size={14}
							color={iconColor[variant]}
							className={classNames(styles.icon, styles[`icon-${variant}`])}
							aria-hidden
						/>

						<Flex direction="column" gap="4">
							<Text variant="body3-accent" color="black-900">
								{capitalizeFirstLetter(item.title)}
							</Text>

							{item && (
								<Text variant="body3" color="black-500">
									{item.evidence}
								</Text>
							)}
						</Flex>
					</Flex>
				))}
			</Flex>
		</Flex>
	);
};
