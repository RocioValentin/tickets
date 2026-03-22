export enum TicketStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  SOLD = 'SOLD',
}

export class Ticket {
  constructor(
    public id: string,
    public status: TicketStatus,
  ) {}

  reserve() {
    if (this.status !== TicketStatus.AVAILABLE) {
      throw new Error('Ticket not available');
    }
    this.status = TicketStatus.RESERVED;
  }
}