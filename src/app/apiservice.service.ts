import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }

  //Connecting Frontend to Backend 


    apiUrl= 'http://localhost:3000/expense';


  //get all data

      getAllData():Observable<any>
          {
             return this._http.get(`${this.apiUrl}`);
          }


  //Create Data

      createData(data:any):Observable<any>
      {
        console.log(data,'createapi=>')
        return this._http.post(`${this.apiUrl}`, data);

      }
      

  //Deleting Data

      deleteData(id:any):Observable<any>
      {
        let ids = id;
        return this._http.delete(`${this.apiUrl}/${ids}`);
      }
        
}


