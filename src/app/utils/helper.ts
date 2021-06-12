import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Helper {

    constructor(){}

    returnMsgToRequest(response: any) {
        switch (response.status) {
          case 200: {
            return response;
          }
      
          case 400: {
            response.message = response.error;
            return response;
          }
      
          case 404: {
            response.message = response.error;
            return response;
          }
      
          case 500: {
            response.message = response.error;
            return response;
          }
      
          case 600: {
            response.message = response.error;
            return response;
          }
      
          default: {
            response.message = response.error;
            return response;
          }
        }
      }
}