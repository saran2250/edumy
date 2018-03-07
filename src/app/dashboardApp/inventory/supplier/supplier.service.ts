import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http } from '@angular/http';
import { Supplier } from './supplier';

@Injectable()
export class SupplierService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private suppliersUrl = 'api/suppliers';  // URL to web api
  constructor(private http: Http) { }
  suppliers: Supplier[];
  getSuppliers(): Promise<Supplier[]> {
    return this.http.get(this.suppliersUrl)
      .toPromise()
      .then(response => response.json().data as Supplier[])
      .catch(this.handleError);
  }
  create(supplier: Supplier): Promise<Supplier> {
    return this.http
      .post(this.suppliersUrl, JSON.stringify(supplier), {headers: this.headers})
      .toPromise().then(res => res.json().data as Supplier)
      .catch(this.handleError);
  }
  getSupplier(id: number): Promise<Supplier> {
    debugger;
    const url = `${this.suppliersUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Supplier)
      .catch(this.handleError);
  }
  update(supplier: Supplier): Promise<Supplier> {
    const url = `${this.suppliersUrl}/${supplier.id}`;
    return this.http
      .put(url, JSON.stringify(supplier), {headers: this.headers})
      .toPromise()
      .then(() => supplier)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.suppliersUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
