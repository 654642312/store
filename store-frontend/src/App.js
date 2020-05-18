import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//Components
import Navigation from './components/navigation';
import Banner from './components/banner';
import ProductForm from './components/productForm';
import AllProducts from './components/allProducts';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      data: []
    }
  }

  async componentDidMount(){
    this.showProducts();
  }

  showProducts = async () => {
    let res = await fetch('http://localhost:4000/api/products')
    let products = await res.json();
    
    this.setState({
      data: products
    });
  }

  deleteProduct = async  id => {
    await fetch('http://localhost:4000/api/products/' + id, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => console.log(res))
    this.showProducts()
  }

  render(){
    return (
      <div>
        <Navigation/>
        <Router>
          <Route exact path="/" render={() => {
            return (
              <div>
                <Banner/>
                <div className="row mt-2 mr-2 ml-2">
                  {this.state.data.map((product, i)=>(
                    <AllProducts 
                      product={product} 
                      key={this.state.data[i].id}
                      deleteProduct={() => this.deleteProduct(this.state.data[i].id)} 
                    />
                  ))}
                </div>
              </div>
            )
          }}
          />      
        <Route exact path="/create" render={() => {
            return (
              <div className="container col-5">
                 <ProductForm/>
              </div>
            );
          }}
          />   
          <Route exact path="/products" render={() => {
            return <h1>product</h1>
          }}
          />    
        </Router>
      </div>  
    );
  }
}

export default App;
