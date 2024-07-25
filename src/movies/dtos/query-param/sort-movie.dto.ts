import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";


export class SortAndFilterAndPaginateMovieDto{
    @ApiProperty({ enum: ['releaseDate', 'averageRating', 'none'], required: false })
    @IsOptional()
    @IsString() 
    @IsIn(['releaseDate' , 'averageRating' , 'none'])
    sortBy? : string ;


    @ApiProperty({ enum: ['asc', 'desc'], required: false })
    @IsOptional()
    @IsString() 
    @IsIn(['asc' , 'desc'])
    sortOrder? : string ;


    @ApiProperty({ required: false })
    @IsOptional()
    @IsString() 
    @IsNotEmpty()
    offset? : string ;


    @ApiProperty({ required: false })
    @IsOptional()
    @IsNotEmpty() 
    @IsString()
    limit? : string ;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString() 
    @IsNotEmpty()
    filterValue? : string ;
}