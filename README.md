
# 📱 Barberia Bryan App v1.0

Este é um aplicativo móvel completo para a **Bryan Barbearia**, desenvolvido com **React Native** e **Expo**.  
O app permite que os clientes visualizem informações sobre a barbearia, conheçam os profissionais, agendem horários e gerenciem seus agendamentos.

---

## 🚀 Funcionalidades Principais

- **Navegação por Abas**: Interface principal organizada com uma barra de navegação inferior para acesso rápido às seções.
- **Tela Inicial Dinâmica**: Apresenta um resumo do próximo agendamento, lista de barbeiros e serviços populares.
- **Visualização de Barbeiros**: Tela dedicada com perfil de cada barbeiro, especialidades, avaliações e galeria de cortes.
- **Agendamento Passo a Passo**: Fluxo guiado para escolher serviço, profissional, data e horário.
- **Informações de Contato**: Endereço, redes sociais e horário de funcionamento acessíveis com facilidade.
- **Design Moderno**: Tema escuro, animações suaves e identidade visual consistente.

---

## 🖼️ Telas do Aplicativo

### 1. **Layout de Abas** `((tabs)/_layout.tsx)`
Define a estrutura principal de navegação com 5 abas:

- `Início`: Tela principal  
- `Barbeiros`: Lista de profissionais  
- `Agendar`: Botão central para agendamento  
- `Horários`: Agendamentos do usuário  
- `Informações`: Dados de contato e sobre a barbearia

---

### 2. **Tela Inicial** `((tabs)/index.tsx)`

- **Saudação**: Mensagem personalizada
- **Próximo Agendamento**: Cartão com detalhes do próximo horário marcado
- **Nossos Barbeiros**: Lista horizontal com perfis
- **Serviços Populares**: Lista vertical com serviços mais procurados

---

### 3. **Tela de Barbeiros** `((tabs)/barbeiros.tsx)`

- **Cartões de Perfil**: Foto, nome, especialidade, avaliação, anos de experiência e status
- **Galeria de Cortes**: Imagens dos cortes realizados
- **Botão de Agendar**: Agendamento direto com o barbeiro

---

### 4. **Tela de Agendamento** `((tabs)/agendar.tsx)`

Fluxo dividido em 4 etapas:

1. **Escolha o Serviço**  
2. **Escolha o Profissional**  
3. **Escolha a Data**  
4. **Escolha o Horário**

> Ao final, um **resumo completo** é exibido antes da confirmação, em um modal.

---

### 5. **Tela de Informações** `((tabs)/info.tsx)`

- **Redes Sociais e Contato**: WhatsApp, Instagram
- **Localização**: Endereço com botões para Google Maps ou Waze
- **Horário de Funcionamento**: Dias da semana com horários detalhados
- **Sobre a Barbearia**: Descrição, estatísticas (clientes, barbeiros, etc.)
- **Perfil do Usuário**: Opção de logout

---

## 🛠️ Tecnologias Utilizadas

- **React Native**: Desenvolvimento mobile multiplataforma
- **Expo**: Plataforma para facilitar o desenvolvimento com React Native
- **TypeScript**: Tipagem estática
- **Expo Router**: Roteamento baseado em arquivos
- **Lucide React Native**: Ícones modernos
- **React Native Reanimated**: Animações fluidas

---

## 📂 Estrutura de Arquivos (Simplificada)

```
/app
|-- (tabs)
|   |-- _layout.tsx         # Estrutura da navegação por abas
|   |-- index.tsx           # Tela Inicial
|   |-- barbeiros.tsx       # Tela de Barbeiros
|   |-- agendar.tsx         # Tela de Agendamento
|   |-- horarios.tsx        # Tela de Horários (Agenda do usuário)
|   `-- info.tsx            # Tela de Informações
|
|-- _layout.tsx             # Layout raiz do app
/components
|   `-- StyledText.tsx      # Componente de texto customizado
/constants
    `-- data.ts             # Dados mockados (barbeiros, serviços, etc.)
```

---

## ⚙️ Como Executar o Projeto

1. **Clone o repositório:**

```bash
git clone BarbeariaBryanApp.git
```

2. **Navegue até o diretório do projeto:**

```bash
cd BarbeariaBryanApp
```

3. **Instale as dependências:**

```bash
npm install
# ou
yarn install
```

4. **Inicie o servidor de desenvolvimento do Expo:**

```bash
npx expo start
```

5. **Execute no seu dispositivo:**

Leia o QR Code com o aplicativo **Expo Go** (disponível para Android e iOS).
