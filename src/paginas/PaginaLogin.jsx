"use client"

import { useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useAutenticacao } from "../contextos/ContextoAutenticacao"
import { Shield, Lock, User } from "lucide-react"

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cor-fundo);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
    animation: pulsar-neon 4s ease-in-out infinite;
  }
`

const FormularioCard = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  padding: 3rem;
  background: var(--cor-fundo-card);
  border: var(--borda-neon);
  border-radius: 16px;
  box-shadow: var(--sombra-neon-azul);
  position: relative;
  z-index: 1;
`

const Cabecalho = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const IconeShield = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin-bottom: 1.5rem;
  border: 2px solid var(--cor-neon-azul);
  border-radius: 50%;
  color: var(--cor-neon-azul);
  box-shadow: var(--sombra-neon-azul);
`

const Titulo = styled.h1`
  font-size: 2rem;
  color: var(--cor-neon-azul);
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px var(--cor-neon-azul);
`

const Subtitulo = styled.p`
  color: var(--cor-texto-secundario);
  font-size: 0.9rem;
  letter-spacing: 0.1em;
`

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const GrupoInput = styled.div`
  position: relative;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--cor-texto-secundario);
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const IconeInput = styled.div`
  position: absolute;
  left: 1rem;
  color: var(--cor-neon-azul);
  display: flex;
  align-items: center;
  pointer-events: none;
`

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: var(--cor-fundo-secundario);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  color: var(--cor-texto-primario);
  font-family: var(--fonte-corpo);
  font-size: 1rem;
  transition: all var(--transicao-rapida);

  &:focus {
    outline: none;
    border-color: var(--cor-neon-azul);
    box-shadow: var(--sombra-neon-azul);
  }

  &::placeholder {
    color: var(--cor-texto-terciario);
  }
`

const Botao = styled(motion.button)`
  padding: 1.25rem;
  background: linear-gradient(135deg, var(--cor-neon-azul), var(--cor-neon-verde));
  border: none;
  border-radius: 8px;
  color: var(--cor-fundo);
  font-family: var(--fonte-titulo);
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Mensagem = styled(motion.div)`
  padding: 1rem;
  background: ${(props) => (props.$erro ? "rgba(255, 107, 53, 0.1)" : "rgba(0, 255, 136, 0.1)")};
  border: 1px solid ${(props) => (props.$erro ? "var(--cor-neon-laranja)" : "var(--cor-neon-verde)")};
  border-radius: 8px;
  color: ${(props) => (props.$erro ? "var(--cor-neon-laranja)" : "var(--cor-neon-verde)")};
  font-size: 0.9rem;
  text-align: center;
`

const InfoDemo = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--cor-texto-secundario);
  line-height: 1.6;

  strong {
    color: var(--cor-neon-azul);
    display: block;
    margin-bottom: 0.5rem;
  }
`

function PaginaLogin() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mensagem, setMensagem] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const { login, estaAutenticado } = useAutenticacao()
  const navigate = useNavigate()

  if (estaAutenticado) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensagem(null)
    setCarregando(true)

    try {
      const resultado = await login(email, senha)

      if (resultado.sucesso) {
        setMensagem({ tipo: "sucesso", texto: "Login realizado com sucesso!" })
        // Aguardar um momento antes de redirecionar
        setTimeout(() => {
          navigate("/dashboard")
        }, 500)
      } else {
        setMensagem({ tipo: "erro", texto: resultado.erro || "Credenciais inválidas" })
      }
    } catch (erro) {
      console.error("[v0] Erro ao fazer login:", erro)
      setMensagem({ tipo: "erro", texto: "Erro ao conectar com o servidor" })
    } finally {
      setCarregando(false)
    }
  }

  return (
    <Container>
      <FormularioCard initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Cabecalho>
          <IconeShield
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Shield size={40} />
          </IconeShield>
          <Titulo>WAYNETECH</Titulo>
          <Subtitulo>Sistema de Segurança</Subtitulo>
        </Cabecalho>

        <Formulario onSubmit={handleSubmit}>
          <GrupoInput>
            <Label>E-mail</Label>
            <InputWrapper>
              <IconeInput>
                <User size={20} />
              </IconeInput>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                disabled={carregando}
              />
            </InputWrapper>
          </GrupoInput>

          <GrupoInput>
            <Label>Senha</Label>
            <InputWrapper>
              <IconeInput>
                <Lock size={20} />
              </IconeInput>
              <Input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                required
                disabled={carregando}
              />
            </InputWrapper>
          </GrupoInput>

          {mensagem && (
            <Mensagem $erro={mensagem.tipo === "erro"} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              {mensagem.texto}
            </Mensagem>
          )}

          <Botao type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={carregando}>
            {carregando ? "AUTENTICANDO..." : "ACESSAR SISTEMA"}
          </Botao>
        </Formulario>

        <InfoDemo>
          <strong>CREDENCIAIS DE DEMONSTRAÇÃO:</strong>
          Admin: bruce@waynetech.com ou alfred@waynetech.com
          <br />
          Gerente: lucius@waynetech.com ou barbara@waynetech.com
          <br />
          Funcionário: dick@waynetech.com
          <br />
          Senha: wayne123
        </InfoDemo>
      </FormularioCard>
    </Container>
  )
}

export default PaginaLogin
