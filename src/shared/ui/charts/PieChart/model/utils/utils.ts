export const calculateArcLength = (adjustedSegmentAngle: number, circumference: number): number => {
	return (adjustedSegmentAngle / 360) * circumference;
};

export const calculateStrokeDasharray = (arcLength: number, circumference: number): string => {
	return `${arcLength} ${circumference - arcLength}`;
};

export const calculateStrokeDashoffset = (startPosition: number, circumference: number): number => {
	return circumference * 0.25 - startPosition;
};
