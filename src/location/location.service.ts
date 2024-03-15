import { Injectable } from '@nestjs/common';
import { Location } from './location.entity';
import { LocationRepository } from './location.respository';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { GetLocationsArgs } from './args/get-locations.args';

@Injectable()
export class LocationService {
  constructor(private locationRepository: LocationRepository) {}

  async getLocation(id: string): Promise<Location | null> {
    return this.locationRepository.getLocation({ where: { id } });
  }

  async getLocations(args: GetLocationsArgs): Promise<Location[]> {
    return this.locationRepository.getLocations({
      where: { ...args },
    });
  }

  async createLocation(data: CreateLocationDto): Promise<Location> {
    return this.locationRepository.createLocation({ data });
  }

  async updateLocation(data: UpdateLocationDto): Promise<Location> {
    return this.locationRepository.updateLocation({
      where: { id: data.id },
      data,
    });
  }

  async deleteLocation(id: string): Promise<Location> {
    return this.locationRepository.deleteLocation({ where: { id } });
  }
}
