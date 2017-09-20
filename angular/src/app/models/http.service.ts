import { Injectable } from '@angular/core';
import { Http, XHRBackend, Headers, Request, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

import { Toast } from '../commons/commons/Toast';

/**
 * Extensión personalizada de la clase HTTP
 * Permite la configuración de todas las peticiones
 * Captura los envíos y respuestas
 * */
@Injectable()
export class HttpService extends Http {

  public apiUrl = 'http://localhost:3000/';

  constructor(
      backend : XHRBackend,
      defaultOptions : RequestOptions
    ){
    super(backend,defaultOptions);
  }

  /**
   * Reescribe el método de la clase base, ejecutando acciones para cada petición
   * La peticiíón en curso puede llegar como una ruta o una clase request
   * Si viene sólo la cadena, debería traer las opciones aparte
   * */
   request(request : string | Request, options : RequestOptionsArgs = {headers : new Headers()}) : Observable<Response> {
     this.configureRequest(request, options);
     return this.interceptResponse(request, options);
   }

   private configureRequest(request : string | Request, options : RequestOptionsArgs) : void {
     if(typeof request === "string"){
       request = this.getProxyUrl(request);
       this.setHeaders(request);
     }else{
       request['url'] = this.getProxyUrl(request['url']);
       this.setHeaders(options);
     }
   }

   private interceptResponse(request : string | Request, options : RequestOptionsArgs) : Observable<Response> {
     const observableRequest = super
           .request(request, options)
           .catch(this.onCatch())
           .finally(this.onFinally());
      return observableRequest;
   }

   private onCatch() {
     return (res : Response) => {
       //errores de seguridad
       if(res.status === 401 || res.status === 403) {
         //pedir credenciales al usuario
       }

       //vista de errores de usuario
       if(res.status === 400 || res.status === 500) {
         new Toast(res.status,res.json().error);
       }

       //gestion comun de otros errores
       return Observable.throw(res);
     }
   }

   private onFinally() {
     return () => console.log("Finalizado");
   }

   /**
   * Interceptor para componer las cabeceras en cada petición
   * */
   private setHeaders(objectToHeadersTo : Request | RequestOptionsArgs) : void {
     const headers = objectToHeadersTo.headers;
     headers.set("Content-Type", "application/json");
   }

   /**
   * Transforma la url para llamar a trave´s de un proxy 
   * Útil en caso de problemas con el CORS
   */
  private getProxyUrl(currentUrl){
    if(!currentUrl.includes('/assets/')){
      return this.apiUrl + currentUrl;
    }else{
      return currentUrl;
    }
  }

}
