import classNames from 'classnames';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTranslation } from 'react-i18next';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewHistory } from '@/shared/config/i18n/i18nTranslations';
import { useModal } from '@/shared/hooks/useModal';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { IconButton } from '@/shared/ui/IconButton';

import { Card } from '../../Card';
import { Drawer } from '../../Drawer';

import './EventCalendar.css';

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

interface EventCalendarProps {
	onDateChange: (dates: Value) => void;
	selectedDates: Value;
}

export const EventCalendar = ({ onDateChange, selectedDates }: EventCalendarProps) => {
	const { t } = useTranslation(i18Namespace.interviewHistory);
	const { isOpen, onToggle, onClose } = useModal();
	const { isMobileS } = useScreenSize();

	const PREV_LABEL = (
		<Icon
			icon="caretLeft"
			size={24}
			color="--palette-ui-black-600"
			aria-label={t(InterviewHistory.PREV_MONTH)}
		/>
	);
	const NEXT_LABEL = (
		<Icon
			icon="caretRight"
			size={24}
			color="--palette-ui-black-600"
			aria-label={t(InterviewHistory.NEXT_MONTH)}
		/>
	);

	return (
		<>
			<div className={'popover-calendar'}>
				<IconButton
					className={classNames({ active: isOpen })}
					aria-label="go to filters"
					form="square"
					icon={<Icon icon="calendar" />}
					size="S"
					variant={'tertiary'}
					onClick={onToggle}
				/>

				<Drawer
					isOpen={isOpen}
					onClose={onClose}
					rootName={isMobileS ? 'body' : 'mainLayout'}
					className={classNames('drawer', {
						['drawer-mobile']: isMobileS,
					})}
					hasCloseButton
				>
					<Card className={'calendar-block'}>
						<Calendar
							onChange={onDateChange}
							showNeighboringMonth={false}
							prevLabel={PREV_LABEL}
							nextLabel={NEXT_LABEL}
							prev2Label={null}
							next2Label={null}
							selectRange={true}
							value={selectedDates}
						/>
					</Card>
				</Drawer>
			</div>

			<div className={'additional-info-wrapper'}>
				<Card className={'calendar-block'}>
					<Calendar
						onChange={onDateChange}
						showNeighboringMonth={false}
						prevLabel={PREV_LABEL}
						nextLabel={NEXT_LABEL}
						prev2Label={null}
						next2Label={null}
						selectRange={true}
						value={selectedDates}
					/>
				</Card>
			</div>
		</>
	);
};
