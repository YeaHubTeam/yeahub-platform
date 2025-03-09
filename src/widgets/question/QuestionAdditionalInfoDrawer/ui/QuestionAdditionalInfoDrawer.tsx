import classNames from 'classnames';

import PopoverIcon from '@/shared/assets/icons/DiplomaVerified.svg';
import { ROUTES } from '@/shared/config/router/routes';
import { useCurrentProject } from '@/shared/hooks/useCurrentProject';
import { useModal } from '@/shared/hooks/useModal';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { IconButton } from '@/shared/ui/IconButton';

import { Question } from '@/entities/question';

import { ProgressBlock } from '@/widgets/question/ProgressBlock';
import { QuestionAdditionalInfo } from '@/widgets/question/QuestionAdditionalInfo';

import styles from './QuestionAdditionalInfoDrawer.module.css';

interface QuestionAdditionalInfoDrawerProps {
	question: Question;
}

export const QuestionAdditionalInfoDrawer = ({ question }: QuestionAdditionalInfoDrawerProps) => {
	const { isMobileS } = useScreenSize();
	const { isOpen, onToggle, onClose } = useModal();
	const project = useCurrentProject();
	const { createdBy, checksCount, rate, keywords, complexity, questionSkills } = question;

	return (
		<div className={styles['popover-additional']}>
			<IconButton
				className={classNames({ active: isOpen })}
				aria-label="go to additional info"
				form="square"
				icon={<PopoverIcon />}
				size="small"
				variant="tertiary"
				onClick={onToggle}
			/>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				rootName={isMobileS ? 'body' : 'mainLayout'}
				className={classNames(styles.drawer, {
					[styles['drawer-mobile']]: isMobileS,
				})}
				hasCloseButton
			>
				<Card>
					{project === 'platform' && (
						<ProgressBlock
							className={styles['additional-info-wrapper']}
							checksCount={checksCount}
						/>
					)}
					<QuestionAdditionalInfo
						className={styles['additional-info-wrapper']}
						rate={rate}
						keywords={keywords}
						complexity={complexity}
						questionSkills={questionSkills}
						createdBy={createdBy}
						route={ROUTES.interview.questions.page}
					/>
				</Card>
			</Drawer>
		</div>
	);
};
