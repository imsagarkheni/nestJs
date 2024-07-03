import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { PaginationDto } from './dto/pagination.dto';
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    register(createUserDto: CreateUserDto, res: Response): Promise<void>;
    login(loginUserDto: LoginUserDto, res: Response): Promise<void>;
    findById(id: string, res: Response): Promise<void>;
    findAll(dto: PaginationDto, res: Response): Promise<void>;
    findByIdAndUpdate(id: string, updateUserDto: any, res: Response): Promise<void>;
    deleteById(id: string, res: Response): Promise<void>;
}
