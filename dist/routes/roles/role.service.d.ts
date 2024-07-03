import { Role, RoleDocument } from '../../schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { JwtService } from '@nestjs/jwt';
import { PaginateModel, PaginateResult } from 'mongoose';
export declare class RoleService {
    private roleModel;
    private jwtService;
    constructor(roleModel: PaginateModel<RoleDocument>, jwtService: JwtService);
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    findById(id: string): Promise<Role>;
    findAll(page?: number, limit?: number, search?: string): Promise<PaginateResult<Role>>;
}
