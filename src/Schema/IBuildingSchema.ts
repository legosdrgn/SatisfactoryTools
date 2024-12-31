import {IBuildingMetadataSchema, IManufacturerAnyPowerMetadataSchema} from '@src/Schema/IBuildingMetadataSchema';
import {ISizeSchema} from '@src/Schema/ISizeSchema';

export interface IBuildingSchema
{

	slug: string;
	icon?: string;
	name: string;
	description: string;
	className: string;
	categories: string[];
	buildMenuPriority: number | null;
	metadata: IBuildingMetadataSchema;
	size: ISizeSchema;

}

export interface IManufacturerSchema extends IBuildingSchema
{

	metadata: IManufacturerAnyPowerMetadataSchema;

}
