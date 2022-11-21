# FrontendFastStoreLopestyle

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# FastStore-Lopestyle
Repositório Front-end TCC

----------Historico de desenvolvimento----------

17 Oct - Iniciando projeto Front-ent <br />
17 Oct - Criando footer e iniciando header <br />
20 Oct - Criando página inicial <br />
20 Oct - Criando modelos <br />
23 Oct - Criando serviço de produtos e organizando pastas <br />
25 Oct - Criando services de produtos e categorias <br />
25 Oct - Listando produtos e categorias cadastrado no sistema <br />
26 Oct - Paginando produtos e buscando por categoria <br />
29 Oct - Criando página de detalhes do produto, fazendo ela ser dinâmida. <br />
31 Oct - Trazendo categorias para tela inicial, fotos ainda estaticas <br />
31 0ct - Colocando um path "/produtos/id" para busca de produtos para poder filtrar por categorias através do path <br />
31 Oct - Arrumando navegação para produtos pelo header <br />
02 Nov - Criando página de login, integrando com backend. Apos realizar login armazena em um localStorage os dados como email e token de autenticação <br />
03 Nov - Criando Tela de perfil do consumidor, trazendo os dados do back-end e espondo na tela <br />
03 Nov - Arrumando botão de perfil, caso esteja logado é um dropdown com perfil e logout, caso n esteja o botão é de entrar. <br />
03 Nov - Logout funcional. <br />
04 Nov - Fazendo tela de registre-se. <br />
05 Nov - Criando validadores e mascaras para tela de registre-se. <br />
08 Nov - Criando interceptadores de requisição para incluir token de usuário, criando componente snack bar com 4 tipos de avisos(success, warning, error, info) <br />
08 Nov - incluindo refresh token ao inicializar o home.ts. <br />
09 Nov - Criando lógica do carrinho de compras (no localStorage) e tela de carrinho de compras, <br />
10 Nov - fazendo validador de confimação de password e concluindo cadastramento de consumidor<br />
12 Nov - Criando um alterar senha, com dialog verificador de senha e validadores.<br />
13 Nov - Customizando e fazendo a tela de carrinho de compras funcional.<br />
15 Nov - Criando AddressService para buscar endereço pela API do ViaCep.<br />
18 Nov - Alterando tela de carrinho de compras, integrando api do ViaCep com Api dos Correios para calcular preço e prazo das entregas do produto.<br />
19 Nov - Criando página de pagamentos, organizando e estilizando a página, incluindo url de imagem em categoria.<br />
20 Nov - Deixando página funcional, verificando endereço, verificando método de pagamento, listando pedidos e verificando valor da entrega.<br />
20 Nov - Criando mais 2 localStorages "shippingPrecoPrazo","orderAddress" fazendo validações da página de pagamento.<br />
