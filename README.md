# 3V · Landing page de franquias

Página única para captar interessados em abrir uma franquia de vistoria automotiva da 3V (3VO Terceira Visão). Ela apresenta o mercado, a empresa, os serviços, o diferencial de gravação de NIV e perícia veicular e os três modelos de franquia. No final, um formulário de cadastro envia os dados por e-mail.

O site é estático: HTML, CSS e JavaScript puros, sem framework e sem etapa de build.

## Como rodar localmente

Abra a pasta com qualquer servidor estático. Exemplos:

```bash
npx serve .
# ou
python -m http.server 4500
```

Depois acesse `http://localhost:4500`. Abrir o `index.html` direto do disco (`file://`) também funciona, mas o envio do formulário precisa de um endereço `http(s)`.

## Estrutura

```
index.html        conteúdo da página (todas as seções)
site.css          estilos da página e os dois temas de cor
site.js           comportamento: ficha de vistoria, gravação do NIV, botão Tema, formulário
scrollcraft.css   engine de animação por rolagem (não editar)
scrollcraft.js    engine de animação por rolagem (não editar)
assets/img/       fotos e logos usados na página
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

A "Ficha de vistoria" na margem esquerda (telas a partir de 1200px) lista as seções e marca cada uma como conferida quando o visitante passa por ela.

## Botão Tema (logo 1 e logo 2)

O logo oficial ainda está sendo definido, então a página tem as duas versões. O botão **Tema** no cabeçalho alterna entre elas:

- **Logo 1:** logo branco sobre vinho (`#A31526`), com a página em tons de vinho escuro.
- **Logo 2:** logo branco com ponto vermelho sobre grafite (`#33404A`), com a página em tons de grafite.

A escolha fica salva no navegador do visitante. Para abrir a página já num tema, use o parâmetro na URL: `?logo=1` ou `?logo=2`.

As cores de cada tema ficam no início do `site.css`, nos blocos `[data-brand="1"]` e `[data-brand="2"]`. Quando o logo oficial for escolhido, basta remover o botão do cabeçalho em `index.html` e fixar o `data-brand` no script do `<head>`.

## Formulário de cadastro

O formulário pede nome, telefone (com máscara e DDD), e-mail e modelo desejado. A opção "Ainda não decidi" indica que o interessado está aberto a negociar o modelo, e o e-mail chega com o campo **Aberto a negociar o modelo: Sim**. Os botões "Escolher Delivery/Micro/Master" da tabela já marcam o modelo no formulário.

O envio usa o [FormSubmit](https://formsubmit.co), um serviço gratuito que encaminha os dados por e-mail sem precisar de servidor próprio.

- **Ativação:** no primeiro envio, o FormSubmit manda um e-mail de ativação para o endereço de destino. Os cadastros só passam a chegar depois que alguém clica no link de ativação. Até lá, a página mostra um aviso de "formulário aguardando ativação" e nunca uma confirmação falsa.
- **Trocar o e-mail de destino:** altere o endereço em dois lugares: a constante `FORM_ENDPOINT` em `site.js` e o atributo `action` do formulário em `index.html`. O segundo é usado quando o JavaScript está desativado.
- **Esconder o e-mail no código:** depois da ativação, o FormSubmit oferece um código aleatório que pode substituir o endereço nesses dois lugares.

## Editando o conteúdo

Todo o texto está em `index.html`, organizado por seção e com comentários. Alguns pontos frequentes:

- **Valores dos modelos:** a tabela em `#modelos`, as opções do formulário em `#cadastro` e a frase da capa ("a partir de R$ 20 mil").
- **Número de mercado:** o contador em `#mercado` (`data-sc-count="0 14"`) e o item "Mercado em expansão" no cadastro.
- **Imagens:** ficam em `assets/img/`, em `.webp`. Ao trocar uma imagem, mantenha os atributos `width` e `height` do `<img>` com as dimensões reais do novo arquivo.

O número de chassi da chapa (`9BV3VSTR1A2025814`) é um exemplo ilustrativo e está identificado assim na página.

## Publicação

Por ser estático, o site pode ser publicado em qualquer hospedagem de arquivos:

- **GitHub Pages:** em *Settings → Pages*, escolha a branch `main` e a pasta raiz.
- **Vercel ou Netlify:** importe o repositório sem comando de build e com a raiz do projeto como pasta de saída.

## Créditos

- Fotos de veículos: [Unsplash](https://unsplash.com), licença Unsplash (uso comercial permitido, sem exigência de atribuição).
- Logos e foto da fachada: 3V / 3VO Terceira Visão.
- Fontes: Geist e Geist Mono, via Google Fonts.
