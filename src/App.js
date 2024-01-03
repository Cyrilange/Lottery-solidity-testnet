import React, { useState, useEffect } from "react";
import web3 from "./Web3";
import lottery from "./lottery";

function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);

      setManager(manager);
      setPlayers(players);
      setBalance(balance);
    }

    fetchData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    setMessage("Waiting on transaction success...");

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });

    setMessage("You have been entered!");
  }

  async function handleClick() {
    const accounts = await web3.eth.getAccounts();

    setMessage("Waiting on transaction success...");

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    setMessage("A winner has been picked!");
  }
  return (
    <section className="m-0 vh-100 row justify-content-center align-items-center ">
      <div className="col-auto p-5 test-center text-bg-secondary p-3">
        <h2 className="text-bg-info  p-3 fs-1 text-center">
          Lottery Contract on sepolia testnet
        </h2>
        <p className="text-center m-5">
          This contract is managed by {manager}. There are currently{" "}
          {players.length} people entered, competing to win{" "}
          {web3.utils.fromWei(balance, "ether")} ether!
        </p>

        <form action="" onSubmit={handleSubmit}>
          <h4 className="text-center">Want to try your luck ?</h4>
          <div className="d-flex justify-content-center align-items-center m-5">
            <label htmlFor="" id="enter" className="m-1">
              Amount of ether to enter
            </label>
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
            <button className="m-1 btn btn-info">Enter</button>
          </div>
        </form>

        <h4 className="text-center">Manager pick a Winner</h4>
        <div className="d-flex justify-content-center align-items-center m-5">
          <button className="m-1 btn btn-info" onClick={handleClick}>
            Pick a winner!
          </button>
        </div>

        <h2 className="text-center"> {message}</h2>
      </div>
    </section>
  );
}

export default App;
