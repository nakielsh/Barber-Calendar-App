import { Appointment } from "./appointment";

export interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    imageUrl: string;
    appointmentList: Appointment[];
}