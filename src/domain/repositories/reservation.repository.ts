
import { Reservation } from '../entities/reservation.entity';

export abstract class ReservationRepository {
  abstract save(reservation: Reservation): Promise<void>;
  abstract findById(id: string): Promise<Reservation | null>;
  abstract updateStatus(id: string, status: string): Promise<void>;
}