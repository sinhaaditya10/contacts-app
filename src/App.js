import React, {Component} from 'react';
import './App.css';
import Contact from './components/contacts';
import Create from './components/create';
import { Route } from "react-router-dom";
class App extends Component {
  constructor(props){
    super(props);
    this.state=  {
      contacts: [
        {
          "id": "aditya",
          "name":"Aditya Sinha",
          "email":"sinhaaditya10@gmail.com",
          "avatarURL":"https://img.etimg.com/thumb/width-640,height-480,imgsize-432782,resizemode-1,msid-74492248/indians-dont-need-to-panic-yet-about-coronavirus-says-leading-researcher.jpg"
        },
        {
          "id": "akshit",
          "name":"Akshit Garg",
          "email":"akshitmarut98@gmail.com",
          "avatarURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRu3khGW052bPfFWLEvFJH9Tn8_Ax-M79Ht4N-WYfuIqy4qzHHw&usqp=CAU"
        },
        {
          "id": "hims",
          "name":"Himanshu Shekhar",
          "email":"hims01@gmail.com",
          "avatarURL":"https://i.ytimg.com/vi/Iom2eDFKlEk/maxresdefault.jpg"
        }
      ]
    }
  }
  removeContact = (contact) => {
    this.setState((state)=>({
      contacts: state.contacts.filter((c)=>
        c.id!==contact.id
      )}));
  }
  createContact(contact) {
    this.setState(state => ({
      contacts: state.contacts.concat([contact])
    }));
  }
  render(){
  return (
    <div>
      <Route exact path="/" render={() =>(
      <Contact 
      onDeleteContact={this.removeContact}
      contacts={this.state.contacts}/>
      )}
    />
    <Route exact path="/create" render={({history}) => (
      <Create onCreateContact={(contact) => {
        this.createContact(contact);
        history.push("/");
      }}/>
     )}/>
    </div>
  );
  
  }
}

export default App;
