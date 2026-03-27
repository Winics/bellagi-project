import "./cart.css";

export default function Cart({ open, onClose, cartItems, setCartItems }) {

  if (!open && cartItems.length === 0) return null;

  function increase(name) {
    setCartItems(cartItems.map(item =>
      item.name === name ? { ...item, qty: item.qty + 1 } : item
    ));
  }

  function decrease(name) {
    setCartItems(cartItems.map(item =>
      item.name === name && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    ));
  }

  function removeItem(name) {
    setCartItems(cartItems.filter(item => item.name !== name));
  }

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  function handleCheckout() {
    const message = cartItems.map(item =>
      `${item.name} (x${item.qty}) - R$ ${(item.price * item.qty).toFixed(2)}`
    ).join("\n");

    const finalMessage =
      `🛍️ Pedido:\n\n${message}\n\nTotal: R$ ${total.toFixed(2)}`;

    const phone = "5541991902924";

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;

    window.open(url, "_blank");
  }

  return (
    <>
      <div
        className={`cart-overlay ${open ? "show" : ""}`}
        onClick={onClose}
      ></div>

      <div className={`cart ${open ? "open" : ""}`}>

        <button className="close" onClick={onClose}>✕</button>

        <h2>Meu Carrinho ({cartItems.length} itens)</h2>

        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">

              <img src={item.image} alt={item.name} />

              <div className="info">
                <h4>{item.name}</h4>
                <p>R$ {item.price.toFixed(2)}</p>

                <div className="qty">
                  <button onClick={() => decrease(item.name)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increase(item.name)}>+</button>
                </div>
              </div>

              <button
                className="remove"
                onClick={() => removeItem(item.name)}
              >
                🗑️
              </button>

            </div>
          ))}
        </div>

        <div className="cart-footer">
          <h3>Total: R$ {total.toFixed(2)}</h3>
          <button className="checkout" onClick={handleCheckout}>
            Finalizar Compra
          </button>
        </div>

      </div>
    </>
  );
}