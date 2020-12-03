import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";

export interface CookieText {
    cookie: string;
}

@Injectable()
export class CookieService {

    queryUrl: string = "/api/cookie";

    constructor(private http: HttpClient) {}

    async getCookies(n = 1): Promise<CookieText[]> {
        // const queryString = this.queryUrl + `?count=${n}`;
        // return this.http.get<CookieText>(queryString).toPromise();

        const params = (new HttpParams()).set('count', `${n}`);
        // console.info('=> params: ', params);

        // GET /api/cookie?count=n
        const resp = await this.http.get<any>(this.queryUrl, { params }).toPromise();
        console.info('=> resp: ', resp);

        if(n === 1)
            return [ resp as CookieText ];
        
        return resp as CookieText[];
    }

}