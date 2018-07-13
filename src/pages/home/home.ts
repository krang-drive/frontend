import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {DriverService} from "../../services/driver.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy{

  buttonColor = '#03DaC6';
  online = false;
  assignedRoute;
  username = "ADRIANO";

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,private driverService: DriverService) {

  }

  goOnline(){
    this.online = !this.online;
    this.buttonColor = (this.online) ? '#33cc33' : '#03DaC6';
  }

  acceptOffer(){
    this.driverService.sendAccept();
  }

  declineOffer(){
    this.driverService.sendReject();
    this.assignedRoute = null;
  }

  ngOnInit(){
    this.driverService.sendJoin(this.username);
    this.getAssignedRoute();
  }

  ngOnDestroy(){
    this.driverService.sendLeave("Destroying Ionic.");
    this.driverService.close();
  }

  getAssignedRoute(){
    return this.driverService.getOffer().subscribe(route => this.assignedRoute = route);
  }

}
