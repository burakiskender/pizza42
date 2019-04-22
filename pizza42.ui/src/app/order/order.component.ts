import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { AUTH_CONFIG } from '../config/auth.config';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  _message: string;
  _apiUrl: string;
  _menu: Array<string>;
  _order: IPizzaOrder;

  constructor(public authService: AuthService, private http: HttpClient, private toastr: ToastrManager) {
    this._apiUrl = AUTH_CONFIG.apiUrl;
    this._order = { selectedItem: '' };
  }

  ngOnInit() {
    this.getMenu();
  }
  onSelectionChange(item): void {
    this._order.selectedItem = item;
  }

  public getMenu(): void {
    this.http
      .get(`${this._apiUrl}/api/menu`, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.authService.accessToken}`
        )
      })
      .subscribe(
        data => {
          this._menu = (data as IPizzaApiMenuRespose).menu;
        },
        error => (this._message = error)
      );
  }

  public placeOrder(selectedItem): void {
    this.http
      .post(`${this._apiUrl}/api/placeOrder`, {selectedItem}, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .subscribe(
        data => {
          const response = (data as IPizzaApiOrderResponse);
          this.toastr.successToastr(`Your order of ${response.order.selectedItem} pizza has been placed`,
          `Success! (order:${response.orderId})`,
          {position: 'bottom-right', animate: 'slideFromBottom'});

        },
        error => (this._message = error)
      );
  }

  hasUserAccess() {
      return this.authService.userHasScope('create:orders');
  }
}
