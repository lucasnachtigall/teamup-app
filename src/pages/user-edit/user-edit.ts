import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users'


@IonicPage()
@Component({
  selector: 'page-user-edit',
  templateUrl: 'user-edit.html',
})
export class UserEditPage {
  model: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private usersProvider: UsersProvider) {

      if (this.navParams.data.user) {
        this.model = this.navParams.data.user;
      } else {
        this.model = new User();
      }
  }

  save() {
    this.saveUser()
      .then(() => {
        this.toast.create({ message: 'User saved. Token: ', position: 'botton', duration: 3000}).present();
        //redirect
        this.navCtrl.pop();
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Error on saving user. Error: ' + error.error, position: 'botton', duration: 3000}).present();
      });
  }

  private saveUser() {
    if (this.model.id) {
      return this.usersProvider.update(this.model);
    } else {
      return this.usersProvider.insert(this.model);
    }
  }
}


export class User {
  id: number;
  email: string;
  password: string;
}
