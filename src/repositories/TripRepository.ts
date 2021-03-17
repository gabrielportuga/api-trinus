import { EntityRepository, Repository } from "typeorm";
import { Trip } from "../models/Trip";

@EntityRepository(Trip)
class TripRepository extends Repository<Trip> {

}

export { TripRepository }