import axios from 'axios';
import {IProductionToolResponse} from '@src/Tools/Production/IProductionToolResponse';
import {IProductionDataApiRequest} from '@src/Tools/Production/IProductionData';
import {Constants} from '@src/Constants';

export class Solver
{

	public static solveProduction(productionRequest: IProductionDataApiRequest, callback: (response: IProductionToolResponse) => void): void
	{
		axios({
			method: 'post',
			url: Constants.API_URL + '/v2/solver',
			data: productionRequest,
		}).then((response) => {
			if ('result' in response.data) {
				callback(response.data.result);
			}
		}).catch(() => {
			callback({});
		});
	}

}
