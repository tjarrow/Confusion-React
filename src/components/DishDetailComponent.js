import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, 
    Label, Row, Col, FormFeedback, Card, CardImg, CardText, CardTitle,
    Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Control } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: '1',
            name: '',
            comment: '',
            touched: {
                name: false
            },
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleInputChange (event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState ({
            [name]: value
        })
    }

    handleSubmit (values) {
        values = this.state;
        console.log('Current state is: ', JSON.stringify(this.state));
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate(name) {
        const errors = {
            name: ''
        };

        if (this.state.touched.name && name.length < 2)
            errors.name = 'Must be greater than 2 characters';
        else if (this.state.touched.name && name.length > 15)
            errors.name = 'Must be 15 characters or less';

        return errors;
    }
    
    render() {
        const errors = this.validate(this.state.name);

        return (
            <div>
                <Row className="form-group">
                    <Col md={{size:10}}>
                        <Button type="submit" className="btn btn-outline-secondary mt-2" onClick={this.toggleModal}>
                            <i className="fa fa-pencil mr-1"></i>
                            Submit Comment
                        </Button>
                    </Col>
                </Row>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                    </Control.select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Your Name</Label>
                                <Input type="text" placeholder="Your Name" id="name" name="name"
                                    value={this.state.name}
                                    valid={errors.name === ''}
                                    invalid={errors.name !== ''}
                                    onBlur={this.handleBlur('name')}
                                    onChange={this.handleInputChange}
                                    required
                                    />
                                <FormFeedback>{errors.name}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                        value={this.state.comment}
                                        onChange={this.handleInputChange}
                                        rows="7"
                                        className="form-control" />    
                            </FormGroup>
                            <Button type="submit" color="primary">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

class DishDetail extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        if (this.props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }

        function RenderComments ({commentItems, addComment, dishId}) {
            return (
                <div className="col-12 col-md-5 m-1">
                    {commentItems.map((comment) => {
                        return (       
                        <div className="row">
                            <div className='col-12  m-1' key={comment.id}>
                                <div className="row mt-1 mb-1" >
                                    {comment.comment}
                                </div>
                                <div className="row mt-1 mb-1" >
                                    --{comment.author}
                                    <span className="ml-1 mr-1"> , </span>
                                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                </div>
                            </div>
                        </div>
                        )
                        })}
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            ); 
        }   
            
        
        function RenderMenuItem ({dish, onClick}) {
            return (
                <Card>
                    <Link to={`/menu/${dish.id}`} >
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardText className="mt-4">
                            <CardTitle className="p-3 text-bold">{dish.name}</CardTitle>
                        </CardText>
                        <CardText className="mb-4">
                            <p className="p-3">{dish.description}</p>
                        </CardText>
                    </Link>
                </Card>
            );
        }
        if (this.props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderMenuItem dish={this.props.dish}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4 className="p-0">Comments</h4>
                            <RenderComments commentItems={this.props.comments} 
                                addComment={this.props.addComment}
                                dishId={this.props.dish.id}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default DishDetail;