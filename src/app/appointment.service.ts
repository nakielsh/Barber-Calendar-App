import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './appointment';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root' 
})
export class AppointmentService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getClients(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(`${this.apiServerUrl}/appointments/all`);
    }

    public addClient(appointment: Appointment): Observable<Appointment> {
        return this.http.post<Appointment>(`${this.apiServerUrl}/appointments/add`, appointment);
    }

    public updateClient(appointment: Appointment): Observable<Appointment> {
        return this.http.put<Appointment>(`${this.apiServerUrl}/appointments/update`, appointment);
    }

    public deleteClient(appointmentId: number): Observable<Appointment> {
        return this.http.delete<Appointment>(`${this.apiServerUrl}/appointments/delete/${appointmentId}`);
    }
}