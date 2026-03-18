import { Controller, Get, Render, Query } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  getIndex(@Query('auth') auth?: string) {
    return { loggedIn: auth === 'true' };
  }

  @Get('about')
  @Render('about')
  getAbout(@Query('auth') auth?: string) {
    return { loggedIn: auth === 'true' };
  }
}