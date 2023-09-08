import { Injectable } from '@nestjs/common';
import { DirectionsService } from 'src/maps/directions/directions.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@Injectable()
export class RoutesService {
  constructor(
    private prismaService: PrismaService,
    private directionsService: DirectionsService,
  ) {}

  async create(createRouteDto: CreateRouteDto) {
    const { request, routes, available_travel_modes, geocoded_waypoints } =
      await this.directionsService.getDirection(
        createRouteDto.source_id,
        createRouteDto.destination_id,
      );

    const legs = routes[0].legs[0];

    const route = await this.prismaService.route.create({
      data: {
        name: createRouteDto.name,
        source: {
          name: legs.start_address,
          location: {
            lat: legs.start_location.lat,
            lng: legs.start_location.lng,
          },
        },
        destination: {
          name: legs.end_address,
          location: {
            lat: legs.end_location.lat,
            lng: legs.end_location.lng,
          },
        },
        distance: legs.distance.value,
        duration: legs.duration.value,
        directions: JSON.stringify({
          available_travel_modes,
          geocoded_waypoints,
          routes,
          request,
        }),
      },
    });

    return { route };
  }

  findAll() {
    return this.prismaService.route.findMany();
  }

  findOne(id: string) {
    return this.prismaService.route.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
