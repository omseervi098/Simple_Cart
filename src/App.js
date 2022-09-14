import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
class App extends React.Component {
  constructor() {
    super(); //while inheriting React.component first we need to do call constructor of component by using super()
    this.state = {
      products: [],
      loading: true,
    };
  }
  componentDidMount() {
    firebase
      .firestore()
      .collection("products")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs);
        snapshot.docs.map((doc) => {
          console.log(doc.data);
        });
        const products = snapshot.docs.map((doc) => {
          const data=doc.data();
          data["id"]=doc.id;
          return data;
        });
        this.setState({ products,loading: false });
      });
  }
  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    const docRef=firebase.firestore().collection("products").doc(products[index].id);
    docRef.update({
      qty:products[index].qty+1
    }).then(()=>{
      console.log("updated");
    })
    .catch(error=>{
      console.log(error);
    });

  };
  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].qty <= 1) {
      this.handleDeleteProduct(products[index].id);
      return;
    }
    const docRef=firebase.firestore().collection("products").doc(products[index].id);
    docRef.update({
      qty:products[index].qty-1
    }).then(()=>{
      console.log("updated");
    })
    .catch(error=>{
      console.log(error);
    });
  };
  handleDeleteProduct = (id) => {
    console.log("delete", id);
    const { products } = this.state;
    const docRef=firebase.firestore().collection("products").doc(id);
    docRef.delete().then(()=>{
      console.log("deleted");
    }).catch(error=>{
      console.log(error);
    })
  };
  getCartCount = () => {
    const { products } = this.state;
    let cnt = 0;
    products.forEach((product) => {
      cnt += product.qty;
    });
    return cnt;
  };
  getCartTotal = () => {
    const { products } = this.state;
    let cartTotal = 0;
    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price;
    });
    return cartTotal;
  };
  addProduct=()=>{
    firebase
    .firestore()
    .collection("products")
    .add({
      img:'',
      price:700,
      qty:1,
      title:'Washing Machine'
    }).then((docRef)=>{
      console.log("Document added ");
    }).catch((error)=>{
      console.error("Error adding document: ",error);
    });
  }
  render() {
    const { products,loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct}>Add Product</button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDelete={this.handleDeleteProduct}
        />
        {loading && <div>Loading...</div>}
        <div> TOTAL : {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
