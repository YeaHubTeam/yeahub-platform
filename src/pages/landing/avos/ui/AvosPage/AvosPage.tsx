import { AvosBanner } from '../AvosBanner/AvosBanner';
import { AvosListen } from '../AvosListen/AvosListen';
import { AvosPromo } from '../AvosPromo/AvosPromo';

const AvosPage = () => {
	return (
		<>
			<AvosBanner />
			<AvosPromo />
			<AvosListen />
		</>
	);
};

export default AvosPage;
