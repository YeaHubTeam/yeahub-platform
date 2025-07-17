import { useState, useEffect } from 'react';

interface GetQuizResults {
	total: number;
	skillsQuestions: {
		skill: string;
		count: number;
	}[];
}

export const useQuizStatic = () => {
	const [quizResults, setQuizResults] = useState<GetQuizResults | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(process.env.API_URL + 'interview-preparation/stat');

				if (response.status === 200) {
					setQuizResults(await response.json());
				} else {
					throw new Error();
				}
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return {
		quizResults,
		isLoading,
	};
};
