import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Barber-Calendar-App';
  public clients: Client[] | undefined;
  public editClient: Client | undefined | null;
  public deleteClient: Client | undefined | null;

  constructor(private clientService: ClientService){}

  ngOnInit() {
    this.getClients();
  }

  public getClients(): void {
    this.clientService.getClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddClient(addForm: NgForm): void {
    document.getElementById('add-client-form')?.click();
    this.clientService.addClient(addForm.value).subscribe(
      (response: Client) => {
        console.log(response);
        this.getClients();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateClient(client: Client): void {
    document.getElementById('add-client-form')?.click();
    this.clientService.updateClient(client).subscribe(
      (response: Client) => {
        console.log(response);
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteClient(clientId: number): void {
    document.getElementById('add-client-form')?.click();
    this.clientService.deleteClient(clientId).subscribe(
      (response: Client) => {
        console.log(response);
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchClients(key: string): void {
    const results: Client[] = [];
    for (const client of this.clients!) {
      if (client.name.toLowerCase().indexOf(key.toLowerCase()) != -1
      || client.email.toLowerCase().indexOf(key.toLowerCase()) != -1
      || client.phone.toLowerCase().indexOf(key.toLowerCase()) != -1) {
        results.push(client);
      }
    }
    this.clients = results;
    if (!key) {
      this.getClients();
    }
  }

  public onOpenModal(client: Client | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addClientModal');
    }
    if (mode === 'edit') {
      this.editClient = client;
      button.setAttribute('data-target', '#updateClientModal');
    }
    if (mode === 'delete') {
      this.deleteClient = client;
      button.setAttribute('data-target', '#deleteClientModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
