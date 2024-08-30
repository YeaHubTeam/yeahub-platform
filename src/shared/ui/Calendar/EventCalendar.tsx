import { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import { Icon } from 'yeahub-ui-kit';

import { Block } from '../Block';

import './EventCalendar.css';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const PREV_LABEL = <Icon icon="caretLeft" size={24} color="--palette-ui-black-600" />;
const NEXT_LABEL = <Icon icon="caretRight" size={24} color="--palette-ui-black-600" />;

interface EventCalendarProps {
	onDateChange: (dates: [Date | null, Date | null]) => void;
}

export const EventCalendar = ({ onDateChange }: EventCalendarProps) => {
	const [date, setDate] = useState<Value>(new Date());

	useEffect(() => {
		if (Array.isArray(date)) {
			onDateChange(date);
		} else {
			onDateChange([date, date]);
		}
	}, [date, onDateChange]);

	return (
		<Block className="calendar-block">
			<Calendar
				onChange={setDate}
				value={date}
				showNeighboringMonth={false}
				prevLabel={PREV_LABEL}
				nextLabel={NEXT_LABEL}
				prev2Label={null}
				next2Label={null}
				selectRange={true}
			/>
		</Block>
	);
};
