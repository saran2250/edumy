import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { RequestApi } from '../../global.api';
import { Login, Registration, CheckMobileNumber } from '../models/account';
import { ResponseModel } from '../../utilityApp/models/common';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class AccountService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private requestURL = "";  // URL to web api

    constructor(private http: Http) { }

    checkMobileNumberIsEixst(data: CheckMobileNumber, token: string): Promise<ResponseModel> {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token });

        return this.http.post(this.requestURL, data, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as ResponseModel);
    }

    checkStatusCode(statusCode: number): string {
        switch (statusCode) {
            case 200:
                return "successful operation";
            case 400:
                return "Invalid input";
            case 403:
                return "Unauthorized access";
            case 404:
                return "Not Found";
            case 422:
                return "Invalid input";
            case 500:
                return "Unknown error";
            default:
                return "";
        }


    }

}
