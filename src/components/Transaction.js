import styled from "styled-components"

export default function Transaction({ valor, descricao, dataHora, tipo }) {
  return (
    <ListItemContainer>
      <div>
        <span>{dataHora.substring(0, 5)}</span>
        <strong>{descricao}</strong>
      </div>
      <Value color={tipo === "entrada" ? "positivo" : "negativo"}>{Number(valor).toFixed(2)}</Value>
    </ListItemContainer>
  )
}

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
