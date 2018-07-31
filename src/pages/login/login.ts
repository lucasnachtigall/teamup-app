import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  model: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private usersProvider: UsersProvider) {

      this.model = new User();
      this.model.email = 'sydney@fife';
      this.model.password = 'pistol';
  }

  login() {
    this.usersProvider.login(this.model.email, this.model.password)
      .then((result: any) => {
        this.toast.create({ message: 'User logged. Token: ' + result.token, position: 'botton', duration: 3000}).present();
        //save token on ionic storage
        //redirect
        // this.navCtrl.push('contact');
        //this.navCtrl.pop();
        //this.navCtrl.setRoot();
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Error on login. Error: ' + error.error, position: 'botton', duration: 3000}).present();
      });
  }

}

export class User {
  email: string;
  password: string;
}

