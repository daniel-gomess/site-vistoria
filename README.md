# Super Visão · Landing page de franquias

Página única para captar interessados em abrir uma franquia de vistoria automotiva da Super Visão Vistorias Automotivas. Ela apresenta o mercado, a empresa, os serviços, a gravação de NIV com perícia veicular e os três modelos de franquia, e termina num formulário de cadastro que chega por e-mail.

O site é estático, feito em HTML, CSS e JavaScript puros. Não tem framework nem etapa de build.

## Como rodar localmente

Abra a pasta com qualquer servidor estático:

```bash
npx serve .
# ou
python -m http.server 4500
```

Depois acesse `http://localhost:4500`. Abrir o `index.html` direto do disco (`file://`) também funciona, mas o envio do formulário só funciona num endereço `http(s)`.

## Estrutura

```
index.html        conteúdo da página (todas as seções)
site.css          estilos e cores da página
site.js           comportamento: ficha de vistoria, gravação do NIV, formulário
scrollcraft.css   engine de animação por rolagem (não editar)
scrollcraft.js    engine de animação por rolagem (não editar)
assets/img/       fotos e logos usados na página
emailjs/          modelo HTML do e-mail de cadastro (fonte única) e prompts da extensão
apps-script/      script do Google que envia o cadastro pelo Gmail
.scrollcraft/     brief de design e registro do projeto (não é publicado no site)
```

## Seções

| Seção | O que mostra |
|---|---|
| Capa | Foto do farol com uma mira de inspeção que se fecha durante a rolagem |
| Mercado | 14 milhões de veículos por ano e os riscos de uma compra sem vistoria |
| Empresa | Quem é a Super Visão: pilares, foto da unidade de Guarulhos, missão, visão e valores |
| Serviços | Portfólio em trilho horizontal, de vistoria cautelar a perito em ID veicular |
| NIV e perícia | O número de chassi é gravado letra por letra enquanto o visitante rola a página |
| Modelos | Tabela com Delivery (R$ 20 mil), Micro (R$ 40 mil) e Master (R$ 60 mil) |
| Suporte | Frentes de suporte ao franqueado e canais de marketing |
| Cadastro | Formulário de interesse |

Em telas a partir de 1200px, a "Ficha de vistoria" na margem esquerda lista as seções e marca cada uma como conferida quando o visitante passa por ela.

## Marca e cores

A página usa a identidade da Super Visão Vistorias Automotivas ([supervisao.com](https://supervisao.com)). O vermelho do logo (`#E21F1B`) é a cor principal, sobre um fundo escuro avermelhado. O azul-marinho da marca (`#062264`) aparece só no logo.

As cores ficam no bloco `:root` no início do `site.css`. `--sc-accent` é o vermelho dos botões e destaques, e `--accent-fg` é um tom mais claro do mesmo vermelho, usado em textos sobre o fundo escuro para manter a leitura confortável.

Há duas versões do logo em `assets/img/`: `logo-supervisao-branco.png` (azul trocado por branco, usada no site) e `logo-supervisao.png` (cores originais, usada no e-mail, que tem fundo branco).

## Formulário de cadastro

O formulário pede nome, telefone (com máscara e DDD), e-mail e modelo desejado. Quem marca "Ainda não decidi" recebe esse texto na linha Modelo do e-mail. Os botões "Escolher Delivery/Micro/Master" da tabela já deixam o modelo marcado no formulário.

O envio usa um Google Apps Script (`apps-script/Code.gs`) que manda o e-mail pela sua conta Gmail, com um modelo próprio: em português, com o logo e as cores da Super Visão, horário de Brasília e botões para chamar o interessado no WhatsApp ou ligar. O "Responder" vai direto para quem se cadastrou, e não há rodapé de nenhum serviço. É gratuito; o Gmail permite cerca de 100 destinatários por dia (cada cópia conta como um destinatário).

O site escolhe a forma de envio nesta ordem: o Apps Script, se `data-appsscript-url` estiver preenchido no `<form>`; senão o [EmailJS](https://www.emailjs.com), se as três chaves `data-emailjs-*` estiverem preenchidas; senão o [FormSubmit](https://formsubmit.co). O EmailJS no plano gratuito acrescenta "Email sent via EmailJS.com" no fim de cada e-mail, e só os planos pagos tiram essa linha.

### Configurando o Google Apps Script

1. Entre em [script.google.com](https://script.google.com) com a conta Google que vai enviar os e-mails e clique em *Novo projeto*.
2. Apague o conteúdo do arquivo `Código.gs` e cole todo o `apps-script/Code.gs` deste repositório. Dê um nome ao projeto, por exemplo "Cadastro Super Visão".
3. No começo do código, confira `DESTINO` (quem recebe os cadastros) e, se quiser cópia para outra pessoa, preencha `COPIA`. Salve (Ctrl+S).
4. No menu de funções, escolha `testarEnvio` e clique em *Executar*. O Google vai pedir autorização: escolha a sua conta, clique em *Avançado* e depois em *Acessar Cadastro Super Visão (não seguro)*, e permita. Esse aviso aparece porque o script é seu e não passou por revisão do Google. Deve chegar um e-mail de teste em `DESTINO`.
5. Clique em *Implantar* > *Nova implantação*. No ícone de engrenagem, escolha *App da Web*. Em *Executar como*, deixe *Eu*; em *Quem pode acessar*, escolha *Qualquer pessoa*. Clique em *Implantar*.
6. Copie a *URL do app da Web* (termina em `/exec`) e coloque no `index.html`, no atributo `data-appsscript-url` do `<form id="form-cadastro">`.

Para mudar destinatário ou cópia depois, edite o script e faça *Implantar* > *Gerenciar implantações* > editar (lápis) > *Nova versão* > *Implantar*. A URL continua a mesma.

O script recusa dados fora do formato esperado (modelo inexistente, telefone inválido, links estranhos), ignora envios de robôs e limita a 30 envios por hora.

O HTML do e-mail vem de `emailjs/template-cadastro.html`. Depois de mudar esse arquivo, rode `python apps-script/gerar-code.py .` na pasta do projeto para gerar o `Code.gs` de novo, e atualize o script no Google (colar e criar nova versão da implantação).

### Configurando o EmailJS

1. Crie uma conta gratuita em emailjs.com.
2. Em *Email Services*, clique em *Add New Service*, escolha o seu provedor de e-mail (Outlook ou Gmail) e conecte a conta que vai enviar as mensagens. Anote o *Service ID*.
3. Em *Email Templates*, crie um template. Na aba de conteúdo, abra o editor de código e cole o arquivo `emailjs/template-cadastro.html` deste repositório. Preencha os campos do envio assim:
   - Subject: `Novo cadastro de franqueado · Super Visão · {{nome}}`
   - To Email: o e-mail que deve receber os cadastros
   - From Name: `Site Super Visão`
   - Reply To: `{{reply_to}}`

   Salve e anote o *Template ID*.
4. Em *Account*, copie a *Public Key*.
5. No `index.html`, preencha os três atributos do `<form id="form-cadastro">`:

   ```html
   data-emailjs-service="service_xxxxxxx"
   data-emailjs-template="template_xxxxxxx"
   data-emailjs-key="sua_public_key"
   ```

Essas três chaves são públicas por natureza: o EmailJS foi feito para rodar no navegador e elas aparecem no código de qualquer site que o usa. Para evitar abuso, restrinja nas configurações de segurança da conta os domínios que podem usar as chaves (o endereço do GitHub Pages e, depois, o domínio definitivo).

O logo do e-mail é carregado do site publicado. Se o endereço do site mudar, troque a URL da imagem no começo do template.

### Quando o site for para a VPS

O envio está separado em "provedores" no fim do `site.js` (`providers.appsscript`, `providers.emailjs` e `providers.formsubmit`). Para usar um envio próprio na VPS, sem limite mensal, crie um provedor que faça POST para a API do servidor e escolha esse provedor na função `sendLead`. A função `buildLead` já monta todos os dados do cadastro, incluindo data e hora de Brasília e os links de WhatsApp e telefone. O `template-cadastro.html` também pode ser reaproveitado no servidor.

### Sem JavaScript

Se o JavaScript estiver desativado no navegador do visitante, o formulário é enviado direto ao FormSubmit (atributo `action` do `<form>`), por POST. Para trocar esse e-mail de destino, altere o `action` e a constante `FORMSUBMIT_URL` em `site.js`.

## Editando o conteúdo

Todo o texto está em `index.html`, organizado por seção e com comentários.

Os valores dos modelos aparecem em três lugares: na tabela em `#modelos`, nas opções do formulário em `#cadastro` e na frase da capa ("a partir de R$ 20 mil"). O número de mercado está no contador em `#mercado` (`data-sc-count="0 14"`) e no item "Mercado em expansão" do cadastro.

As imagens ficam em `assets/img/`, em `.webp`. Ao trocar uma, atualize os atributos `width` e `height` do `<img>` com as dimensões do novo arquivo.

O número de chassi da chapa (`9BWSV7R1A2025814X`) é um exemplo, e a página o identifica como ilustrativo.

## Publicação

Como o site é estático, qualquer hospedagem de arquivos serve. No GitHub Pages, vá em *Settings → Pages* e escolha a branch `main` com a pasta raiz. Na Vercel ou na Netlify, importe o repositório sem comando de build, usando a raiz do projeto como pasta de saída.

## Créditos

- Fotos de veículos: [Unsplash](https://unsplash.com), licença Unsplash (uso comercial permitido, sem exigência de atribuição).
- Logo e fotos das unidades (fachada e Guarulhos Auto Shopping): Super Visão. O telefone que aparecia nas fotos foi removido.
- Fontes: Geist e Geist Mono, via Google Fonts.
