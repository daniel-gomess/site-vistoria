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

O formulário pede nome, telefone (com máscara e DDD), e-mail e modelo desejado. Quem marca "Ainda não decidi" está aberto a negociar o modelo, e o e-mail chega com o campo `Aberto a negociar o modelo: Sim`. Os botões "Escolher Delivery/Micro/Master" da tabela já deixam o modelo marcado no formulário.

O envio passa pelo [FormSubmit](https://formsubmit.co), um serviço gratuito que encaminha os dados por e-mail sem servidor próprio. No primeiro envio, ele manda um e-mail de ativação para o endereço de destino, e os cadastros só começam a chegar depois que alguém clica no link. Até lá, quem envia o formulário vê um aviso de que ele aguarda ativação, em vez da confirmação.

Para trocar o e-mail de destino, altere o endereço na constante `FORM_ENDPOINT` em `site.js` e no atributo `action` do formulário em `index.html` (este é usado quando o JavaScript está desativado). Depois da ativação, o FormSubmit oferece um código aleatório que pode substituir o endereço nesses dois lugares, para que ele não fique visível no código.

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
