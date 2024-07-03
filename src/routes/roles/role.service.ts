// src/users/user.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from '../../schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PaginationDto } from './dto/pagination.dto';
import { PaginateModel, PaginateResult } from 'mongoose';


@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private roleModel: PaginateModel<RoleDocument>,
    private jwtService: JwtService
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name } = createRoleDto;
    const existingRole = await this.roleModel.findOne({ name }).exec();
    if (existingRole) {
      throw new BadRequestException('role already exists');
    }

    const newRole = new this.roleModel({ ...createRoleDto });
    return newRole.save();
  }




  async findById(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id).exec();
    if (!role) {
      throw new NotFoundException(`role with id ${id} not found`);
    }
    return role;
  }

  async findAll(page: number = 1, limit: number = 10, search?: string): Promise<PaginateResult<Role>> {
    const query = search ? {
      $or: [
        { username: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ]
    } : {};
 
    return this.roleModel.paginate(query, { page, limit });
  }

}
