import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, InfiniteScroll } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users'

@IonicPage()
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {
  users: any [];
  page: number;
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private usersProvider: UsersProvider) {
  }

  ionViewDidEnter() {
    this.users = [];
    this.page = 1;
    this.infiniteScroll.enable(true);
    this.getAllUsers(this.page);
  }

  getAllUsers(page){
    this.usersProvider.getAll(page)
      .then((result: any) => {
        for (var i = 0; i < result.data.length; i++ ){
          var user = result.data[i];
          this.users.push(user);
        }

        if (this.infiniteScroll){
          this.infiniteScroll.complete();
          if (this.users.length == result.total){
            this.infiniteScroll.enable(false);
          }
        }
      }).catch((error: any) => {
        this.toast.create({ message: 'Error on create. Error: ' + error.error, position: 'botton', duration: 3000}).present();
      });
  }

  getUsers(){
    setTimeout(() =>{
      this.page++;
      this.getAllUsers(this.page);
    });
  }

  openUser(id: number){
    this.usersProvider.getUser(id)
      .then((result: any) => {
        this.navCtrl.push('UserDetailPage', {user: result.data});
      }).catch((error: any) => {
        this.toast.create({ message: 'Error on getting user. Error: ' + error.error, position: 'botton', duration: 3000}).present();
      });
  }

  openCreateUser() {
    this.navCtrl.push('UserEditPage');
  }

  openEditUser(id: number){
    this.usersProvider.getUser(id)
      .then((result: any) => {
        this.navCtrl.push('UserEditPage', {user: result.data});
      }).catch((error: any) => {
        this.toast.create({ message: 'Error on getting user. Error: ' + error.error, position: 'botton', duration: 3000}).present();
      });
  }

  deleteUser(user: any){
    this.usersProvider.delete(user.id)
      .then((result: any) => {
        let index = this.users.indexOf(user);
        this.users.splice(index,1);

        this.toast.create({ message: 'User deleted.', position: 'botton', duration: 3000}).present();
      }).catch((error: any) => {
        this.toast.create({ message: 'Error on deleting user. Error: ' + error.error, position: 'botton', duration: 3000}).present();
      });
  }
}
