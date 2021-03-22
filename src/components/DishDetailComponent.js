import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, CardImgOverlay } from 'reactstrap';
import { Link } from 'react-router-dom';


class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const RenderComments = ({commentItems}) => (
            commentItems.map((comment) => {
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
                ); 
            }));    
        
        function RenderMenuItem ({dish, onClick}) {
            return (
                <Card>
                    <Link to={`/menu/${dish.id}`} >
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                        <CardText>
                            {dish.description}
                        </CardText>
                    </Link>
                </Card>
            );
        }

        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{this.props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderComments commentItems={this.props.comments} />
                 </div>
                 <div className="col-12 col-md-5 m-1">
                    <RenderMenuItem dish={this.props.dish}/>
                 </div>
            </div>
            </div>
        );
    }
}

export default DishDetail;