"use client"

import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useState, useEffect } from "react"

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`

const Modal = styled(motion.div)`
  background: var(--cor-fundo-card, #0f1419);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 12px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`

const Cabecalho = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);
`

const Titulo = styled.h2`
  font-size: 1.5rem;
  color: var(--cor-neon-azul, #00d4ff);
  text-shadow: 0 0 20px var(--cor-neon-azul, #00d4ff);
`

const BotaoFechar = styled.button`
  background: transparent;
  border: none;
  color: var(--cor-texto-secundario, #8b9bb4);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    color: var(--cor-neon-azul, #00d4ff);
  }
`

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const GrupoInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  color: var(--cor-texto-secundario, #8b9bb4);
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const Input = styled.input`
  padding: 0.75rem 1rem;
  background: var(--cor-fundo-secundario, #0a0e1a);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  color: var(--cor-texto-primario, #ffffff);
  font-family: var(--fonte-corpo, 'Geist', sans-serif);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--cor-neon-azul, #00d4ff);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  }
`

const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  background: var(--cor-fundo-secundario, #0a0e1a);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  color: var(--cor-texto-primario, #ffffff);
  font-family: var(--fonte-corpo, 'Geist', sans-serif);
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--cor-neon-azul, #00d4ff);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  }
`

const Select = styled.select`
  padding: 0.75rem 1rem;
  background: var(--cor-fundo-secundario, #0a0e1a);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  color: var(--cor-texto-primario, #ffffff);
  font-family: var(--fonte-corpo, 'Geist', sans-serif);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--cor-neon-azul, #00d4ff);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  }
`

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

const GrupoCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const BotoesAcao = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

const Botao = styled.button`
  flex: 1;
  padding: 0.75rem 1.5rem;
  background: ${(props) => (props.$cancelar ? "transparent" : "var(--cor-neon-verde, #00ff88)")};
  border: 1px solid ${(props) => (props.$cancelar ? "rgba(0, 212, 255, 0.3)" : "var(--cor-neon-verde, #00ff88)")};
  border-radius: 8px;
  color: ${(props) => (props.$cancelar ? "var(--cor-texto-secundario, #8b9bb4)" : "var(--cor-fundo, #0a0e1a)")};
  font-family: var(--fonte-corpo, 'Geist', sans-serif);
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.$cancelar ? "rgba(0, 212, 255, 0.1)" : "transparent")};
    color: ${(props) => (props.$cancelar ? "var(--cor-neon-azul, #00d4ff)" : "var(--cor-neon-verde, #00ff88)")};
    box-shadow: ${(props) => (props.$cancelar ? "0 0 20px rgba(0, 212, 255, 0.3)" : "0 0 20px rgba(0, 255, 136, 0.3)")};
  }
`

function ModalGerenciarItem({ aberto, aoFechar, item, aoSalvar }) {
  const [dados, setDados] = useState({
    nome: "",
    categoria: "",
    descricao: "",
    quantidade: 1,
    disponivel: true,
    nivel_minimo: "funcionario",
    thumbnail: "",
  })

  useEffect(() => {
    if (item) {
      setDados({
        nome: item.nome || "",
        categoria: item.categoria || "",
        descricao: item.descricao || "",
        quantidade: item.quantidade || 1,
        disponivel: item.disponivel !== false,
        nivel_minimo: item.nivel_minimo || item.nivelMinimo || "funcionario",
        thumbnail: item.thumbnail || "",
      })
    } else {
      setDados({
        nome: "",
        categoria: "",
        descricao: "",
        quantidade: 1,
        disponivel: true,
        nivel_minimo: "funcionario",
        thumbnail: "",
      })
    }
  }, [item, aberto])

  const handleSubmit = (e) => {
    e.preventDefault()
    aoSalvar(dados)
  }

  const handleChange = (campo, valor) => {
    setDados((prev) => ({ ...prev, [campo]: valor }))
  }

  return (
    <AnimatePresence>
      {aberto && (
        <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={aoFechar}>
          <Modal
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Cabecalho>
              <Titulo>{item ? "Editar Item" : "Adicionar Item"}</Titulo>
              <BotaoFechar onClick={aoFechar}>
                <X size={24} />
              </BotaoFechar>
            </Cabecalho>

            <Formulario onSubmit={handleSubmit}>
              <GrupoInput>
                <Label>Nome do Item</Label>
                <Input
                  type="text"
                  value={dados.nome}
                  onChange={(e) => handleChange("nome", e.target.value)}
                  required
                  placeholder="Ex: Batmóvel"
                />
              </GrupoInput>

              <GrupoInput>
                <Label>Categoria</Label>
                <Select value={dados.categoria} onChange={(e) => handleChange("categoria", e.target.value)} required>
                  <option value="">Selecione uma categoria</option>
                  <option value="Veículo Tático">Veículo Tático</option>
                  <option value="Veículo Aéreo">Veículo Aéreo</option>
                  <option value="Equipamento">Equipamento</option>
                  <option value="Gadget">Gadget</option>
                  <option value="Infraestrutura">Infraestrutura</option>
                  <option value="Segurança">Segurança</option>
                </Select>
              </GrupoInput>

              <GrupoInput>
                <Label>Descrição</Label>
                <Textarea
                  value={dados.descricao}
                  onChange={(e) => handleChange("descricao", e.target.value)}
                  placeholder="Descreva o item..."
                />
              </GrupoInput>

              <GrupoInput>
                <Label>Quantidade</Label>
                <Input
                  type="number"
                  min="0"
                  value={dados.quantidade}
                  onChange={(e) => handleChange("quantidade", Number.parseInt(e.target.value) || 0)}
                  required
                />
              </GrupoInput>

              <GrupoInput>
                <Label>Nível Mínimo de Acesso</Label>
                <Select
                  value={dados.nivel_minimo}
                  onChange={(e) => handleChange("nivel_minimo", e.target.value)}
                  required
                >
                  <option value="funcionario">Funcionário (Nível 1)</option>
                  <option value="gerente">Gerente (Nível 2)</option>
                  <option value="admin">Admin (Nível 3)</option>
                </Select>
              </GrupoInput>

              <GrupoInput>
                <Label>URL da Imagem (opcional)</Label>
                <Input
                  type="url"
                  value={dados.thumbnail}
                  onChange={(e) => handleChange("thumbnail", e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </GrupoInput>

              <GrupoCheckbox>
                <Checkbox
                  type="checkbox"
                  id="disponivel"
                  checked={dados.disponivel}
                  onChange={(e) => handleChange("disponivel", e.target.checked)}
                />
                <Label htmlFor="disponivel">Item disponível para uso</Label>
              </GrupoCheckbox>

              <BotoesAcao>
                <Botao type="button" $cancelar onClick={aoFechar}>
                  Cancelar
                </Botao>
                <Botao type="submit">Salvar</Botao>
              </BotoesAcao>
            </Formulario>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  )
}

export default ModalGerenciarItem
