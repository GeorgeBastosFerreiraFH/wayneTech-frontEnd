# **WayneTech Security \- Frontend Interface**

Esta é a interface de usuário para o sistema de segurança da WayneTech. Desenvolvida em React, esta aplicação permite que os funcionários da WayneTech acessem e gerenciem o inventário de equipamentos de forma segura e intuitiva, com base em seus níveis de acesso.

## **✨ Features**

* **Interface Moderna:** Construída com React e estilizada com Styled Components para uma experiência de usuário limpa e responsiva.  
* **Login e Gerenciamento de Sessão:** Fluxo de autenticação completo que interage com a API backend para validar credenciais e gerenciar sessões de usuário via JWT.  
* **Visualização de Dados:** Exibição de dados do inventário com base nas permissões do usuário logado.  
* **Renderização 3D:** Utiliza React Three Fiber para renderizar modelos 3D interativos dos equipamentos no inventário.  
* **Animações Fluidas:** Framer Motion é usado para criar animações e transições suaves, melhorando a interatividade.  
* **Gráficos e Dashboards:** A biblioteca Recharts é usada para visualizar dados e estatísticas do sistema.

## **🚀 Tecnologias Utilizadas**

* **Framework:** [React](https://react.dev/) (v18)  
* **Build Tool:** [Vite](https://vitejs.dev/)  
* **Roteamento:** [React Router DOM](https://reactrouter.com/) (v6)  
* **Estilização:** [Styled Components](https://styled-components.com/)  
* **Animações:** [Framer Motion](https://www.framer.com/motion/)  
* **Renderização 3D:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction), [Drei](https://github.com/pmndrs/drei) & [Three.js](https://threejs.org/)  
* **Gráficos:** [Recharts](https://recharts.org/)  
* **Ícones:** [Lucide React](https://lucide.dev/)

## **🔧 Configuração do Ambiente**

Para rodar este projeto localmente, você precisa criar um arquivo .env.local na raiz do projeto para configurar a URL da API backend.

Crie um arquivo chamado .env.local e adicione a seguinte variável:

\# URL base da sua API backend (ambiente de desenvolvimento)  
VITE\_API\_URL=http://localhost:3000/api

## **⚙️ Rodando o Projeto Localmente**

1. **Clone o repositório:**  
   git clone \<URL\_DO\_SEU\_REPOSITORIO\_FRONTEND\>  
   cd \<NOME\_DA\_PASTA\_DO\_PROJETO\>

2. **Instale as dependências:**  
   npm install

3. **Crie e configure o arquivo .env.local** conforme a seção anterior.  
4. **Inicie o servidor de desenvolvimento:**  
   npm run dev

A aplicação estará disponível em http://localhost:5173.

## **🔐 Fluxo de Autenticação**

O sistema utiliza autenticação baseada em JSON Web Token (JWT) sem refresh token.

1. O usuário insere seu email e senha na página de login.  
2. Uma requisição POST é enviada para o endpoint /auth/login da API.  
3. Se as credenciais estiverem corretas, a API retorna um token JWT e os dados do usuário.  
4. O frontend armazena o token e os dados do usuário no localStorage e no sessionStorage para persistir a sessão.  
5. Para todas as requisições subsequentes a rotas protegidas, o token JWT é enviado no cabeçalho Authorization como um Bearer Token.  
6. O logout simplesmente remove o token e os dados do usuário do localStorage e sessionStorage.

## **🚀 Deploy**

O frontend está hospedado na [Netlify](https://www.netlify.com/) e se comunica com a API backend hospedada na Vercel.