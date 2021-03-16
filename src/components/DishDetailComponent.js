import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        const renderComments = this.props.dish.comments.map((comment) => {
            return (
                <div className="row">
                    <div className='col-12  m-1' key={comment.id}>
                        <div className="row mt-1 mb-1" >
                            {comment.comment}
                        </div>
                        <div className="row mt-1 mb-1" >
                            --{comment.author}
                            <span className="ml-1 mr-1"> , </span>
                            {comment.date}
                        </div>
                    </div>
               </div>
            ); 
        });    

        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                        <CardBody>
                            <CardTitle>{this.props.dish.name}</CardTitle>
                            <CardText>{this.props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {renderComments}
                </div>
            </div>
        );
    }
}

export default DishDetail;