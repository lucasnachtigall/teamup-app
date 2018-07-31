import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { UserListPage } from '../user-list/user-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RegisterPage;
  tab2Root = HomePage;
  tab3Root = AboutPage;
  tab4Root = ContactPage;
  tab5Root = LoginPage;
  tab6Root = UserListPage;

  constructor() {

  }
}
