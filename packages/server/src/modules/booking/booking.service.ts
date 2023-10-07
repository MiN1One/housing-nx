import { Injectable } from "@nestjs/common";
import { BookingDocument } from "./booking.schema";
import { FactoryService } from "@MiN1One/api-factory";
import { IBooking } from "@MiN1One/interfaces";

@Injectable()
export class BookingService {
  constructor(
    private readonly factoryService: FactoryService<BookingDocument>
  ) {}

  getAllBookings(query: Record<string, any>) {
    return this.factoryService.getAllDocuments(query);
  }

  getBooking(bookingId: string) {
    return this.factoryService.getDocument(bookingId);
  }

  deleteBooking(bookingId: string) {
    return this.factoryService.deleteDocument(bookingId);
  }

  updateBooking<IBooking>(bookingId: string, update: IBooking) {
    return this.factoryService.updateDocument(bookingId, update);
  }

  createBooking(booking: IBooking) {
    return this.factoryService.createDocument(booking);
  }
}