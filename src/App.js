import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import Context from "./contexts/Context"
import { useState } from "react"

export default function App() {
  const [nome, setNome] = useState("");
  const [transacao, setTransacao] = useState("transação");
  return (
    <PagesContainer>
      <Context.Provider value={{ nome, setNome }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage setTransacao={setTransacao} />} />
            <Route path="/nova-transacao/:tipo" element={<TransactionsPage transacao={transacao} />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
