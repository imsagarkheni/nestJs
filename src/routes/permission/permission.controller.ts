import { Controller, Post, Body, Res, Get, Param, Put, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { PermissionService } from './permission.service';
import {  SavePermissionDto } from './dto/save-permission.dto';
import { Response } from 'express';
import { ResponseHelper } from '../../common/response.helper';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { Logger } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';

@Controller('permission')
export class PermissionController {
  private readonly logger = new Logger(PermissionController.name);

  constructor(private readonly permissionService: PermissionService) { }

  @UseGuards(JwtAuthGuard)
  @Get('getModals')
  async getModals(@Res() res: Response, @Query('roleId') roleId: string): Promise<void> {
    try {
      const permissions = await this.permissionService.getModals(roleId);
      ResponseHelper.sendSuccessResponse(res, 'Permissions retrieved successfully', permissions);
    } catch (error) {
      ResponseHelper.sendBadRequestResponse(res, error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('savePermission')
  async savePermission(
    @Body() savePermissionDto: SavePermissionDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const { roleId, permissions } = savePermissionDto;
      const updatedBy = "sagar";

      const message = await this.permissionService.savePermission(roleId, permissions, updatedBy);
      ResponseHelper.sendSuccessResponse(res, message, {});
    } catch (error) {
      this.logger.error(`Failed to save permissions: ${error.message}`);
      ResponseHelper.sendBadRequestResponse(res, error.message);
    }
  }


}
