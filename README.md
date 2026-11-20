# 3V · Landing page de franquias

Página única para captar interessados em abrir uma franquia de vistoria automotiva da 3V (3VO Terceira Visão). Ela apresenta o mercado, a empresa, os serviços, a gravação de NIV com perícia veicular e os três modelos de franquia, e termina num formulário de cadastro que chega por e-mail.

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
site.css          estilos da página e os dois temas de cor
site.js           comportamento: ficha de vistoria, gravação do NIV, botão Tema, formulário
scrollcraft.css   engine de animação por rolagem (não editar)
scrollcraft.js    engine de animação por rolagem (não editar)
assets/img/       fotos e logos usados na página
emailjs/          modelo HTML do e-mail de cadastro, para colar no EmailJS
.scrollcraft/     brief de design e registro do projeto (não é publicado no site)
```

## Seções

| Seção | O que mostra |
|---|---|
| Capa | Foto do farol com uma mira de inspeção que se fecha durante a rolagem |
| Mercado | 14 milhões de veículos por ano e os riscos de uma compra sem vistoria |
| Empresa | Quem é a 3V: pilares, missão, visão e valores |
| Serviços | Portfólio em trilho horizontal, de vistoria cautelar a perito em ID veicular |
| NIV e perícia | O número de chassi é gravado letra por letra enquanto o visitante rola a página |
| Modelos | Tabela com Delivery (R$ 20 mil), Micro (R$ 40 mil) e Master (R$ 60 mil) |
| Suporte | Frentes de suporte ao franqueado e canais de marketing |
| Cadastro | Formulário de interesse |

Em telas a partir de 1200px, a "Ficha de vistoria" na margem esquerda lista as seções e marca cada uma como conferida quando o visitante passa por ela.

## Botão Tema (logo 1 e logo 2)

O logo oficial ainda não foi escolhido, então a página traz as duas versões, e o botão Tema no cabeçalho alterna entre elas. O logo 1 é branco sobre vinho (`#A31526`) e deixa a página em tons de vinho escuro. O logo 2 é branco com um ponto vermelho sobre grafite (`#33404A`) e deixa a página em tons de grafite.

O navegador do visitante guarda a escolha. Para abrir a página já num tema, use `?logo=1` ou `?logo=2` na URL.

As cores de cada tema ficam no início do `site.css`, nos blocos `[data-brand="1"]` e `[data-brand="2"]`. Quando o logo oficial for definido, remova o botão do cabeçalho em `index.html` e fixe o `data-brand` no script do `<head>`.

## Formulário de cadastro

O formulário pede nome, telefone (com máscara e DDD), e-mail e modelo desejado. Quem marca "Ainda não decidi" recebe esse texto na linha Modelo do e-mail. Os botões "Escolher Delivery/Micro/Master" da tabela já deixam o modelo marcado no formulário.

O envio usa o [EmailJS](https://www.emailjs.com), que manda o e-mail com um modelo próprio: em português, com o logo e as cores da 3V, horário de Brasília e botões para chamar o interessado no WhatsApp ou ligar. O "Responder" do e-mail vai direto para quem se cadastrou. O plano gratuito do EmailJS cobre 200 e-mails por mês.

Enquanto as chaves do EmailJS não estiverem preenchidas, o site envia pelo [FormSubmit](https://formsubmit.co), que já está ativado. Assim o formulário não para durante a troca.

### Configurando o EmailJS

1. Crie uma conta gratuita em emailjs.com.
2. Em *Email Services*, clique em *Add New Service*, escolha o seu provedor de e-mail (Outlook ou Gmail) e conecte a conta que vai enviar as mensagens. Anote o *Service ID*.
3. Em *Email Templates*, crie um template. Na aba de conteúdo, abra o editor de código e cole o arquivo `emailjs/template-cadastro.html` deste repositório. Preencha os campos do envio assim:
   - Subject: `Novo cadastro de franqueado · 3V · {{nome}}`
   - To Email: o e-mail que deve receber os cadastros
   - From Name: `Site 3V`
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

O envio está separado em "provedores" no fim do `site.js` (`providers.emailjs` e `providers.formsubmit`). Para usar um envio próprio na VPS, sem limite mensal, crie um provedor que faça POST para a API do servidor e escolha esse provedor na função `sendLead`. A função `buildLead` já monta todos os dados do cadastro, incluindo data e hora de Brasília e os links de WhatsApp e telefone. O `template-cadastro.html` também pode ser reaproveitado no servidor.

### Sem JavaScript

Se o JavaScript estiver desativado no navegador do visitante, o formulário é enviado direto ao FormSubmit (atributo `action` do `<form>`), por POST. Para trocar esse e-mail de destino, altere o `action` e a constante `FORMSUBMIT_URL` em `site.js`.

## Editando o conteúdo

Todo o texto está em `index.html`, organizado por seção e com comentários.

Os valores dos modelos aparecem em três lugares: na tabela em `#modelos`, nas opções do formulário em `#cadastro` e na frase da capa ("a partir de R$ 20 mil"). O número de mercado está no contador em `#mercado` (`data-sc-count="0 14"`) e no item "Mercado em expansão" do cadastro.

As imagens ficam em `assets/img/`, em `.webp`. Ao trocar uma, atualize os atributos `width` e `height` do `<img>` com as dimensões do novo arquivo.

O número de chassi da chapa (`9BV3VSTR1A2025814`) é um exemplo, e a página o identifica como ilustrativo.

## Publicação

Como o site é estático, qualquer hospedagem de arquivos serve. No GitHub Pages, vá em *Settings → Pages* e escolha a branch `main` com a pasta raiz. Na Vercel ou na Netlify, importe o repositório sem comando de build, usando a raiz do projeto como pasta de saída.

## Créditos

- Fotos de veículos: [Unsplash](https://unsplash.com), licença Unsplash (uso comercial permitido, sem exigência de atribuição).
- Logos e foto da fachada: 3V / 3VO Terceira Visão.
- Fontes: Geist e Geist Mono, via Google Fonts.
