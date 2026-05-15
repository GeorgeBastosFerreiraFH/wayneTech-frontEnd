import { Routes, Route, Navigate } from "react-router-dom"
import { ProvedorAutenticacao, useAutenticacao } from "./contextos/ContextoAutenticacao"
import PaginaLogin from "./paginas/PaginaLogin"
import PaginaDashboard from "./paginas/PaginaDashboard"
import PaginaInventario from "./paginas/PaginaInventario"
import PaginaVisualizacao3D from "./paginas/PaginaVisualizacao3D"
import PaginaMonitoramento from "./paginas/PaginaMonitoramento"
import Pagina404 from "./paginas/Pagina404"
import RotaProtegida from "./componentes/RotaProtegida"
import Layout from "./componentes/Layout"
import LoadingPersonalizado from "./componentes/LoadingPersonalizado"

function AppRotas() {
  const { carregando, usuario } = useAutenticacao()

  if (carregando) {
    return <LoadingPersonalizado usuario={usuario} mensagem="Inicializando sistema..." />
  }

  return (
    <Routes>
      <Route path="/login" element={<PaginaLogin />} />

      <Route element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <RotaProtegida>
              <PaginaDashboard />
            </RotaProtegida>
          }
        />

        <Route
          path="/inventario"
          element={
            <RotaProtegida>
              <PaginaInventario />
            </RotaProtegida>
          }
        />

        <Route
          path="/visualizacao-3d"
          element={
            <RotaProtegida nivelMinimo="gerente">
              <PaginaVisualizacao3D />
            </RotaProtegida>
          }
        />

        <Route
          path="/monitoramento"
          element={
            <RotaProtegida nivelMinimo="gerente">
              <PaginaMonitoramento />
            </RotaProtegida>
          }
        />

        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route path="*" element={<Pagina404 />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <ProvedorAutenticacao>
      <AppRotas />
    </ProvedorAutenticacao>
  )
}

export default App
