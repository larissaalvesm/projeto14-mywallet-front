import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

export default function TransactionsPage({ transacao }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {

    if (!token) {
      navigate("/");
    }
  }, [])

  function salvarTransacao(e) {
    e.preventDefault();
    console.log(token);
    const obj = {
      valor,
      descricao
    }

    const request = api.post(`/nova-transacao/${transacao}`,
      obj,
      { headers: { Authorization: `Bearer ${token}` } });

    request.then(response => {
      navigate("/home");
    });

    request.catch(err => {
      alert(err.response.data)
    });
  }
  return (
    <TransactionsContainer>
      <h1>Nova {transacao === "saida" ? "saída" : "entrada"}</h1>
      <form onSubmit={salvarTransacao}>
        <input placeholder="Valor" type="number" required value={valor} onChange={e => setValor(e.target.value)} />
        <input placeholder="Descrição" type="text" required value={descricao} onChange={e => setDescricao(e.target.value)} />
        <button type="submit">Salvar {transacao === "saida" ? "saída" : "entrada"}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
