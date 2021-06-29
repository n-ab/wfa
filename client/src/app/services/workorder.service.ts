import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workorder } from '../models';

@Injectable({
  providedIn: 'root'
})
export class WorkorderService {

  constructor(private http: HttpClient) { }

  fetchWorkorders(): Promise<object[]> {
    return this.http.get('/api/admin/fetchWorkorders').toPromise()
      .then(workOrders => workOrders)
      .catch(err => err);
  }

  editWorkorder(change: any): Promise<object> {
    return this.http.post('/api/admin/editWorkorder', {params: {change}}).toPromise()
      .then(workOrder => workOrder)
      .catch(err => err);
  }
}
