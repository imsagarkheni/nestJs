import { Controller, Post, Body, Res, Get, Param, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Response } from 'express';
import { ResponseHelper } from '../../common/response.helper';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { PaginationDto } from './dto/pagination.dto';
import { PermissionService } from '../permission/permission.service';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() createRoleDto: CreateRoleDto, @Res() res: Response): Promise<void> {
    try {
      const role = await this.roleService.create(createRoleDto);
      ResponseHelper.sendSuccessResponse(res, 'Role registered successfully', role);
    } catch (error) {
      console.error(`Failed to register role: ${error.message}`);
      ResponseHelper.sendBadRequestResponse(res, error.message);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const role = await this.roleService.findById(id);
      if (role) {
        ResponseHelper.sendSuccessResponse(res, 'Role retrieved successfully', role);
      } else {
        ResponseHelper.sendNotFoundResponse(res, 'Role not found');
      }
    } catch (error) {
      console.error(`Failed to retrieve role: ${error.message}`);
      ResponseHelper.sendInternalServerErrorResponse(res, 'Failed to retrieve role');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async findAll(@Body() paginationQuery: PaginationDto, @Res() res: Response): Promise<void> {
    const { page = 1, limit = 10, search = '' } = paginationQuery;
    try {
      const hasPermission = await this.permissionService.getPermission('66851c548e9da29b3d2fdda6', 'roles', 'view');
      // 66854dd022c9406a2492126c  sales
      // 66851c548e9da29b3d2fdda6  admin
      if (!hasPermission) {
        ResponseHelper.sendUnauthorizedResponse(res, 'You do not have permission to view roles');
        return;
      }

      const roles = await this.roleService.findAll(page, limit, search);
      ResponseHelper.sendSuccessResponse(res, 'Roles retrieved successfully', roles);
    } catch (error) {
      console.error(`Failed to retrieve roles: ${error.message}`);
      ResponseHelper.sendInternalServerErrorResponse(res, 'Failed to retrieve roles');
    }
  }
}
