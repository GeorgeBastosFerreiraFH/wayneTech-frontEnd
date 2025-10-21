"use client"

import styled from "styled-components"
import { motion } from "framer-motion"
import { Monitor, CameraIcon, AlertTriangle, CheckCircle, Activity } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const Cabecalho = styled.div`
  margin-bottom: 2rem;
`

const Titulo = styled.h1`
  font-size: 2rem;
  color: var(--cor-neon-azul);
  text-shadow: 0 0 20px var(--cor-neon-azul);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`

const Subtitulo = styled.p`
  color: var(--cor-texto-secundario);
  font-size: 1rem;
`

const GridPrincipal = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const Card = styled(motion.div)`
  padding: 1.5rem;
  background: var(--cor-fundo-card);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 12px;
  transition: all var(--transicao-rapida);
  
  &:hover {
    border-color: var(--cor-neon-azul);
    box-shadow: var(--sombra-neon-azul);
  }
`

const CardTitulo = styled.h3`
  font-size: 1rem;
  color: var(--cor-neon-azul);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const GridCameras = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
`

const StyledCamera = styled.div`
  aspect-ratio: 16/9;
  background: var(--cor-fundo-secundario);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: var(--cor-neon-azul);
    animation: varredura-camera 2s linear infinite;
    z-index: 2;
  }
  
  @keyframes varredura-camera {
    to {
      left: 100%;
    }
  }
`

const CameraVideo = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.$ativo ? "1" : "0.3")};
  filter: ${(props) => (props.$ativo ? "none" : "grayscale(100%)")};
`

const CameraOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 0.75rem 0.5rem 0.5rem;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CameraNome = styled.div`
  color: var(--cor-texto-primario);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  z-index: 1;
`

const StatusIndicador = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 8px;
  height: 8px;
  background: ${(props) => (props.$ativo ? "var(--cor-neon-verde)" : "var(--cor-neon-laranja)")};
  border-radius: 50%;
  box-shadow: 0 0 10px currentColor;
  animation: pulsar-neon 2s ease-in-out infinite;
`

const ListaAlertas = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const ItemAlerta = styled.div`
  padding: 1rem;
  background: var(--cor-fundo-secundario);
  border-left: 3px solid ${(props) => (props.$tipo === "critico" ? "var(--cor-neon-laranja)" : "var(--cor-neon-verde)")};
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const AlertaIcone = styled.div`
  color: ${(props) => (props.$tipo === "critico" ? "var(--cor-neon-laranja)" : "var(--cor-neon-verde)")};
  flex-shrink: 0;
`

const AlertaConteudo = styled.div`
  flex: 1;
`

const AlertaTitulo = styled.div`
  color: var(--cor-texto-primario);
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`

const AlertaHora = styled.div`
  color: var(--cor-texto-terciario);
  font-size: 0.75rem;
`

const CardGrafico = styled(Card)`
  grid-column: 1 / -1;
`

function PaginaMonitoramento() {
  const cameras = [
    {
      id: 1,
      nome: "Entrada Principal",
      ativo: true,
      gif: "/camera/cam-1.gif",
    },
    {
      id: 2,
      nome: "Estacionamento",
      ativo: true,
      gif: "/camera/cam-2.gif",
    },
    {
      id: 3,
      nome: "Laboratório",
      ativo: true,
      gif: "/camera/cam-3.gif",
    },
    {
      id: 4,
      nome: "Perímetro Norte",
      ativo: false,
      gif: "/camera/cam-4.gif",
    },
  ]

  const alertas = [
    {
      tipo: "critico",
      titulo: "Movimento detectado - Setor B",
      hora: "Há 2 minutos",
    },
    {
      tipo: "normal",
      titulo: "Backup concluído com sucesso",
      hora: "Há 15 minutos",
    },
    {
      tipo: "critico",
      titulo: "Câmera offline - Perímetro Norte",
      hora: "Há 1 hora",
    },
  ]

  const dadosGrafico = [
    { hora: "00:00", atividade: 12 },
    { hora: "04:00", atividade: 8 },
    { hora: "08:00", atividade: 45 },
    { hora: "12:00", atividade: 67 },
    { hora: "16:00", atividade: 52 },
    { hora: "20:00", atividade: 38 },
    { hora: "23:59", atividade: 25 },
  ]

  return (
    <Container>
      <Cabecalho>
        <Titulo>
          <Monitor size={32} />
          MONITORAMENTO
        </Titulo>
        <Subtitulo>Vigilância em tempo real dos sistemas de segurança</Subtitulo>
      </Cabecalho>

      <GridPrincipal>
        <Card initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <CardTitulo>
            <CameraIcon size={20} />
            Câmeras Ativas
          </CardTitulo>
          <GridCameras>
            {cameras.map((camera) => (
              <StyledCamera key={camera.id}>
                <StatusIndicador $ativo={camera.ativo} />
                <CameraVideo src={camera.gif} alt={camera.nome} $ativo={camera.ativo} />
                <CameraOverlay>
                  <CameraNome>{camera.nome}</CameraNome>
                </CameraOverlay>
              </StyledCamera>
            ))}
          </GridCameras>
        </Card>

        <Card initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <CardTitulo>
            <AlertTriangle size={20} />
            Alertas Recentes
          </CardTitulo>
          <ListaAlertas>
            {alertas.map((alerta, index) => (
              <ItemAlerta key={index} $tipo={alerta.tipo}>
                <AlertaIcone $tipo={alerta.tipo}>
                  {alerta.tipo === "critico" ? <AlertTriangle size={20} /> : <CheckCircle size={20} />}
                </AlertaIcone>
                <AlertaConteudo>
                  <AlertaTitulo>{alerta.titulo}</AlertaTitulo>
                  <AlertaHora>{alerta.hora}</AlertaHora>
                </AlertaConteudo>
              </ItemAlerta>
            ))}
          </ListaAlertas>
        </Card>
      </GridPrincipal>

      <CardGrafico initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <CardTitulo>
          <Activity size={20} />
          Atividade nas Últimas 24 Horas
        </CardTitulo>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dadosGrafico}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.1)" />
            <XAxis dataKey="hora" stroke="var(--cor-texto-terciario)" style={{ fontSize: "0.85rem" }} />
            <YAxis stroke="var(--cor-texto-terciario)" style={{ fontSize: "0.85rem" }} />
            <Tooltip
              contentStyle={{
                background: "var(--cor-fundo-card)",
                border: "1px solid var(--cor-neon-azul)",
                borderRadius: "8px",
                color: "var(--cor-texto-primario)",
              }}
            />
            <Line
              type="monotone"
              dataKey="atividade"
              stroke="var(--cor-neon-azul)"
              strokeWidth={2}
              dot={{ fill: "var(--cor-neon-azul)", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardGrafico>
    </Container>
  )
}

export default PaginaMonitoramento
