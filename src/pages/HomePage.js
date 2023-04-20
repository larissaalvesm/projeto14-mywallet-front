import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import api from "../axios";
import Transaction from "../components/Transaction";
import Context from "../contexts/Context";

export default function HomePage({ setTransacao }) {

  const [transacoes, setTransacoes] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const token = localStorage.getItem("token");
  const { nome } = useContext(Context);

  function criarTransacao(tipo) {
    setTransacao(tipo);
  }

  useEffect(() => {
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
  }, [])
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {nome}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <Transactions>
          {transacoes.map(t => <Transaction key={t._id} valor={t.valor} descricao={t.descricao} dataHora={t.dataHora} tipo={t.tipo} />)}
        </Transactions>
        <article>
          <strong>Saldo</strong>
          <Value color={saldo > 0 ? "positivo" : "negativo"}>{saldo.toFixed(2).toString()}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <Link to={"/nova-transacao/entrada"}>
          <button onClick={() => criarTransacao("entrada")}>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
        </Link>
        <Link to={"/nova-transacao/saida"}>
          <button onClick={() => criarTransacao("saida")}>
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
const TransactionsContainer = styled.article`
  max-height: calc(100vh - 275px);
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    bottom: 5px; 
    display:flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
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
`