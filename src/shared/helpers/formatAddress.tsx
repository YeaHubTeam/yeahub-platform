export const formatAddress = (country: string, city: string) => {
	if (country && city) {
		return (
			<li>
				{country}, {city}
			</li>
		);
	} else if (country) {
		return <li>{country}</li>;
	} else if (city) {
		return <li>{city}</li>;
	} else {
		return null;
	}
};
