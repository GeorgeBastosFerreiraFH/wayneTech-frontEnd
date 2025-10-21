// Serviço de API para comunicação com o backend

const DEFAULT_API = (() => {
  try {
    if (typeof window !== "undefined") {
      return `${window.location.protocol}//${window.location.hostname}:5000/api`
    }
  } catch {}
  return "http://localhost:5000/api"
})()

const API_URL = import.meta.env.VITE_API_URL || DEFAULT_API

// Helper para fazer requisições com token
const fetchComToken = async (url, options = {}) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  console.log("API Request:", {
    url: `${API_URL}${url}`,
    method: options.method || "GET",
    hasToken: !!token,
    tokenPreview: token ? `${token.substring(0, 20)}...` : "none",
  })

  let response
  try {
    response = await fetch(`${API_URL}${url}`, {
      method: options.method || "GET",
      headers,
      body: options.body,
      mode: "cors",
      cache: "no-store",
    })
  } catch (networkErr) {
    console.error("Network error:", networkErr)
    throw new Error("Erro de rede: não foi possível conectar à API")
  }

  const text = await response.text().catch(() => null)
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }

  console.log("API Response:", {
    url: `${API_URL}${url}`,
    status: response.status,
    ok: response.ok,
    dataPreview: data ? JSON.stringify(data).substring(0, 100) : "empty",
  })

  if (!response.ok) {
    const mensagem = (data && (data.erro || data.message)) || `Erro ${response.status}`
    const err = new Error(mensagem)
    err.status = response.status
    err.body = data
    throw err
  }

  return data
}

// Autenticação
export const autenticacao = {
  login: async (email, senha) => {
    return fetchComToken("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, senha }),
    })
  },

  verificarToken: async () => {
    return fetchComToken("/auth/verificar")
  },
}

// Inventário
export const inventario = {
  listar: async () => {
    return fetchComToken("/inventario")
  },

  adicionar: async (item) => {
    return fetchComToken("/inventario", {
      method: "POST",
      body: JSON.stringify(item),
    })
  },

  atualizar: async (id, item) => {
    return fetchComToken(`/inventario/${id}`, {
      method: "PUT",
      body: JSON.stringify(item),
    })
  },

  remover: async (id) => {
    return fetchComToken(`/inventario/${id}`, {
      method: "DELETE",
    })
  },
}

// Dashboard
export const dashboard = {
  estatisticas: async () => {
    return fetchComToken("/dashboard/estatisticas")
  },
}

// Monitoramento
export const monitoramento = {
  cameras: async () => {
    return fetchComToken("/monitoramento/cameras")
  },

  alertas: async () => {
    return fetchComToken("/monitoramento/alertas")
  },
}

// Logs
export const logs = {
  listar: async () => {
    return fetchComToken("/logs")
  },
}

export default {
  autenticacao,
  inventario,
  dashboard,
  monitoramento,
  logs,
}
