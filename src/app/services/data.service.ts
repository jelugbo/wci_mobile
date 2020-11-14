import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpClientJsonpModule} from "@angular/common/http";
import { map } from 'rxjs/operators';
import {SearchResult} from "./searchResult";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public defLink = 'https://winnerschapelny.org/api/';
  constructor(public http: HttpClient, private jsonp:HttpClientJsonpModule) {
    console.log('Hello Data Provider');
  }

  fetchData(path:string, urlParam: string, restricted?: boolean){
    let authHeader = new HttpHeaders();
    let searchParams =  (urlParam.indexOf('=') > 0)  ?  new HttpParams({fromString: urlParam}):new HttpParams();
    console.log(searchParams);
    path = (path.indexOf('://') > -1) ? path : this.defLink + path ;//+ localStorage.getItem("ParishId");
    if(restricted) authHeader.append('Authorization', 'Bearer '+ localStorage.getItem("LoginId"));
    let itemList = this.http.get<SearchResult>(path,{params:searchParams,headers:authHeader}).pipe(map(
        response =>response
    ));
    console.log(itemList);
    return itemList;
  }

  getData(path:string, urlParam: string, restricted?: boolean){
    let authHeader = new HttpHeaders();;
    let searchParams =  (urlParam.indexOf('=') > 0)  ?  new HttpParams({fromString: urlParam}):new HttpParams();
    //console.log(searchParams);
    path = (path.indexOf('://') > -1) ? path : this.defLink + path;
    //console.log(path);
    if(restricted) authHeader.append('Authorization', 'Bearer '+ localStorage.getItem("LoginId"));
    let itemList = this.http.get(path,{params:searchParams,headers:authHeader}).pipe(map(response =>response));
    return itemList;
  }

  fetchJsonp(path:string){
    path = (path.indexOf('://') > -1) ? path : this.defLink + path + localStorage.getItem("ParishId");
    //console.log(path);
    let itemList = this.http.jsonp(path,'callback').pipe(map(response => response));
    //console.log(itemList);
    return itemList;
  }

  loadJSON(path:string){
    let itemList = this.http.get(path).pipe((response =>response));
    //console.log(itemList);
    return itemList;
  }

  fetchUserData(path:string, urlParam: string, restricted?: boolean, profiled?: boolean){
    let authHeader = new HttpHeaders();;
    let searchParams =  (urlParam.indexOf('=') > 0)  ?  new HttpParams({fromString: urlParam}):new HttpParams();
    //console.log(searchParams);
    path = (path.indexOf('://') > -1) ? path : this.defLink + path ;//+ localStorage.getItem("ProfileId");
    path = profiled? path+ localStorage.getItem("ProfileId"):path;
    console.log(path);
    if(restricted) authHeader.append('Authorization', 'Bearer '+ localStorage.getItem("LoginId"));
    let itemList = this.http.get(path,{params:searchParams,headers:authHeader}).pipe((response =>response));
    console.log(itemList);
    return itemList;
  }

  sendData(path:string, data: String, restricted?: boolean){
    let authHeader = new HttpHeaders();;
    path = (path.indexOf('://') > -1) ? path : this.defLink + path;
    if(restricted) authHeader.append('Authorization', 'Bearer '+ localStorage.getItem("LoginId"));
    let  itemList = this.http.post<SearchResult>(path, data, {headers:authHeader}).pipe(map(response =>response));
    return itemList;
  }

  putData(path:string, data: String, restricted?: boolean){
    let authHeader = new HttpHeaders();;
    path = (path.indexOf('://') > -1) ? path : this.defLink + path;
    if(restricted) authHeader.append('Authorization', 'Bearer '+ localStorage.getItem("LoginId"));
    let  item = this.http.put(path, data, {headers:authHeader}).pipe(map(response =>response));
    return item;
  }

  removeData(path:string, urlParam: string, restricted?: boolean){
    let authHeader = new HttpHeaders();
    let bodyParams =  (this.isJSON(urlParam))  ?  new HttpParams({fromString: urlParam}):new HttpParams();
    //console.log(bodyParams);
    path = (path.indexOf('://') > -1) ? path : this.defLink + path;
    if(restricted) authHeader.append('Authorization', 'Bearer '+ localStorage.getItem("LoginId"));
    let itemList = this.http.delete(path,{params:bodyParams,headers:authHeader}).pipe(map(response =>response));
    //console.log(itemList);
    return itemList;
  }

  isJSON(str){
    try{ JSON.parse(str); }catch(e){ return false; }
    return true;
  }
}
