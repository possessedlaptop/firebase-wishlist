import React from "react";
import Wishlist1 from "./components/wishlist-1";
import Wishlist2 from "./components/wishlist-2";
import { GiPartyPopper } from "react-icons/gi";
import Wishlist from "./components/wishlist";

const style = {
  bg: "h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]",
  container: "bg-slate-100 rounded-md p-4 max-w-[1500px] w-full mx-auto",
  title: "text-3xl font-bold text-center align-middle",
  grid: "grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4",
  titleRow: "flex items-center justify-between overflow-hidden",
  slothLeft: "w-auto min-w-[100px] max-w-[200px] h-30 overflow-clip",
  slothRight: "w-auto min-w-[100px] max-w-[200px] h-30 trasform -scale-x-100 object-cover",
  toffeeEaster: "object-contain",
}

function App() {
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.titleRow}>
          <img className={style.slothLeft} src={require("./images/pngegg(1).png")} alt="" />
          <GiPartyPopper size={100} />
          <h3 className={style.title}>Welcome to the wishlist</h3>
          <GiPartyPopper size={100} style={{ transform: "scaleX(-1)" }}/>
          <img className={style.slothRight} src={require("./images/pngegg(1).png")} alt="" />

        </div>
        <div className={style.grid}>
          < Wishlist user="Jacqui" />
          < Wishlist user="Renzo" />
          < Wishlist user="Toffee" />
          <div>
          Toffee se nos colo esta navidad aqui.
          <img className={style.toffeeEaster} src={require("./images/toffee.jpg")} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
