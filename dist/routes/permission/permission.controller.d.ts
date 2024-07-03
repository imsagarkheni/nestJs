import { PermissionService } from './permission.service';
import { SavePermissionDto } from './dto/save-permission.dto';
import { Response } from 'express';
export declare class PermissionController {
    private readonly permissionService;
    private readonly logger;
    constructor(permissionService: PermissionService);
    getModals(res: Response, roleId: string): Promise<void>;
    savePermission(savePermissionDto: SavePermissionDto, req: Request, res: Response): Promise<void>;
}
