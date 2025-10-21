"use client"

import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"
import { AlertTriangle, Home, Shield } from "lucide-react"

const Container404 = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`

const ConteudoCentral = styled(motion.div)`
  text-align: center;
  z-index: 1;
  max-width: 600px;
`

const LogoBatman = styled(motion.div)`
  width: 150px;
  height: 150px;
  margin: 0 auto 2rem;
  background: url("/logo-batman-preto.jpg") center/contain no-repeat;
  filter: drop-shadow(0 0 30px rgba(212, 175, 55, 0.5));
`

const Codigo404 = styled(motion.h1)`
  font-size: 8rem;
  font-weight: 900;
  color: #d4af37;
  margin: 0;
  text-shadow: 0 0 40px rgba(212, 175, 55, 0.6), 0 0 80px rgba(212, 175, 55, 0.3);
  letter-spacing: 0.1em;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 5rem;
  }
`

const Titulo = styled(motion.h2)`
  font-size: 2rem;
  color: #ffffff;
  margin: 1.5rem 0 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const Descricao = styled(motion.p)`
  font-size: 1.1rem;
  color: #a0a0a0;
  margin: 1rem 0 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const Citacao = styled(motion.blockquote)`
  font-size: 1rem;
  color: #d4af37;
  font-style: italic;
  margin: 2rem 0;
  padding: 1rem;
  border-left: 3px solid #d4af37;
  background: rgba(212, 175, 55, 0.05);
  border-radius: 4px;

  &::before {
    content: "\\201C"; // Substituindo aspas tipográficas por código Unicode
    font-size: 2rem;
    line-height: 0;
  }

  &::after {
    content: "\\201D"; // Substituindo aspas tipográficas por código Unicode
    font-size: 2rem;
    line-height: 0;
  }
`

const BotoesContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`

const Botao = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &.primario {
    background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
    color: #000000;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6);
    }
  }

  &.secundario {
    background: transparent;
    color: #d4af37;
    border: 2px solid #d4af37;

    &:hover {
      background: rgba(212, 175, 55, 0.1);
      transform: translateY(-2px);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`

const IconeAlerta = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.1);
  border: 2px solid #d4af37;
  margin: 0 auto 2rem;
`

const Pagina404 = () => {
  const navigate = useNavigate()

  return (
    <Container404>
      <ConteudoCentral initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <LogoBatman
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        />

        <IconeAlerta initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
          <Shield size={40} color="#d4af37" />
        </IconeAlerta>

        <Codigo404
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          404
        </Codigo404>

        <Titulo initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          Acesso Negado
        </Titulo>

        <Descricao initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Esta localização não foi encontrada no sistema WayneTech. A página que você está procurando não existe ou foi
          movida para uma área restrita da Batcaverna.
        </Descricao>

        <Citacao initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          Nem sempre é sobre o que você encontra, mas sobre saber onde procurar. - Alfred Pennyworth
        </Citacao>

        <BotoesContainer>
          <Botao
            className="primario"
            onClick={() => navigate("/dashboard")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home size={20} />
            Voltar ao Dashboard
          </Botao>

          <Botao
            className="secundario"
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AlertTriangle size={20} />
            Página Anterior
          </Botao>
        </BotoesContainer>
      </ConteudoCentral>
    </Container404>
  )
}

export default Pagina404
