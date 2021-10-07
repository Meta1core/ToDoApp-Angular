import { Injectable } from '@angular/core';


declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  proxy: any;
  private signalRServerEndPoint = 'http://10.190.101.110:8080/';
  private connection;

  constructor () {
    this.startConnection();
    this.proxy.on('sendNotification', (serverMessage) => {
    });
  }
  public startConnection = () => {
    this.connection = $.hubConnection(this.signalRServerEndPoint);
    this.proxy = this.connection.createHubProxy('taskHub');

    this.connection.start().done((data: any) => {
      console.log('Connected to Notification Hub');
    }).catch((error: any) => {
      console.log('Notification Hub error -> ' + error);
    });
  }

  public getProxy = () =>{
    let proxy = this.connection.createHubProxy('taskHub');
    return proxy;
  }
}
