import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable()
export class OrdersService {
    configUrl = 'assets/orders.json';
    constructor(private http:HttpClient){
      
    }
    getOrdersData():Observable<any>{
        return this.http.get(this.configUrl);
    }
}