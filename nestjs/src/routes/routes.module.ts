import { Module } from '@nestjs/common';
import { MapsModule } from 'src/maps/maps.module';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { RoutesDriverService } from './routes-driver/routes-driver.service';

@Module({
  imports: [MapsModule],
  controllers: [RoutesController],
  providers: [RoutesService, RoutesDriverService],
})
export class RoutesModule {}
