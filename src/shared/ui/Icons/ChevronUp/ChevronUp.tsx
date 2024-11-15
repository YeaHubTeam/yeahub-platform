export const ChevronUp = ({ className }: { className: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 24 24"
			className={className}
		>
			<path
				fill="none"
				stroke="#6A0BFF"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="m6 15l6-6l6 6"
			/>
		</svg>
	);
};
