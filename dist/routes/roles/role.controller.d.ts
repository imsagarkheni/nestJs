import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Response } from 'express';
import { PaginationDto } from './dto/pagination.dto';
import { PermissionService } from '../permission/permission.service';
export declare class RoleController {
    private readonly roleService;
    private readonly permissionService;
    constructor(roleService: RoleService, permissionService: PermissionService);
    create(createRoleDto: CreateRoleDto, res: Response): Promise<void>;
    findById(id: string, res: Response): Promise<void>;
    findAll(paginationQuery: PaginationDto, res: Response): Promise<void>;
}
