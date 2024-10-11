import { Calendar } from 'react-calendar';
import { Icon } from 'yeahub-ui-kit';

import { Card } from '../../Card';

import './EventCalendar.css';
import 'react-calendar/dist/Calendar.css';

import { useState } from 'react';

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

const PREV_LABEL = <Icon icon="caretLeft" size={24} color="--palette-ui-black-600" />;
const NEXT_LABEL = <Icon icon="caretRight" size={24} color="--palette-ui-black-600" />;

interface EventCalendarProps {
	onDateChange: (dates: Value) => void;
}

export const EventCalendar = ({ onDateChange }: EventCalendarProps) => {
	const [isOpenCalendar, setOpenCalendar] = useState<boolean>(false);

	const handleClick = (): void => {
		setOpenCalendar((prev) => !prev);
	};

	return (
		<>
			<button className="mobile-calendar" onClick={handleClick}>
				<Icon icon="calendar" color="--palette-ui-black-700" />
			</button>
			<Card className={isOpenCalendar ? 'calendar-block  active' : 'calendar-block '}>
				<Calendar
					onChange={onDateChange}
					showNeighboringMonth={false}
					prevLabel={PREV_LABEL}
					nextLabel={NEXT_LABEL}
					prev2Label={null}
					next2Label={null}
					selectRange={true}
				/>
			</Card>
		</>
	);
};
