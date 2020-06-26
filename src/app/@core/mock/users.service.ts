import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Contacts, RecentUsers, UserData } from '../data/users';

@Injectable()
export class UserService extends UserData {
  private time: Date = new Date();

  private users = {
    nick: { name: 'Nick Jones', picture: 'assets/images/nick.png' },
  };
  private types = {
    mobile: 'mobile',
    home: 'home',
    work: 'work',
  };
  private contacts: Contacts[] = [
    { user: this.users.nick, type: this.types.mobile },
  ];
  private recentUsers: RecentUsers[] = [
    {
      user: this.users.nick,
      type: this.types.mobile,
      time: this.time.setHours(5, 29),
    },
  ];

  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getContacts(): Observable<Contacts[]> {
    return observableOf(this.contacts);
  }

  getRecentUsers(): Observable<RecentUsers[]> {
    return observableOf(this.recentUsers);
  }
}
