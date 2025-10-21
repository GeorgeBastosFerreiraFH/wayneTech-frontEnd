"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { autenticacao } from "../servicos/api"

export const ContextoAutenticacao = createContext(null)

export const useAutenticacao = () => {
  const contexto = useContext(ContextoAutenticacao)
  if (!contexto) {
    throw new Error("useAutenticacao deve ser usado dentro de um ContextoAutenticacao.Provider")
  }
  return contexto
}

export const ProvedorAutenticacao = ({ children }) => {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [token, setToken] = useState(null)

  const salvarDados = (chave, valor) => {
    try {
      localStorage.setItem(chave, valor)
      sessionStorage.setItem(chave, valor) // backup
      console.log(`[v0] Salvou ${chave} em localStorage e sessionStorage`)
    } catch (erro) {
      console.error(`[v0] Erro ao salvar ${chave}:`, erro)
    }
  }

  const recuperarDados = (chave) => {
    let valor = localStorage.getItem(chave)
    if (!valor) {
      valor = sessionStorage.getItem(chave)
      if (valor) {
        console.log(`[v0] ${chave} recuperado do sessionStorage (fallback)`)
      }
    } else {
      console.log(`[v0] ${chave} recuperado do localStorage`)
    }
    return valor
  }

  const removerDados = (chave) => {
    localStorage.removeItem(chave)
    sessionStorage.removeItem(chave)
    console.log(`[v0] Removeu ${chave} de localStorage e sessionStorage`)
  }

  // Normaliza o objeto usuário vindo do backend/localStorage
  const normalizarUsuario = (u) => {
    if (!u) return null

    // Se u for string (do localStorage), parse com proteção
    let usuarioObj = u
    if (typeof u === "string") {
      try {
        usuarioObj = JSON.parse(u)
      } catch (e) {
        console.error("[v0] Erro ao parsear usuário:", e)
        return null
      }
    }

    if (!usuarioObj || typeof usuarioObj !== "object") return null

    return {
      id: usuarioObj.id ?? null,
      nome: usuarioObj.nome ?? usuarioObj.name ?? null,
      email: usuarioObj.email ?? null,
      // padroniza campo de nível: aceita nivel, nivel_acesso, level, access_level
      nivel: usuarioObj.nivel ?? usuarioObj.nivel_acesso ?? usuarioObj.level ?? usuarioObj.access_level ?? null,
      // mantém quaisquer outros campos
      ...usuarioObj,
    }
  }

  // Verificar se há token salvo ao carregar a aplicação
  useEffect(() => {
    const verificarAutenticacao = async () => {
      console.log("[v0] === INICIANDO VERIFICAÇÃO DE AUTENTICAÇÃO ===")
      console.log("[v0] localStorage.length:", localStorage.length)
      console.log("[v0] sessionStorage.length:", sessionStorage.length)
      console.log("[v0] localStorage keys:", Object.keys(localStorage))
      console.log("[v0] sessionStorage keys:", Object.keys(sessionStorage))

      const tokenSalvo = recuperarDados("token")
      const usuarioSalvo = recuperarDados("usuario")

      console.log("[v0] Token encontrado:", tokenSalvo ? `${tokenSalvo.substring(0, 50)}...` : "NULL")
      console.log("[v0] Usuário encontrado:", usuarioSalvo ? usuarioSalvo.substring(0, 100) : "NULL")

      if (tokenSalvo) {
        try {
          console.log("[v0] Verificando token com o servidor...")
          const resposta = await autenticacao.verificarToken()
          console.log("[v0] Token válido, resposta do servidor:", resposta)

          const usuarioNormalizado = normalizarUsuario(resposta?.usuario) || normalizarUsuario(usuarioSalvo)
          console.log("[v0] Usuário normalizado:", usuarioNormalizado)
          setUsuario(usuarioNormalizado)
          setToken(tokenSalvo)
        } catch (erro) {
          console.error("[v0] Token inválido ou expirado:", erro)
          removerDados("token")
          removerDados("usuario")
          setUsuario(null)
          setToken(null)
        }
      } else if (usuarioSalvo) {
        console.log("[v0] Sem token, mas usuário encontrado")
        setUsuario(normalizarUsuario(usuarioSalvo))
      } else {
        console.log("[v0] Nenhum token ou usuário encontrado")
      }

      setCarregando(false)
      console.log("[v0] === VERIFICAÇÃO DE AUTENTICAÇÃO CONCLUÍDA ===")
    }

    verificarAutenticacao()
  }, [])

  const login = async (email, senha) => {
    try {
      console.log("[v0] Tentando fazer login:", { email })
      const resposta = await autenticacao.login(email, senha)
      console.log("[v0] Resposta do login:", resposta)

      const usuarioNormalizado = normalizarUsuario(resposta.usuario)
      console.log("[v0] Usuário normalizado após login:", usuarioNormalizado)

      setUsuario(usuarioNormalizado)
      setToken(resposta.token)

      console.log("[v0] Salvando dados...")
      salvarDados("token", resposta.token)
      salvarDados("usuario", JSON.stringify(usuarioNormalizado))

      console.log("[v0] Verificando se foi salvo corretamente...")
      const tokenVerificacao = recuperarDados("token")
      const usuarioVerificacao = recuperarDados("usuario")
      console.log("[v0] Token recuperado:", tokenVerificacao ? tokenVerificacao.substring(0, 50) + "..." : "NULL")
      console.log("[v0] Usuário recuperado:", usuarioVerificacao ? usuarioVerificacao.substring(0, 100) : "NULL")

      return { sucesso: true, usuario: usuarioNormalizado }
    } catch (erro) {
      console.error("[v0] Erro no login:", erro)
      return { sucesso: false, erro: erro?.message ?? "Erro no login" }
    }
  }

  const logout = () => {
    console.log("[v0] Fazendo logout")
    setUsuario(null)
    setToken(null)
    removerDados("token")
    removerDados("usuario")
    console.log("[v0] Dados removidos dos storages")
  }

  const valor = {
    usuario,
    token,
    login,
    logout,
    carregando,
    estaAutenticado: !!usuario && !!token,
  }

  return <ContextoAutenticacao.Provider value={valor}>{children}</ContextoAutenticacao.Provider>
}

export default ProvedorAutenticacao
