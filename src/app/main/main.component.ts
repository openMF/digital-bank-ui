import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterState } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Action, HttpClientService } from '../services/http/http.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store';
import { LOGOUT } from '../store/security/security.actions';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, map, filter } from 'rxjs/operators';
import { MENU_ITEMS } from './main-menu';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-main',
  styleUrls: ['main.component.scss'],
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  menu = MENU_ITEMS;
  private routerEventSubscription: Subscription;
  isLoading$: Observable<boolean>;
  tenant$: Observable<string>;
  username$: Observable<string>;

  constructor(
    private router: Router,
    private titleService: Title,
    private httpClient: HttpClientService,
    private store: Store<fromRoot.State>,
    private menuService: NbMenuService,
  ) {}

  ngOnInit(): void {
    this.routerEventSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.getTitle(this.router.routerState, this.router.routerState.root).join(' - ')),
      )
      .subscribe(title => this.titleService.setTitle(title));

    this.tenant$ = this.store.select(fromRoot.getTenant);
    this.username$ = this.store.select(fromRoot.getUsername);

    this.menuService.onItemClick().subscribe(event => {
      this.onContecxtItemSelection(event.item.title);
    });
  }

  onContecxtItemSelection(title) {
    if (title === 'Log out') {
      this.logout();
    }
    if (title === 'Settings') {
      this.goToSettings();
    }
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.isLoading$ = this.httpClient.process.pipe(
      debounceTime(1000),
      map((action: Action) => action === Action.QueryStart),
    );
  }

  getTitle(state: RouterState, parent: ActivatedRoute): string[] {
    const data = [];

    if (parent && parent.snapshot.data) {
      const dataProperty: any = parent.snapshot.data;

      if (dataProperty.title) {
        data.push(dataProperty.title);
      }
    }

    if (state && parent) {
      data.push(...this.getTitle(state, parent.firstChild));
    }

    return data;
  }

  logout(): void {
    this.store.dispatch({ type: LOGOUT });
  }

  goToSettings(): void {
    this.router.navigate(['/user']);
  }
}
