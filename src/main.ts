import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3100);
}
bootstrap();


// user1, pass1
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwic2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQ1NDIyNTQ5LCJleHAiOjE2NDU0NjU3NDl9.iFjVpEADdyZIm2ZRtLDymu_nqdRXpU6MFAqYlDjBkgQ

// username, password
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwic2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQ0NTYxMDUwLCJleHAiOjE2NDQ2MDQyNTB9.1_HVW9wEEBKT-NKE4HUd-pJnnoSu7f3H3IlXG4pwSWk
