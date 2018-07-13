import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

import { Observable } from 'rxjs';

@Injectable()
export class DriverService {

    constructor(
        private socket: Socket,
    ) { }

    sendJoin(driverId: string) {
        let msg = {
            driverId: driverId
        };
        this.socket.emit('join', msg);
    }

    sendLeave(driverId: string){
      let msg = {
        driverId: driverId
      };
      this.socket.emit('disconnect', msg);
    }

    sendAccept() {
        this.socket.emit('accept');
    }

    sendReject() {
        this.socket.emit('reject');
    }

    getOffer(): Observable<any> {
        return this.socket.fromEvent<any>("offer");
                // .map(data => data.msg );
    }
    // // Example consuming this:
    // this.driverService
    //     .getOffer()
    //     .subscribe(msg => {
    //     console.log(msg);
    // });

    close() {
        this.socket.disconnect();
    }


}
