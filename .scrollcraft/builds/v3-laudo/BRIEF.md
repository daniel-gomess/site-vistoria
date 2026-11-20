# V3 Vistoria · landing page de franquias

**Status do brief:** entrevista parcial. As respostas 1, 6, 7 e 8 são do usuário, palavra por palavra. As respostas 2 a 5 foram delegadas ("utilize seu julgamento") e estão marcadas como **decisão autoral sob delegação explícita**.

## Fonte de conteúdo

`Vistoria V3.pptx` (slides 1 a 14). Os slides 15 a 17 (funil comercial e remuneração do representante) são internos e ficam fora da página.

Decisões do usuário sobre os conflitos da apresentação:
- Investimento: Delivery R$ 20.000, Micro R$ 40.000, Master R$ 60.000 (slide 8).
- Mercado: "14M+ veículos comercializados por ano" (slide 13).
- Formulário: FormSubmit, enviando para o e-mail informado pelo usuário.
- Imagens: fotos livres do Unsplash (licença Unsplash). Não há logo, paleta ou fotos da marca.

## As oito perguntas

1. **Clima** (usuário): "técnico, bonito, rápido".
2. **Jornada** (autoral): capa, mercado e risco, quem é a V3, portfólio, silêncio, NIV + perícia, modelos, suporte, cadastro.
3. **Curva de energia** (autoral): a abertura é calma e precisa. O mercado sobe a tensão. A empresa e o portfólio dão alívio e amplitude. Uma pausa quase vazia vem antes do pico (NIV). Modelos e suporte são calmos e informativos. O cadastro é firme e curto.
4. **Sentimento e momento lembrado** (autoral): ver a seção "Curva de sentimento" abaixo.
5. **O que só este site faz** (autoral): a rolagem grava, caractere por caractere, o número de chassi (NIV) numa chapa de metal, e depois uma lente de perito confere cada caractere.
6. **Faixa estética** (usuário): "minimalista premium".
7. **Mundo contínuo ou cenas** (usuário): "cenas separadas".
8. **Assets** (usuário): "não tenho essas informações". Usamos fotos livres e uma marca tipográfica, sem logo.

## Gramática

Nova gramática nomeada: **Laudo técnico**. A página é um laudo de vistoria da oportunidade de negócio.
- **Navegação:** a ficha de vistoria fica na margem esquerda. É um checklist clicável dos oito itens, e cada item fica "conforme" quando o visitante passa por ele. Abaixo de 1200px, ela vira uma linha fina de progresso.
- **Sequência:** cenas separadas com fundo próprio e cortes secos, sem drift interpolado. Cada cena é um item do laudo.
- **Capa:** capa em camadas. A foto do farol, a retícula da inspeção, a tipografia, a moldura escura em primeiro plano e um feixe de luz se movem em ritmos diferentes.
- **Fechamento:** o cadastro é a assinatura do laudo. À esquerda ficam os itens conferidos; à direita, o formulário. Não há botão ímã nem spotlight.
- **Proibições:** scrub de vídeo, kinetic por caractere, spotlight, magnet, drift contínuo, copy centralizada em toda cena e grade de cards idênticos.

## Curva de sentimento

```
1  Capa      confiança e curiosidade  a retícula fecha sobre o farol enquanto a câmera se aproxima
2  Mercado   inquietação              14 milhões de carros por ano, e a lista do que pode estar escondido
3  Empresa   alívio                   alguém confere tudo, com processo, tecnologia e laudo
4  Serviços  amplitude                o portfólio correndo de lado, uma ficha por serviço
5  Pausa     antecipação              uma frase sozinha numa tela quase vazia (silêncio autoral)
6  NIV       fascínio (PICO)          o número de chassi gravado sob a mão do visitante e conferido pelo perito
7  Modelos   clareza                  uma tabela limpa com três modelos lado a lado
8  Suporte   segurança                tudo o que vem junto, em duas colunas tranquilas
9  Cadastro  decisão                  o laudo fechado à esquerda e o formulário à direita
```

**Pico:** "a página gravou o número do chassi na chapa letra por letra enquanto eu rolava, e depois uma lente conferiu cada uma." O pico fica na cena 6, que tem a maior extensão da página.

**Frase para contar a alguém:** "é o site em que você grava o número do chassi rolando a página."

**Silêncio autoral:** a cena 5 (Pausa) é intencionalmente quase vazia. Não é dead scroll.

## Score

| Beat | Device | Por quê |
|---|---|---|
| Capa | pin curto + planos em parallax via `--sc-p` | profundidade real: a foto se aproxima e a retícula se fecha em sentido oposto |
| Mercado | `count` + `reveal` | o número é um fato, e a foto aérea se abre como "o tamanho disso" |
| Empresa | `flow` + `in` | é a cena que se lê como documento |
| Serviços | `pan` | lateral significa opções |
| Pausa | `flow` vazio | o silêncio antes do pico |
| NIV | `pin` + gravação própria (assinatura) | o pico, com a maior extensão |
| Modelos | `flow` + `in` (tabela) | informação, sem dramatizar |
| Suporte | `parallax` na coluna de mídia | profundidade discreta numa cena calma |
| Cadastro | `flow` + formulário | o fechamento resolve com uma entrada real |

## Atualização: marca real

- O usuário enviou `Imagens/logo1.jpg` (branco sobre vinho #A31526), `Imagens/logo2.png` (branco com ponto vermelho #C41532 sobre grafite #33404A) e `Imagens/fachada.png`.
- Nome nos textos: "3V" (escolha do usuário). Os logos dizem "3VO Terceira Visão".
- Logo oficial ainda não definido. A página tem um seletor no cabeçalho com a cor principal de cada logo (vinho e grafite), que troca o logo e a paleta inteira via `data-brand` no `<html>`. A escolha persiste no navegador e pode ser forçada com `?logo=1` ou `?logo=2`.
- O amarelo provisório saiu. O acento agora é o vermelho da marca, com `--accent-fg` mais claro para texto sobre fundo escuro.
- A foto da fachada substituiu a do farol amarelo na seção de suporte.

## Atualização: marca corrigida (20/11/2026)

- A empresa correta é a Super Visão Vistorias Automotivas (supervisao.com), não a 3VO Terceira Visão. Todos os textos dizem "Super Visão".
- Cor principal: o vermelho do logo (#E21F1B), a pedido do usuário. Fundo escuro avermelhado; o azul-marinho (#062264) fica só no logo.
- O botão Tema e os dois logos provisórios foram removidos. Há uma marca só.
- Fotos reais das unidades: fachada (seção Suporte) e Guarulhos Auto Shopping (seção Empresa), com os telefones removidos das imagens.
- Funcionalidades sem mudança.
