import { React, Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Row, Col, FormFeedback} from 'reactstrap';
import { Control } from 'react-redux-form';

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

    handleSubmit (event) {
        console.log('Current state is: ', JSON.stringify(this.state));
        this.toggleModal();
        event.preventDefault();
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

export default CommentForm;