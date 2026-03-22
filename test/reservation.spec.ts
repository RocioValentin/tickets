// test/reservation.spec.ts
import { CreateReservationUseCase } from '../src/application/use-cases/create-reservation.usecase';

describe('Reservation concurrency', () => {
  it('should not oversell tickets', async () => {
    const ticketRepo = {
      reserveTicket: jest.fn()
        .mockResolvedValueOnce(true)
        .mockResolvedValue(false),
    };

    const reservationRepo = {
      save: jest.fn(),
    };

    const useCase = new CreateReservationUseCase(
      ticketRepo as any,
      reservationRepo as any,
    );

    const results = await Promise.allSettled([
      useCase.execute('ticket-1'),
      useCase.execute('ticket-1'),
    ]);

    const success = results.filter(r => r.status === 'fulfilled');
    expect(success.length).toBe(1);
  });
});