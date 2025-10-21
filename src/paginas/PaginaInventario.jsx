"use client"

import styled from "styled-components"
import { motion } from "framer-motion"
import { useAutenticacao } from "../contextos/ContextoAutenticacao"
import { Package, Search, Filter, Plus, Edit, Trash2, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { inventario as inventarioAPI } from "../servicos/api"
import ModalGerenciarItem from "../componentes/ModalGerenciarItem"

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const Cabecalho = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`

const Titulo = styled.h1`
  font-size: 2rem;
  color: var(--cor-neon-azul);
  text-shadow: 0 0 20px var(--cor-neon-azul);
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const BarraPesquisa = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
  max-width: 500px;
`

const InputPesquisa = styled.div`
  position: relative;
  flex: 1;
  
  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 3rem;
    background: var(--cor-fundo-card);
    border: 1px solid rgba(0, 212, 255, 0.3);
    border-radius: 8px;
    color: var(--cor-texto-primario);
    font-family: var(--fonte-corpo);
    
    &:focus {
      outline: none;
      border-color: var(--cor-neon-azul);
      box-shadow: var(--sombra-neon-azul);
    }
  }
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--cor-neon-azul);
  }
`

const BotaoFiltro = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: var(--cor-fundo-card);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  color: var(--cor-neon-azul);
  font-family: var(--fonte-corpo);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all var(--transicao-rapida);
  
  &:hover {
    border-color: var(--cor-neon-azul);
    box-shadow: var(--sombra-neon-azul);
  }
`

const BotaoAdicionar = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: var(--cor-neon-verde);
  border: 1px solid var(--cor-neon-verde);
  border-radius: 8px;
  color: var(--cor-fundo);
  font-family: var(--fonte-corpo);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  transition: all var(--transicao-rapida);
  
  &:hover {
    background: transparent;
    color: var(--cor-neon-verde);
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
  }
`

const ContainerCentralizado = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
  color: var(--cor-texto-secundario);
`

const Spinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(0, 212, 255, 0.2);
  border-top-color: var(--cor-neon-azul);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`

const MensagemErro = styled.div`
  padding: 1.5rem;
  background: rgba(255, 107, 53, 0.1);
  border: 1px solid var(--cor-neon-laranja);
  border-radius: 8px;
  color: var(--cor-neon-laranja);
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 600px;
  margin: 2rem auto;
`

const GridItens = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`

const CardItem = styled(motion.div)`
  padding: 1.5rem;
  background: var(--cor-fundo-card);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 12px;
  transition: all var(--transicao-rapida);
  cursor: pointer;
  
  &:hover {
    border-color: var(--cor-neon-azul);
    box-shadow: var(--sombra-neon-azul);
    transform: translateY(-5px);
  }
`

const ItemImagem = styled.div`
  width: 100%;
  height: 180px;
  background: var(--cor-fundo-secundario);
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cor-neon-azul);
  font-size: 3rem;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.2), transparent);
    animation: varredura 3s linear infinite;
  }
  
  @keyframes varredura {
    to {
      left: 100%;
    }
  }
`

const ItemNome = styled.h3`
  font-size: 1.1rem;
  color: var(--cor-texto-primario);
  margin-bottom: 0.5rem;
`

const ItemCategoria = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid var(--cor-neon-azul);
  border-radius: 4px;
  color: var(--cor-neon-azul);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
`

const ItemDescricao = styled.p`
  color: var(--cor-texto-secundario);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 212, 255, 0.2);
  font-size: 0.85rem;
  color: var(--cor-texto-terciario);
`

const Badge = styled.span`
  padding: 0.25rem 0.5rem;
  background: ${(props) => (props.$disponivel ? "rgba(0, 255, 136, 0.1)" : "rgba(255, 107, 53, 0.1)")};
  border: 1px solid ${(props) => (props.$disponivel ? "var(--cor-neon-verde)" : "var(--cor-neon-laranja)")};
  border-radius: 4px;
  color: ${(props) => (props.$disponivel ? "var(--cor-neon-verde)" : "var(--cor-neon-laranja)")};
  font-size: 0.75rem;
  text-transform: uppercase;
`

const AcoesItem = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 212, 255, 0.2);
`

const BotaoAcao = styled(motion.button)`
  flex: 1;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid ${(props) => (props.$deletar ? "var(--cor-neon-laranja)" : "var(--cor-neon-azul)")};
  border-radius: 6px;
  color: ${(props) => (props.$deletar ? "var(--cor-neon-laranja)" : "var(--cor-neon-azul)")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  transition: all var(--transicao-rapida);

  &:hover {
    background: ${(props) => (props.$deletar ? "rgba(255, 107, 53, 0.1)" : "rgba(0, 212, 255, 0.1)")};
    box-shadow: ${(props) => (props.$deletar ? "0 0 15px rgba(255, 107, 53, 0.3)" : "var(--sombra-neon-azul)")};
  }
`

function PaginaInventario() {
  const { usuario } = useAutenticacao()
  const [pesquisa, setPesquisa] = useState("")
  const [modalAberto, setModalAberto] = useState(false)
  const [itemEditando, setItemEditando] = useState(null)
  const [itensInventario, setItensInventario] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const podeGerenciar =
    usuario?.nivel === "admin" && (usuario?.nome === "Bruce Wayne" || usuario?.nome === "Alfred Pennyworth")

  useEffect(() => {
    const carregarInventario = async () => {
      try {
        setCarregando(true)
        setErro(null)
        console.log("[v0] Buscando inventário da API...")

        const dados = await inventarioAPI.listar()
        console.log("[v0] Inventário recebido:", dados)

        setItensInventario(dados)
      } catch (erro) {
        console.error("[v0] Erro ao carregar inventário:", erro)
        setErro(erro.message || "Erro ao carregar inventário")
      } finally {
        setCarregando(false)
      }
    }

    carregarInventario()
  }, [])

  const handleSalvarItem = async (dados) => {
    try {
      if (itemEditando) {
        console.log("[v0] Atualizando item:", itemEditando.id, dados)
        await inventarioAPI.atualizar(itemEditando.id, dados)
      } else {
        console.log("[v0] Adicionando novo item:", dados)
        await inventarioAPI.adicionar(dados)
      }

      // Recarregar lista após salvar
      const novosItens = await inventarioAPI.listar()
      setItensInventario(novosItens)

      setModalAberto(false)
      setItemEditando(null)
    } catch (erro) {
      console.error("[v0] Erro ao salvar item:", erro)
      alert(`Erro ao salvar: ${erro.message}`)
    }
  }

  const handleDeletarItem = async (id) => {
    if (confirm("Tem certeza que deseja remover este item do inventário?")) {
      try {
        console.log("[v0] Deletando item:", id)
        await inventarioAPI.remover(id)

        // Recarregar lista após deletar
        const novosItens = await inventarioAPI.listar()
        setItensInventario(novosItens)
      } catch (erro) {
        console.error("[v0] Erro ao deletar item:", erro)
        alert(`Erro ao deletar: ${erro.message}`)
      }
    }
  }

  const handleEditarItem = (item) => {
    setItemEditando(item)
    setModalAberto(true)
  }

  const handleAdicionarItem = () => {
    setItemEditando(null)
    setModalAberto(true)
  }

  const itensFiltrados = itensInventario.filter((item) => {
    const correspondePesquisa =
      item.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      item.categoria.toLowerCase().includes(pesquisa.toLowerCase())
    return correspondePesquisa
  })

  if (carregando) {
    return (
      <Container>
        <ContainerCentralizado>
          <Spinner />
          <p>Carregando inventário...</p>
        </ContainerCentralizado>
      </Container>
    )
  }

  if (erro) {
    return (
      <Container>
        <MensagemErro>
          <AlertCircle size={24} />
          <div>
            <strong>Erro ao carregar inventário</strong>
            <p>{erro}</p>
            <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
              Verifique se o backend está rodando em http://localhost:5000
            </p>
          </div>
        </MensagemErro>
      </Container>
    )
  }

  return (
    <Container>
      <Cabecalho>
        <Titulo>
          <Package size={32} />
          INVENTÁRIO
        </Titulo>
        <BarraPesquisa>
          <InputPesquisa>
            <Search size={20} />
            <input
              type="text"
              placeholder="Pesquisar itens..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
          </InputPesquisa>
          <BotaoFiltro whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Filter size={18} />
            Filtros
          </BotaoFiltro>
          {podeGerenciar && (
            <BotaoAdicionar onClick={handleAdicionarItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Plus size={18} />
              Adicionar
            </BotaoAdicionar>
          )}
        </BarraPesquisa>
      </Cabecalho>

      <GridItens>
        {itensFiltrados.map((item, index) => (
          <CardItem
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
          >
            <ItemImagem>
              {item.thumbnail ? (
                <img
                  src={item.thumbnail || "/placeholder.svg"}
                  alt={item.nome}
                  onError={(e) => {
                    e.target.style.display = "none"
                    e.target.parentElement.innerHTML = '<svg width="60" height="60"><use href="#package-icon"/></svg>'
                  }}
                />
              ) : (
                <Package size={60} />
              )}
            </ItemImagem>
            <ItemNome>{item.nome}</ItemNome>
            <ItemCategoria>{item.categoria}</ItemCategoria>
            <ItemDescricao>{item.descricao || item.localizacao}</ItemDescricao>
            <ItemInfo>
              <span>{item.localizacao || "Localização não definida"}</span>
              <Badge $disponivel={item.status === "Disponível"}>{item.status || "Disponível"}</Badge>
            </ItemInfo>

            {podeGerenciar && (
              <AcoesItem>
                <BotaoAcao
                  onClick={() => handleEditarItem(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit size={16} />
                  Editar
                </BotaoAcao>
                <BotaoAcao
                  $deletar
                  onClick={() => handleDeletarItem(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 size={16} />
                  Remover
                </BotaoAcao>
              </AcoesItem>
            )}
          </CardItem>
        ))}
      </GridItens>

      <ModalGerenciarItem
        aberto={modalAberto}
        aoFechar={() => {
          setModalAberto(false)
          setItemEditando(null)
        }}
        item={itemEditando}
        aoSalvar={handleSalvarItem}
      />
    </Container>
  )
}

export default PaginaInventario
