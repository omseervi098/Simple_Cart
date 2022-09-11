
import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
class App extends React.Component {
  constructor() {
    super(); //while inheriting React.component first we need to do call constructor of component by using super()
    this.state = {
      products: [
        {
          price: 999,
          title: "Phone",
          qty: 1,
          img: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
          id:1,
        },{
            price: 99,
            title: "Watch",
            qty: 10,
            img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60",
            id:2,
        },
        {
            price: 9,
            title: "Laptop",
            qty: 4,
            img: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
            id:3
        }
      ],
    };
  }
  handleIncreaseQuantity=(product)=>{
    const {products} =this.state;
    const index= products.indexOf(product);
    products[index].qty+=1;
    this.setState({
        products
    })
  }
  handleDecreaseQuantity=(product)=>{
    const {products} =this.state;
    const index= products.indexOf(product);
    if(products[index].qty<=1){
        return;
    }
    
    products[index].qty-=1;
    this.setState({
        products
    })
  }
  handleDeleteProduct=(id)=>{
    console.log('delete',id)
    const {products} =this.state;
    const items=products.filter((item)=>item.id!==id);
    this.setState({
        products:items,
    })
  }
  getCartCount=()=>{
    const {products} =this.state;
    let cnt=0;
    products.forEach((product)=>{
      cnt+=product.qty;
    })
    return cnt;
  }
  getCartTotal=()=>{
    const {products} =this.state;
    let cartTotal=0;
    products.map((product)=>{
      cartTotal=cartTotal+product.qty*product.price
    })
    return cartTotal;
  }
  render(){
    const {products} =this.state;
  return (
    <div className="App">
      <Navbar count={this.getCartCount()}/>
       <Cart 
        products={products}
        onIncreaseQuantity={this.handleIncreaseQuantity}
        onDecreaseQuantity={this.handleDecreaseQuantity}
        onDelete={this.handleDeleteProduct}
        />
        <div> TOTAL : {this.getCartTotal()}</div>
    </div>
  );}
}

export default App;
