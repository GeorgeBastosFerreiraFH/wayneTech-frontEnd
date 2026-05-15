"use client"

import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import { useAutenticacao } from "../contextos/ContextoAutenticacao"
import { useNavigate, useLocation, Outlet } from "react-router-dom"
import { Home, Package, Box, Monitor, LogOut, Shield, Menu, X } from "lucide-react"
import LogoWayne from "./LogoWayne"
import { useState, useEffect } from "react"

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: var(--cor-fundo);
`

const Sidebar = styled(motion.aside)`
  width: 280px;
  top: 0;
  left: 0;
  height: 100vh;
  background: var(--cor-fundo-secundario);
  border-right: var(--borda-neon);
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  overflow: hidden;
  z-index: 1000;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--cor-neon-azul), transparent);
    animation: pulsar-neon 2s ease-in-out infinite;
  }

  /* Media queries para responsividade */
  @media (max-width: 1024px) {
    transform: translateX(${(props) => (props.$aberto ? "0" : "-100%")});
    transition: transform 0.3s ease-in-out;
  }
`

const Overlay = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;

  @media (max-width: 1024px) {
    display: block;
  }
`

const BotaoMenu = styled(motion.button)`
  display: none;
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 1001;
  width: 50px;
  height: 50px;
  background: var(--cor-fundo-secundario);
  border: 1px solid var(--cor-neon-azul);
  border-radius: 8px;
  color: var(--cor-neon-azul);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  box-shadow: var(--sombra-neon-azul);

  &:hover {
    background: rgba(0, 212, 255, 0.1);
  }

  @media (max-width: 1024px) {
    display: flex;
  }
`

const LogoContainer = styled.div`
  padding: 0 2rem 2rem;
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);
  margin-bottom: 2rem;
`

const Nav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
`

const ItemMenu = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: ${(props) => (props.$ativo ? "rgba(0, 212, 255, 0.1)" : "transparent")};
  border: 1px solid ${(props) => (props.$ativo ? "var(--cor-neon-azul)" : "transparent")};
  border-radius: 8px;
  color: ${(props) => (props.$ativo ? "var(--cor-neon-azul)" : "var(--cor-texto-secundario)")};
  font-family: var(--fonte-corpo);
  font-size: 0.95rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all var(--transicao-rapida);

  &:hover {
    background: rgba(0, 212, 255, 0.05);
    border-color: var(--cor-neon-azul);
    color: var(--cor-neon-azul);
    box-shadow: var(--sombra-neon-azul);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

const InfoUsuario = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(0, 212, 255, 0.2);
  margin-top: auto;
`

const NomeUsuario = styled.div`
  font-family: var(--fonte-titulo);
  font-size: 0.9rem;
  color: var(--cor-neon-azul);
  margin-bottom: 0.25rem;
  text-transform: uppercase;
`

const NivelAcesso = styled.div`
  font-size: 0.75rem;
  color: var(--cor-texto-terciario);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`

const BotaoSair = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 1px solid var(--cor-neon-laranja);
  border-radius: 8px;
  color: var(--cor-neon-laranja);
  font-family: var(--fonte-corpo);
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 1rem;
  transition: all var(--transicao-rapida);

  &:hover {
    background: rgba(255, 107, 53, 0.1);
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

const ConteudoPrincipal = styled.main`
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
  overflow-y: auto;

  @media (max-width: 1024px) {
    margin-left: 0;
    padding: 5rem 1.5rem 1.5rem;
  }

  @media (max-width: 640px) {
    padding: 5rem 1rem 1rem;
  }
`

function Layout() {
  const { usuario, logout } = useAutenticacao()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuAberto, setMenuAberto] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024
      setIsMobile(mobile)
      if (!mobile) {
        setMenuAberto(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const itensMenu = [
    { path: "/dashboard", label: "Dashboard", icon: Home, nivel: "funcionario" },
    { path: "/inventario", label: "Inventário", icon: Package, nivel: "funcionario" },
    { path: "/visualizacao-3d", label: "Visualização 3D", icon: Box, nivel: "gerente" },
    { path: "/monitoramento", label: "Monitoramento", icon: Monitor, nivel: "gerente" },
  ]

  const niveisAcesso = {
    funcionario: 1,
    gerente: 2,
    admin: 3,
  }

  const nivelUsuario = niveisAcesso[usuario?.nivel] || 0

  const itensVisiveis = itensMenu.filter((item) => {
    const nivelItem = niveisAcesso[item.nivel] || 0
    return nivelUsuario >= nivelItem
  })

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleNavegar = (path) => {
    navigate(path)
    setMenuAberto(false)
  }

  return (
    <Container>
      <BotaoMenu onClick={() => setMenuAberto(!menuAberto)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {menuAberto ? <X size={24} /> : <Menu size={24} />}
      </BotaoMenu>

      <AnimatePresence>
        {menuAberto && isMobile && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuAberto(false)}
          />
        )}
      </AnimatePresence>

      <Sidebar
        $aberto={menuAberto}
        initial={false}
        animate={{
          x: isMobile ? (menuAberto ? 0 : -280) : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <LogoContainer>
          <LogoWayne usuario={usuario} />
        </LogoContainer>

        <Nav>
          {itensVisiveis.map((item) => {
            const Icon = item.icon
            const ativo = location.pathname === item.path

            return (
              <ItemMenu
                key={item.path}
                $ativo={ativo}
                onClick={() => handleNavegar(item.path)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon />
                {item.label}
              </ItemMenu>
            )
          })}
        </Nav>

        <InfoUsuario>
          <NomeUsuario>{usuario?.nome}</NomeUsuario>
          <NivelAcesso>
            <Shield size={12} style={{ display: "inline", marginRight: "4px" }} />
            {usuario?.nivel}
          </NivelAcesso>

          <BotaoSair onClick={handleLogout} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <LogOut />
            Sair
          </BotaoSair>
        </InfoUsuario>
      </Sidebar>

      <ConteudoPrincipal>
        <Outlet />
      </ConteudoPrincipal>
    </Container>
  )
}

export default Layout
