import Component from './component.js'

const template = document.createElement('template')

  template.innerHTML = `
    <style>
      .people-list__container {
        border: 0.5px solid #efe9e9;
        width: 100%;
        padding: 20px;
        height: 50vh;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      }
      .people-list__list {
        list-style: none
      }
      .people-list__list > li {
        font-size: 20px;
        font-family: Helvetica;
        color: #000000;
        text-decoration: none;
        cursor:pointer;
        padding: 5px;
      }
      .people-list__list > li:hover {
        color: #2ecc71;
      }
    </style>
    <div class="people-list__container">
      <ul class="people-list__list"></ul>
    </div>
  `
  export default class PeopleList extends Component {
  
    constructor(parent) {
    super(parent)
    this._list = (this.list || {})
    this.dom.appendChild(template.content.cloneNode(true))       
  }

  get list() { return this._list }
  
  set list(newValue){
    if(newValue){
      this._list = newValue
      this.render(this._list)      
    }
  }
  
  render(list) {
    let ulElement = this.dom.querySelector('.people-list__list');
    ulElement.innerHTML = ''
    list.forEach(person => {
      let li = this.createPersonListElement(person)
      ulElement.appendChild(li);
    })
  }

  createPersonListElement(person) {
    let li = document.createElement('li')
    li.innerHTML = person.name
    li.className = 'people-list__name'
    li.onclick = function () {
      var event = new CustomEvent("PersonClicked", {
        detail: {
          personId: person.id
        },
        bubbles: true
      })
      this.dispatchEvent(event)
    }
    return li
  }

}