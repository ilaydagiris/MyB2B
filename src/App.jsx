import React, { useState } from "react";
import Cart from "./pages/Cart";
import Consumer from "./pages/Consumer";
import Seller from "./pages/Seller";
import Login from "./pages/Login";
import Order from "./pages/Order";

const users = [
{
    name: "Ali Duru",
    email: "aliduru676@gmail.com",
    password: "1234",
    role: "consumer"
  },
  {
    name: "Ahmet Mehmet",
    email: "aliduru676+1@gmail.com",
    password: "1234",
    role: "consumer"
  },
  {
    name: "Ayşe Zeynep",
    email: "aliduru676+2@gmail.com",
    password: "1234",
    role: "consumer"
  },
  {
    name: "Aslı Kayhan",
    email: "aslikayhan574@gmail.com",
    password: "1234",
    role: "seller"
  },
];

function App() {

  const [currentRoute, setCurrentRoute] = useState("login");
  const [currentUser, setCurrentUser] = useState({});
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({});

  return (
    <>
      {currentRoute === "login" && <Login setRoute={setCurrentRoute} setUser={setCurrentUser} users={users} />}
      {currentRoute === "consumer-dashboard" && <Consumer setRoute={setCurrentRoute} user={currentUser} cart={cart} setCart={setCart} />}
      {currentRoute === "seller-dashboard" && <Seller setRoute={setCurrentRoute} user={currentUser} users={users} order={order} setOrder={setOrder} />}
      {currentRoute === "cart" && <Cart setRoute={setCurrentRoute} user={currentUser} cart={cart} setCart={setCart} />}
      {currentRoute === "order" && <Order setRoute={setCurrentRoute} user={currentUser} order={order} />}
    </>
  );
}

export default App;
