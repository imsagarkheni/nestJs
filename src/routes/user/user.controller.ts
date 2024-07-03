import { Controller, Post, Body, Res, Get, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { ResponseHelper } from '../../common/response.helper';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { Logger } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) { }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<void> {
    try {
      const user = await this.userService.register(createUserDto);
      ResponseHelper.sendSuccessResponse(res, 'User registered successfully', user);
    } catch (error) {
      this.logger.error(`Failed to register user: ${error.message}`);
      ResponseHelper.sendBadRequestResponse(res, error.message);
    }
  }

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<void> {
    try {
      const token = await this.userService.login(loginUserDto);
      ResponseHelper.sendSuccessResponse(res, 'Login successful', token);
    } catch (error) {
      this.logger.error(`Failed to login: ${error.message}`);
      ResponseHelper.sendUnauthorizedResponse(res, error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const user = await this.userService.findById(id);
      if (user) {
        ResponseHelper.sendSuccessResponse(res, 'User retrieved successfully', user);
      } else {
        ResponseHelper.sendNotFoundResponse(res, 'User not found');
      }
    } catch (error) {
      this.logger.error(`Failed to retrieve user: ${error.message}`);
      ResponseHelper.sendInternalServerErrorResponse(res, 'Failed to retrieve user');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async findAll(@Query() dto: PaginationDto, @Res() res: Response): Promise<void> {
    try {
      const user = await this.userService.findAll(dto);
      if (user) {
        ResponseHelper.sendSuccessResponse(res, 'User retrieved successfully', user);
      } else {
        ResponseHelper.sendNotFoundResponse(res, 'User not found');
      }
    } catch (error) {
      this.logger.error(`Failed to retrieve user: ${error.message}`);
      ResponseHelper.sendInternalServerErrorResponse(res, 'Failed to retrieve user');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async findByIdAndUpdate(@Param('id') id: string, @Body() updateUserDto: any, @Res() res: Response): Promise<void> {
    try {
      const updatedUser = await this.userService.ggggg(id, updateUserDto);
      if (updatedUser) {
        ResponseHelper.sendSuccessResponse(res, 'User updated successfully', updatedUser);
      } else {
        ResponseHelper.sendNotFoundResponse(res, 'User not found');
      }
    } catch (error) {
      this.logger.error(`Failed to update user: ${error.message}`);
      ResponseHelper.sendInternalServerErrorResponse(res, 'Failed to update user');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteById(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {

      const deletedUser = await this.userService.deleteById(id);
      if (deletedUser) {
        ResponseHelper.sendSuccessResponse(res, 'User deleted successfully', deletedUser);
      }
    } catch (error) {
      this.logger.error(`Failed to delete user: ${error.message}`);
      ResponseHelper.sendSuccessResponse(res, 'User not found', 0);
    }
  }

}
