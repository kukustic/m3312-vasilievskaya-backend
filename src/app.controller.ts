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

  @Get('care')
  @Render('care')
  getCare(@Query('auth') auth?: string) {
  return { loggedIn: auth === 'true' };
}

@Get('contacts')
@Render('contacts')
getContacts(@Query('auth') auth?: string) {
  return { loggedIn: auth === 'true' };
}

@Get('feedback')
@Render('feedback')
getFeedback(@Query('auth') auth?: string) {
  return { loggedIn: auth === 'true' };
}

@Get('gallery')
@Render('gallery')
getGallery(@Query('auth') auth?: string) {
  return { loggedIn: auth === 'true' };
}

@Get('stories')
@Render('stories')
getStories(@Query('auth') auth?: string) {
  return { loggedIn: auth === 'true' };
}

}

