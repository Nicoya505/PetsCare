import { IsNotEmpty, IsString } from "class-validator";

export class CreateBreedDto {

    
    @IsString()
    @IsNotEmpty()
    name: string;
}
