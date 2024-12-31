import {IManufacturerSchema} from '@src/Schema/IBuildingSchema';
import {IGeneratorSchema} from '@src/Schema/IGeneratorSchema';
import {IFuelSchema} from '@src/Schema/IFuelSchema';
import {IItemSchema} from '@src/Schema/IItemSchema';

export class GeneratorData
{

	public constructor(
		public readonly machine: IManufacturerSchema,
		public readonly generator: IGeneratorSchema,
		public readonly fuelRecipe: IFuelSchema,
		public readonly fuelItem: IItemSchema,
		public readonly amount: number,
		public readonly clockSpeed: number
	)
	{

	}

}
