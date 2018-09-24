import Component from './component.js'
import PersonDetail from './PersonDetail.js'
import PeopleList from './PeopleList.js'

const template = document.createElement('template')

template.innerHTML = `
  <style>
  .countend{
    margin: 10% auto;
    display: flex;
    justify-content: space-around;
  }
</style> 
`
export default class PeopleController extends Component {
  constructor(parent) {
      super(parent)
      this._list =  (this.list || [])
      this.dom.appendChild(template.content.cloneNode(true))
      this.dom.classList.add('countend')

      this.PersonDetail = new PersonDetail(this.dom)
      this.PeopleList = new PeopleList(this.dom)

      this.fetchAndPopulateData(this)
  }

  fetchAndPopulateData(self) {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.text())
      .then((responseText) => {
        self.list = JSON.parse(responseText)
        this.PersonDetail.user = self.list[0]
        this.PeopleList.list = self.list
        this.attachEventListener(this)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  attachEventListener(self) {
    let list = self.list
    self.dom.addEventListener('PersonClicked', (e) => {
      e.stopPropagation()
      for(let i=0; i< list.length; i++ ){
        if (list[i].id == e.detail.personId) {
          self.PersonDetail.user = self.list[i]
        }
      }
    })
  }
}
