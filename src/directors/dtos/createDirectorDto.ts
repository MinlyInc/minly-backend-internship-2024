import { Directors } from "src/entities/director.entity";
import { Actor } from "src/entities/actor.entity";
import { Festival } from "src/entities/festival.entity";

export class CreateDirectorDto {
    id:number
    firstName: string
    lastName: string
    age:number;
    birthDate:string

    // @IsEnum(Gender)
    // gender: Gender;

    nationality:string
    bio:string
    numberOfAwards:number
    picture:string
    createdAt:Date  |null;
    updatedAt:Date |null;
    uuId: string;
}

// function IsEnum(Gender:any): (target: CreateDirectorDto, propertyKey: "gender") => void {
//     throw new Error("Function not implemented.");
// }
