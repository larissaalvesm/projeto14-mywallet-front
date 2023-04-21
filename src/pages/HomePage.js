import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axios";
import Transaction from "../components/Transaction";

export default function HomePage() {

  const [transacoes, setTransacoes] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const token = localStorage.getItem("token");
  const nome = localStorage.getItem("user");
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  useEffect(() => {

    if (!token) {
      navigate("/");
    } else {
      const request = api.get("/transacoes", { headers: { Authorization: `Bearer ${token}` } });

      request.then(response => {
        setTransacoes(response.data);
        const entradas = response.data.filter(t => t.tipo === "entrada");
        const saidas = response.data.filter(t => t.tipo === "saida");
        const entradasPositivas = entradas.map(e => Number(e.valor));
        const saidasNegativas = saidas.map(s => -Number(s.valor));
        const todasTransacoes = [...entradasPositivas, ...saidasNegativas];
        const saldo = Number(todasTransacoes.reduce((a, b) => a + b, 0));
        setSaldo(saldo);
      })
    }
  }, [])
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {nome}</h1>
        <BiExit onClick={logOut} />
      </Header>

      <TransactionsContainer transacoes={transacoes}>
        <Transactions transacoes={transacoes}>
          {transacoes.map(t => <Transaction key={t._id} valor={t.valor} descricao={t.descricao} dataHora={t.dataHora} tipo={t.tipo} />)}
        </Transactions>
        <Saldo transacoes={transacoes}>
          <strong>Saldo</strong>
          <Value color={saldo >= 0 ? "positivo" : "negativo"}>{saldo.toFixed(2).toString()}</Value>
        </Saldo>
        <p>Não há registros de<br /> entrada ou saída</p>
      </TransactionsContainer>


      <ButtonsContainer>
        <Link to={"/nova-transacao/entrada"}>
          <button>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
        </Link>
        <Link to={"/nova-transacao/saida"}>
          <button>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </button>
        </Link>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.div`
  max-height: calc(100vh - 275px);
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p{
    height: 100%;
    display: ${(props) => (props.transacoes.length !== 0 ? "none" : "flex")};
    font-size: 20px;
    color: #868686;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`
const Saldo = styled.div`
    bottom: 5px; 
    display: ${(props) => (props.transacoes.length === 0 ? "none" : "flex")};
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  gap:15px;
  
  button {
    width: 45vw;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const Transactions = styled.div`
    overflow-y: scroll;
    display: ${(props) => (props.transacoes.length === 0 ? "none" : "flex")};
    flex-direction: column;
`