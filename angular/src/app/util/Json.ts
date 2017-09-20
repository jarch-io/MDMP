/*export class Json {
  private static instance : Json;

  private constructor(){}

  public static getInstance() : Json {
    if(!Json.instance){
      Json.instance = new Json();
    }

    return Json.instance;
  }

  public toString(obj : any) : string {
    let s : any[] = [];

    for(let i in obj){
      let v = obj[i];

      if(typeof v === "object"){

      }else {
        s.push(i+"="+v);
      }
    }

    return s.join("&");
  }
}*/

export function json_to_string(obj : any) : string {
  let s : any[] = [];

    for(let i in obj){
      let v = obj[i];

      if(typeof v === "object"){

      }else {
        s.push(i+"="+v);
      }
    }

    return s.join("&");
}
