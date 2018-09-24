export default class Component {
 
  constructor(parent){
    this.getFromDom(parent)
    this.getMutationObserver()    
    this.getAttributes()
  }

  getFromDom(parent){
    let div = document.createElement('div')
    div.setAttribute('id', this.makeId())
    if(!parent){
      document.body.appendChild(div)
    } else {
      parent.appendChild(div)
    } 
    this.dom = div
  }

  getAttributes(mutation){
    if(this.dom){
      this.attributes = this.dom.dataset
      if(typeof this.changed == 'function' && mutation){
        this.changed()
      }
    }
  }

  getMutationObserver(){
    let self = this
    if ("MutationObserver" in window) {
      this._observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          self.getAttributes(mutation)
        })
      }).observe(this.dom, { attributes: true, childList: false, characterData: false })
    }
  }

  makeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  
}
