import React, { Component } from 'react';
import {Row, Col, Form, Card, Button} from 'react-bootstrap';
import serializeForm from 'form-serialize';
class Create extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      profileImage: "https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png",
      name: "",
      email: ""
    }
  }
  handleChange = (event) => {
    event.preventDefault();
    if(typeof(event.target.files[0]) !== 'undefined')
      this.setState({profileImage: window.URL.createObjectURL(event.target.files[0])});
    else{
      alert("Please upload an image");
    }
  }
  onSubmit = (event) => {
    event.preventDefault();
    const values= serializeForm(event.target, {hash: true});
    Object.assign(values, {id: this.state.name, avatarURL: this.state.profileImage});
    if(this.props.onCreateContact)
      this.props.onCreateContact(values);

  }
  onChange = (event) => {
    const field= event.target.name;
    switch(field)
    {
      case "name":
        this.setState({name: event.target.value});
        break;
      case "email": 
        this.setState({email: event.target.value});
        break;
    }
  }
    render()
    {
        return(
            <div>
              <Row style={{marginTop: "10%"}}>
                <Col align="center">
                <Card style={{padding: "1rem", width: "40%"}}>
                  <Form onSubmit={this.onSubmit}>
                  <Row style={{marginBottom: "1rem", marginTop: "1rem"}}>
                    <Col align="center">
                    <label htmlFor="image">
                      <input type="file" name="avatarURL" id="image" style={{display: "none"}} onChange={this.handleChange}/>
                      <img src={this.state.profileImage} style={{height: "4rem", width: "4rem", fill: "grey", borderRadius: "50%"}}/>
                    </label>
                    </Col>
                  </Row>
                  <Row style={{marginBottom: "1rem"}}>
                    <Col xs={2}>
                      <Form.Label>
                          Name
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Control type="text" placeholder="Enter Name" name="name" onChange={this.onChange}/>
                    </Col>
                  </Row>
                  <Row style={{marginBottom: "2rem"}}>
                    <Col xs={2}>
                      <Form.Label>
                          Email
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Control type="text" placeholder="Enter Email Address" name="email" onChange={this.onChange}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <Button variant="primary" type="submit" style={{width: "100%"}}>
                      Create Contact
                    </Button>
                    </Col>
                  </Row>
                  </Form>
                </Card>
                </Col>
              </Row>
            </div>
        )
    }
}
export default Create;