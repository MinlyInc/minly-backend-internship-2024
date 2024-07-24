//import { Gender } from "src/entities/actor.entity";

export class CreateActorDto {
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

// function IsEnum(Gender: any): (target: CreateActorDto, propertyKey: "gender") => void {
//     throw new Error("Function not implemented.");
// }
