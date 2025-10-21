"use client"

import styled from "styled-components"
import { motion } from "framer-motion"
import { useAutenticacao } from "../contextos/ContextoAutenticacao"
import { Activity, Shield, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react"

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const Cabecalho = styled.div`
  margin-bottom: 3rem;
`

const Titulo = styled.h1`
  font-size: 2.5rem;
  color: var(--cor-neon-azul);
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px var(--cor-neon-azul);
`

const Subtitulo = styled.p`
  color: var(--cor-texto-secundario);
  font-size: 1.1rem;
`

const GridCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`

const Card = styled(motion.div)`
  padding: 2rem;
  background: var(--cor-fundo-card);
  border: 1px solid ${(props) => props.$corBorda || "rgba(0, 212, 255, 0.3)"};
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  transition: all var(--transicao-rapida);

  &:hover {
    border-color: ${(props) => props.$corBorda || "var(--cor-neon-azul)"};
    box-shadow: 0 0 30px ${(props) => props.$corSombra || "rgba(0, 212, 255, 0.3)"};
    transform: translateY(-5px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${(props) => props.$corBorda || "var(--cor-neon-azul)"};
  }
`

const CardIcone = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
  border-radius: 10px;
  background: ${(props) => props.$corFundo || "rgba(0, 212, 255, 0.1)"};
  color: ${(props) => props.$cor || "var(--cor-neon-azul)"};
`

const CardTitulo = styled.h3`
  font-size: 0.9rem;
  color: var(--cor-texto-secundario);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
`

const CardValor = styled.div`
  font-size: 2.5rem;
  font-family: var(--fonte-titulo);
  color: ${(props) => props.$cor || "var(--cor-texto-primario)"};
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const CardInfo = styled.div`
  font-size: 0.85rem;
  color: var(--cor-texto-terciario);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const SecaoAtividades = styled.div`
  background: var(--cor-fundo-card);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 12px;
  padding: 2rem;
`

const TituloSecao = styled.h2`
  font-size: 1.5rem;
  color: var(--cor-neon-azul);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const ListaAtividades = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ItemAtividade = styled(motion.div)`
  padding: 1.25rem;
  background: var(--cor-fundo-secundario);
  border-left: 3px solid ${(props) => props.$cor || "var(--cor-neon-azul)"};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all var(--transicao-rapida);

  &:hover {
    background: var(--cor-fundo-hover);
    transform: translateX(5px);
  }
`

const AtividadeIcone = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: ${(props) => props.$corFundo || "rgba(0, 212, 255, 0.1)"};
  color: ${(props) => props.$cor || "var(--cor-neon-azul)"};
  flex-shrink: 0;
`

const AtividadeConteudo = styled.div`
  flex: 1;
`

const AtividadeTitulo = styled.div`
  color: var(--cor-texto-primario);
  font-weight: 500;
  margin-bottom: 0.25rem;
`

const AtividadeHora = styled.div`
  color: var(--cor-texto-terciario);
  font-size: 0.85rem;
`

function PaginaDashboard() {
  const { usuario } = useAutenticacao()

  const estatisticas = [
    {
      titulo: "Status do Sistema",
      valor: "ONLINE",
      info: "99.9% Uptime",
      icone: Activity,
      cor: "var(--cor-neon-verde)",
      corFundo: "rgba(0, 255, 136, 0.1)",
      corBorda: "var(--cor-neon-verde)",
      corSombra: "rgba(0, 255, 136, 0.3)",
    },
    {
      titulo: "Nível de Segurança",
      valor: "MÁXIMO",
      info: "Todos os sistemas ativos",
      icone: Shield,
      cor: "var(--cor-neon-azul)",
      corFundo: "rgba(0, 212, 255, 0.1)",
      corBorda: "var(--cor-neon-azul)",
      corSombra: "rgba(0, 212, 255, 0.3)",
    },
    {
      titulo: "Alertas Ativos",
      valor: usuario?.nivel === "funcionario" ? "0" : "3",
      info: "Requer atenção",
      icone: AlertTriangle,
      cor: "var(--cor-neon-laranja)",
      corFundo: "rgba(255, 107, 53, 0.1)",
      corBorda: "var(--cor-neon-laranja)",
      corSombra: "rgba(255, 107, 53, 0.3)",
    },
    {
      titulo: "Operações Hoje",
      valor: "47",
      info: "+12% vs ontem",
      icone: TrendingUp,
      cor: "var(--cor-neon-verde)",
      corFundo: "rgba(0, 255, 136, 0.1)",
      corBorda: "var(--cor-neon-verde)",
      corSombra: "rgba(0, 255, 136, 0.3)",
    },
  ]

  const atividadesRecentes = [
    {
      titulo: "Acesso ao inventário autorizado",
      hora: "Há 5 minutos",
      icone: CheckCircle,
      cor: "var(--cor-neon-verde)",
      corFundo: "rgba(0, 255, 136, 0.1)",
    },
    {
      titulo: "Novo item adicionado ao inventário",
      hora: "Há 15 minutos",
      icone: Activity,
      cor: "var(--cor-neon-azul)",
      corFundo: "rgba(0, 212, 255, 0.1)",
    },
    {
      titulo: usuario?.nivel !== "funcionario" ? "Câmera de segurança ativada" : "Sistema atualizado",
      hora: "Há 1 hora",
      icone: Shield,
      cor: "var(--cor-neon-azul)",
      corFundo: "rgba(0, 212, 255, 0.1)",
    },
    {
      titulo: "Backup do sistema concluído",
      hora: "Há 2 horas",
      icone: CheckCircle,
      cor: "var(--cor-neon-verde)",
      corFundo: "rgba(0, 255, 136, 0.1)",
    },
  ]

  return (
      <Container>
        <Cabecalho>
          <Titulo>BEM-VINDO, {usuario?.nome.toUpperCase()}</Titulo>
          <Subtitulo>Nível de acesso: {usuario?.nivel.toUpperCase()} | Sistema WayneTech v2.0</Subtitulo>
        </Cabecalho>

        <GridCards>
          {estatisticas.map((stat, index) => {
            const Icone = stat.icone
            return (
              <Card
                key={index}
                $corBorda={stat.corBorda}
                $corSombra={stat.corSombra}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CardIcone $cor={stat.cor} $corFundo={stat.corFundo}>
                  <Icone size={24} />
                </CardIcone>
                <CardTitulo>{stat.titulo}</CardTitulo>
                <CardValor $cor={stat.cor}>{stat.valor}</CardValor>
                <CardInfo>
                  <TrendingUp size={14} />
                  {stat.info}
                </CardInfo>
              </Card>
            )
          })}
        </GridCards>

        <SecaoAtividades>
          <TituloSecao>
            <Activity size={24} />
            ATIVIDADES RECENTES
          </TituloSecao>
          <ListaAtividades>
            {atividadesRecentes.map((atividade, index) => {
              const Icone = atividade.icone
              return (
                <ItemAtividade
                  key={index}
                  $cor={atividade.cor}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <AtividadeIcone $cor={atividade.cor} $corFundo={atividade.corFundo}>
                    <Icone size={20} />
                  </AtividadeIcone>
                  <AtividadeConteudo>
                    <AtividadeTitulo>{atividade.titulo}</AtividadeTitulo>
                    <AtividadeHora>{atividade.hora}</AtividadeHora>
                  </AtividadeConteudo>
                </ItemAtividade>
              )
            })}
          </ListaAtividades>
        </SecaoAtividades>
      </Container>
  )
}

export default PaginaDashboard
