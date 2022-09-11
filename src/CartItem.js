import React from "react";
const CartItem = (props) => {
  const { price, title, qty,img } = props.product;
  return (
    <div className="cart-item">
      <div className="left-block">
        <img style={styles.image} src={img}/>
      </div>
      <div className="right-block">
        <div style={{ fontSize: 25 }}>{title}</div>
        <div style={{ color: "#777" }}>{price}</div>
        <div style={{ color: "#777" }}>Qty: {qty}</div>
        <div className="cart-item-actions">
          <img
            alt="increase"
            onClick={() => props.onIncreaseQuantity(props.product)}
            className="action-icons"
            src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
          />
          <img
            alt="decrease"
            onClick={() => props.onDecreaseQuantity(props.product)}
            className="action-icons"
            src="https://cdn-icons-png.flaticon.com/512/992/992683.png"
          />
          <img
            alt="delete"
            className="action-icons"
            onClick={() => props.onDelete(props.product.id)}
            src="https://cdn-icons-png.flaticon.com/512/3096/3096687.png"
          />
        </div>
      </div>
    </div>
  );
};
const styles = {
  image: {
    height: 130,
    width: 130,
    borderRadius: 10,
    background: "#ccc",
  },
};
export default CartItem;
