export const CheckFilled = ({ className }: { className?: string }) => {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<circle cx="6" cy="6" r="6" fill="currentColor" />
			<path
				d="M8.66732 4L5.00065 7.66667L3.33398 6"
				stroke="white"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
