import React , {Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Label } from 'reactstrap';
//import { Container , col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { Form, Row ,Col, Container, Button } from 'react-bootstrap';


class Addmovies extends Component {

    constructor (props){
        super(props)
        this.state ={
            name :'',
            opening :'',
            rating : 5 ,
            genre: ''

        }
    }

    changeName = event => {
        console.log("change name")
            this.setState({
            name : event.target.value
        })
    }

    changeopening = event => {
            this.setState({
            opening : event.target.value
    })
}

    changerating = event => {
            this.setState({
            rating : event.target.value
    })
}

    changegenre = event => {
            this.setState({
            genre : event.target.value
    })
}

addMovie =  event =>{
    console.log("add Movie")
    var data = {
        "name": this.state.name,
        "opening": this.state.opening,
        "rating": this.state.rating,
        "genre":this.state.genre, 
    }
    console.log("sending data "+data)
    fetch('http://localhost:8080/movies', 
    {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, 
        body: JSON.stringify(data)
    }).catch(console.log)
  
}

    render(){
        return(
            <div>
                <Container className="App">
                    <center><h1> Add Movie</h1></center>
                <br></br>
                <Form>
                    <Row>
                        <Col>
                            <Label>Name</Label>
                            <Form.Control  placeholder=" name" id="name" type="Text" required  value={this.state.name} onChange={ this.changeName} />
                        </Col>
                        <Col>
                            <Label>Opening</Label>
                            <Form.Control placeholder="opening"  id="opening" type="Text" value={this.state.opening} onChange={ this.changeopening}/>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col>   
                            <Form.Group >
                                <Form.Label>rating "{this.state.rating} "</Form.Label>
                                <Form.Control type="range"   min= "1" max="10" step="1"  id="range" value={this.state.rating} onChange={ this.changerating}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Label>Genre</Label>
                            <Form.Control placeholder="genre" type="Text"  id="genre" value={this.state.genre} onChange={ this.changegenre} /> 
                        </Col>
                    </Row> 
                    <br></br>
                    <Row>
                        <Col>
                            <center><Button type='' onClick={this.addMovie}>Add Movie</Button></center> 
                        </Col>    
                    </Row>  
                </Form>
            
                </Container>      
            </div>

        );
    }

        

}
export default Addmovies