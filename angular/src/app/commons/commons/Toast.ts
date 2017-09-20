declare let $ : any;

export class Toast {
  private code : number;
  private message : string | any[];
  private container : any = $(".alerts-wrapper");

  constructor (code : number, messages : string | any[]) {
    this.code = code;
    this.message = messages;

    this.render();
  }

  private render() : void {
    if(this.existsContainer){
      let alert = $("<div>",{
        class : "card-panel jio-alert "+((this.code >= 400) ? "error" : "success"),
        click : function (evt) {
           alert.remove();
        },
        html : '<p>'+
                  this.parseMessage()+
                '</p>'
      })

      setTimeout(() => alert.remove(),3000);

      this.container.append(alert);
    }
  }

  private existsContainer() : boolean {
    if(this.container.length != 0) return true;

    return false;
  }

  private parseMessage() : string {
    let msg = '';

    if(typeof this.message === "string") msg = this.message;

    if(typeof this.message === "object"){
      if(this.message["errors"]){
        msg += this.message["message"]+
            '<ul>';

        for(let i in this.message["errors"]) {
          msg += '<li>'+this.message["errors"][i]+'</li>';
        }

        msg += '</ul>';

      }else {
        msg = this.message["message"];
      }
    }

    return msg;
  }
}
