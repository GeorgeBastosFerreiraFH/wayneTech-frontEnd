"use client"

import styled from "styled-components"
import { motion } from "framer-motion"
import { Box, RotateCw } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Center, Bounds } from "@react-three/drei"
import { useState, Suspense, useRef } from "react"
import { modelos3d } from "../dados/modelos3d"
import { useAutenticacao } from "../contextos/ContextoAutenticacao"

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const Cabecalho = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`

const Titulo = styled.h1`
  font-size: 2rem;
  color: var(--cor-neon-azul);
  text-shadow: 0 0 20px var(--cor-neon-azul);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
`

const Subtitulo = styled.p`
  color: var(--cor-texto-secundario);
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const ConteudoPrincipal = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 1.5rem;
  }
`

const PainelLateral = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 1024px) {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 0.75rem;
    padding: 0.5rem 0;
    
    /* Estilização da scrollbar */
    &::-webkit-scrollbar {
      height: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(0, 212, 255, 0.1);
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--cor-neon-azul);
      border-radius: 3px;
    }
  }
`

const CardModelo = styled(motion.div)`
  padding: 1.25rem;
  background: ${(props) => (props.$ativo ? "rgba(0, 212, 255, 0.1)" : "var(--cor-fundo-card)")};
  border: 1px solid ${(props) => (props.$ativo ? "var(--cor-neon-azul)" : "rgba(0, 212, 255, 0.3)")};
  border-radius: 8px;
  cursor: pointer;
  transition: all var(--transicao-rapida);
  
  &:hover {
    border-color: var(--cor-neon-azul);
    box-shadow: var(--sombra-neon-azul);
  }

  @media (max-width: 1024px) {
    min-width: 200px;
    padding: 1rem;
    flex-shrink: 0;
  }

  @media (max-width: 480px) {
    min-width: 160px;
    padding: 0.875rem;
  }
`

const NomeModelo = styled.div`
  color: var(--cor-texto-primario);
  font-weight: 600;
  margin-bottom: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const CategoriaModelo = styled.div`
  color: var(--cor-texto-terciario);
  font-size: 0.85rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`

const AreaVisualizacao = styled.div`
  height: 600px;
  background: var(--cor-fundo-card);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(0deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: 1024px) {
    height: 500px;
  }

  @media (max-width: 768px) {
    height: 400px;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    height: 350px;
  }
`

const InfoModelo = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--cor-neon-azul);
  border-radius: 8px;
  z-index: 10;
  backdrop-filter: blur(10px);
  max-width: 300px;

  @media (max-width: 768px) {
    top: 1rem;
    left: 1rem;
    right: 1rem;
    max-width: none;
    padding: 0.75rem 1rem;
  }
`

const TituloInfo = styled.div`
  color: var(--cor-neon-azul);
  font-family: var(--fonte-titulo);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 0.25rem;
  }
`

const TextoInfo = styled.div`
  color: var(--cor-texto-secundario);
  font-size: 0.85rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    line-height: 1.4;
  }
`

const Controles = styled.div`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  gap: 0.75rem;
  z-index: 10;

  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    gap: 0.5rem;
  }
`

const BotaoControle = styled(motion.button)`
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--cor-neon-azul);
  border-radius: 8px;
  color: var(--cor-neon-azul);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  transition: all var(--transicao-rapida);
  
  &:hover {
    background: rgba(0, 212, 255, 0.2);
    box-shadow: var(--sombra-neon-azul);
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`

const Carregando = styled.div`
  color: var(--cor-neon-azul);
  font-size: 1.2rem;
  text-align: center;
`

function ModeloGLB({ caminho }) {
  const { scene } = useGLTF(caminho)
  return <primitive object={scene} />
}

function PaginaVisualizacao3D() {
  const { usuario } = useAutenticacao()
  const [modeloSelecionado, setModeloSelecionado] = useState(0)
  const orbitControlsRef = useRef()

  const resetarVisualizacao = () => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset()
    }
  }

  const niveisAcesso = {
    funcionario: 1,
    gerente: 2,
    admin: 3,
  }

  const nivelUsuario = niveisAcesso[usuario?.nivel] || 0

  const modelosDisponiveis = modelos3d.filter((modelo) => {
    const nivelModelo = niveisAcesso[modelo.nivelMinimo] || 0
    return nivelUsuario >= nivelModelo
  })

  const modeloAtual = modelosDisponiveis[modeloSelecionado] || modelosDisponiveis[0]

  if (!modeloAtual) {
    return <Container>Nenhum modelo 3D disponível para seu nível de acesso.</Container>
  }

  return (
    <Container>
      <Cabecalho>
        <Titulo>
          <Box size={32} />
          VISUALIZAÇÃO 3D
        </Titulo>
        <Subtitulo>Explore os equipamentos em três dimensões</Subtitulo>
      </Cabecalho>

      <ConteudoPrincipal>
        <PainelLateral>
          {modelosDisponiveis.map((modelo, index) => (
            <CardModelo
              key={modelo.id}
              $ativo={modeloSelecionado === index}
              onClick={() => setModeloSelecionado(index)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <NomeModelo>{modelo.nome}</NomeModelo>
              <CategoriaModelo>{modelo.categoria}</CategoriaModelo>
            </CardModelo>
          ))}
        </PainelLateral>

        <AreaVisualizacao>
          <InfoModelo>
            <TituloInfo>{modeloAtual.nome}</TituloInfo>
            <TextoInfo>{modeloAtual.descricao}</TextoInfo>
          </InfoModelo>

          <Canvas camera={{ position: [5, 5, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 15, 10]} intensity={1} castShadow />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00d4ff" />

            <Suspense fallback={null}>
              <Environment preset="city" />
              <Bounds key={modeloAtual.id} fit clip observe margin={1.2}>
                <Center>
                  <ModeloGLB caminho={modeloAtual.arquivo} />
                </Center>
              </Bounds>
            </Suspense>

            <OrbitControls
              key={modeloAtual.id}
              ref={orbitControlsRef}
              makeDefault
              enableZoom
              enablePan
              enableDamping
              dampingFactor={0.05}
            />
          </Canvas>

          <Controles>
            <BotaoControle
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Resetar visualização"
              onClick={resetarVisualizacao}
            >
              <RotateCw size={24} />
            </BotaoControle>
          </Controles>
        </AreaVisualizacao>
      </ConteudoPrincipal>
    </Container>
  )
}

export default PaginaVisualizacao3D
