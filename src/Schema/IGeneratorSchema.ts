import {IFuelSchema} from '@src/Schema/IFuelSchema';

export interface IGeneratorSchema
{

	className: string;
	fuel: string[];
	fuelRecipes?: IFuelSchema[];
	powerProduction: number;
	powerProductionExponent: number | null;
	waterToPowerRatio: number;
	producedIn?: string;
}
