"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const LogoWrapper = styled(motion.div)`
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: ${(props) => (props.$clicavel ? "pointer" : "default")};
`

const LogoImagem = styled(motion.img)`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 20px var(--cor-batman-amarelo));
`

const LogoSvg = styled(motion.svg)`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 20px currentColor);
`

const TextoLogo = styled(motion.div)`
  font-family: var(--fonte-titulo);
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  text-align: center;
  color: ${(props) => (props.$batman ? "var(--cor-batman-amarelo)" : "var(--cor-wayne-dourado)")};
  text-shadow: 0 0 20px currentColor;
`

function LogoWayne({ usuario }) {
  const podeVerBatman =
    usuario?.nivel === "admin" && (usuario?.nome === "Bruce Wayne" || usuario?.nome === "Alfred Pennyworth")

  const [modoBatman, setModoBatman] = useState(false)

  useEffect(() => {
    if (podeVerBatman) {
      const timer = setTimeout(() => {
        setModoBatman(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [podeVerBatman])

  const alternarModo = () => {
    if (podeVerBatman) {
      setModoBatman(!modoBatman)
    }
  }

  return (
    <Container>
      <LogoWrapper $clicavel={podeVerBatman} onClick={alternarModo} whileHover={podeVerBatman ? { scale: 1.05 } : {}}>
        <AnimatePresence mode="wait">
          {!modoBatman ? (
            <LogoSvg
              key="wayne"
              viewBox="0 0 200 200"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              transition={{ duration: 0.6 }}
            >
              <motion.circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="var(--cor-wayne-dourado)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.text
                x="100"
                y="110"
                textAnchor="middle"
                fill="var(--cor-wayne-dourado)"
                fontSize="48"
                fontFamily="Orbitron, sans-serif"
                fontWeight="900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                W
              </motion.text>
            </LogoSvg>
          ) : (
            <LogoImagem
              key="batman"
              src="/logo-batman-preto.svg"
              alt="Batman Logo"
              initial={{ opacity: 0, rotate: 180, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -180, scale: 0.5 }}
              transition={{ duration: 0.6, ease: "backOut" }}
            />
          )}
        </AnimatePresence>
      </LogoWrapper>

      <TextoLogo
        $batman={modoBatman}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {modoBatman ? "BATMAN" : "WAYNETECH"}
      </TextoLogo>
    </Container>
  )
}

export default LogoWayne
