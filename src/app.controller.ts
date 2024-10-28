import { Body, Controller, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UserRequestDto } from './user.dto';
import { UserResponse } from './user.interface';
import { MessagePattern } from '@nestjs/microservices';
import { UserCommands, UserEvents } from './user.enums';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(UserEvents.CREATE_USER)
  async create(@Body() data: UserRequestDto): Promise<null> {
    return await this.appService.create(data);
  }

  @MessagePattern(UserCommands.READ_USER)
  async read(@Param('id') id: string): Promise<UserResponse> {
    return await this.appService.read(id);
  }

  @MessagePattern(UserCommands.LIST_USER)
  async list(): Promise<UserResponse[]> {
    return await this.appService.list();
  }

  @MessagePattern(UserEvents.UPDATE_USER)
  async update(
    @Param() id: string,
    @Body() data: Partial<UserRequestDto>,
  ): Promise<void> {
    return await this.appService.update(id, data);
  }

  @MessagePattern(UserEvents.DELETE_USER)
  async delete(@Param('id') id: string): Promise<void> {
    return await this.appService.delete(id);
  }
}
