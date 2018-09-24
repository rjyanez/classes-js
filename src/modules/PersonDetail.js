import Component from './component.js'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    .card__user-card-container {
      text-align: center;
      display: inline-block;
      padding: 20px;
      width: 100%;
      height: 50vh;
      border: 0.5px solid #efe9e9;
      font-family: Helvetica;
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .card__user-card-container:hover {
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .card__hidden-content {
      display: none;
    }

    .card__block-content {
      display: block !important;
    }

    .card__details-btn {
       background-color: #2ecc71;
      color: #ecf0f1; 
    }
    .card__details-btn:hover, .card__details-btn:focus {
       background-color: #27ae60;
    } 
    button {
      margin-bottom: 8px;
      padding: 12px 24px;
      position: relative;
      display: block;
      margin: 30px auto;
      padding: 12px 24px;
      overflow: hidden;
      border-width: 0;
      outline: none;
      border-radius: 2px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, .6);  
      transition: background-color .3s;
    }    
    button:before {
      content: "";  
      position: absolute;
      top: 50%;
      left: 50%;  
      display: block;
      width: 0;
      padding-top: 0;    
      border-radius: 100%;  
      background-color: rgba(236, 240, 241, .3);  
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
    button:active:before {
      width: 120%;
      padding-top: 120%;  
      transition: width .2s ease-out, padding-top .2s ease-out;
    }
    card__name {
      padding: 10px;
    }
  </style>
<div class="card__user-card-container">
  <h2 class="card__name">
    <span class="card__full-name"></span> (
    <span class="card__user-name"></span>)
  </h2>
  <p>Website: <a class="card__website"></a></p>
  <div class="card__hidden-content">
    <p class="card__address"></p>
  </div>
  <button class="card__details-btn" type="button">More Details</button>
</div>
`

export default class PersonDetail extends Component {

  constructor(parent){
    super(parent)
    this._user = (this.user || {})
    this.dom.appendChild(template.content.cloneNode(true))     
    this.dom.querySelector('button.card__details-btn').addEventListener('click', e => {
      this.toggleCard()
    })     
  }
    
  get user() { return this._user }
  
  set user(newvalue){
    if(newvalue){
      this._user = newvalue
      this.render(this._user)      
    }
  }
   
  render(userData) {
    this.dom.querySelector('.card__full-name').innerHTML = userData.name;
    this.dom.querySelector('.card__user-name').innerHTML = userData.username;
    this.dom.querySelector('.card__website').innerHTML = userData.website;
    this.dom.querySelector('.card__address').innerHTML = `<h4>Address</h4>
    ${userData.address.suite}, <br />
    ${userData.address.street},<br />
    ${userData.address.city},<br />
    Zipcode: ${userData.address.zipcode}`
  }

  toggleCard() {
    let elem = this.dom.querySelector('.card__hidden-content');
    let btn = this.dom.querySelector('.card__details-btn');
    btn.innerHTML = elem.style.display == 'none' ? 'Less Details' : 'More Details';
    elem.style.display = elem.style.display == 'none' ? 'block' : 'none';
  }
}

