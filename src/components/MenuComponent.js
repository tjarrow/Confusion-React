import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import DishDetail from './DishDetailComponent';

import { Link } from 'react-router-dom';

    
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        };
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish});
    }


    // RenderMenuItem ({dish, onClick}) {
    //     return (
    //         <Card>
    //             <Link to={`/menu/${dish.id}`} >
    //                 <CardImg width="100%" src={dish.image} alt={dish.name} />
    //                 <CardImgOverlay>
    //                     <CardTitle>{dish.name}</CardTitle>
    //                 </CardImgOverlay>
    //             </Link>
    //         </Card>
    //     );
    // }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div  className="col-12 col-md-5 m-1">
                <Card key={dish.id}
                  onClick={() => this.onDishSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle><Link to={`/menu/${dish.id}`} >{dish.name}</Link></CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    {menu}
                </div>
                {/* <div className="row">
                    {this.state.selectedDish &&
                        <DishDetail dish={this.state.selectedDish} />
                    }
                </div> */}
            </div>
        );
    }
}

export default Menu;