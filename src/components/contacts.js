import React, { Component } from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import {Cancel, Search, PersonAdd} from '@material-ui/icons';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import { Link } from 'react-router-dom';

class Contacts extends Component{
    constructor(props){
        super(props);
        this.state={
            query: '',
        }
    }
    handleChange = (query) =>{
        this.setState({query: query.target.value});
    }
    clearQuery = () => {
        this.setState({query: ''});
    }
    render(){
        const {contacts, onDeleteContact}= this.props;
        const {query}= this.state;
        let showingContact
        if(query){
            const match= RegExp(escapeRegExp(query),'i');
            showingContact= contacts.filter((contact)=> match.test(contact.name));
        }
        else{
            showingContact= contacts;
        }
        return(
            <div>
                <Row style={{padding: "0.5rem", marginTop: "1rem"}}>
                    <Col xs={0} style={{marginLeft: "1.5rem"}}>
                    <Search style={{marginTop: "0.5rem"}}/>
                    </Col>
                    <Col>
                    <input placeholder="Search Contact" style={{width: "100%", padding: "0.5rem"}} value= {query} onChange={this.handleChange}/>
                    </Col>
                    <Col xs={0} style={{marginRight: "1.5rem"}}><Link to="/create"><PersonAdd className="add-icon" style={{marginTop: "0.5rem"}}/></Link></Col>
                </Row>
                {showingContact.length !== contacts.length && (
                    <div className="pagination">
                        <span>Showing {showingContact.length} of {contacts.length} contacts.</span>
                        <a href="#" onClick={this.clearQuery} style={{marginLeft: "0.3rem"}}>Show All</a>
                        </div>
                )}
            <ol>
                {showingContact.map(contact=>
                <li key={contact.id} className="contact-list-item">
            <Card style={{padding: "0.3rem", margin: "1.5rem"}}>
                <Row>
                    <Col xs={0}>
                        <img className="contact-list-image" src={contact.avatarURL}/>
                    </Col>
                    <Col xs={0} style={{borderLeft: "2px solid rgb(240,240,240)"}}>
                    </Col>
                    <Col style={{marginTop: "0.8rem", marginLeft: "2rem"}}>
                <Row style={{fontWeight: "bold"}}>{contact.name}</Row>
                <Row style={{fontWeight: "bold"}}>{contact.email}</Row>
                    </Col>
                    <Col xs={0}>
                        <Cancel className="cancel-icon" onClick={()=> onDeleteContact(contact)}/>
                    </Col>
                </Row>
            </Card>
            </li>
            )}
            </ol>
            </div>
        );
    }
}
Contacts.propTypes= {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
}
export default Contacts;