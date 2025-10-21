import { Navigate } from "react-router-dom"
import { useAutenticacao } from "../contextos/ContextoAutenticacao"

const niveisAcesso = {
  funcionario: 1,
  gerente: 2,
  admin: 3,
}

function RotaProtegida({ children, nivelMinimo = "funcionario" }) {
  const { usuario } = useAutenticacao()

  if (!usuario) {
    return <Navigate to="/login" />
  }

  const nivelUsuario = niveisAcesso[usuario.nivel] || 0
  const nivelRequerido = niveisAcesso[nivelMinimo] || 0

  if (nivelUsuario < nivelRequerido) {
    return <Navigate to="/dashboard" />
  }

  return children
}

export default RotaProtegida
