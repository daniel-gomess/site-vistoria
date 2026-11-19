# Fingerprints

Every site you build with **scroll-craft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| 3V franquias (v3-laudo) | Laudo técnico (nova: página como laudo de vistoria, cenas com corte seco) | Ficha de vistoria na margem esquerda: checklist clicável que marca cada item como conferido; barra com logo, seletor de marca e CTA | Capa em 5 planos: foto do farol se aproxima, retícula fecha no sentido oposto, feixe de luz, moldura de primeiro plano, tipografia | pin(1.7) > count+reveal > in > pan(2.7) > pausa > pin(3.6, pico) > tabela > parallax > formulário; 9 cenas, 15.7vh | Assinatura do laudo: itens conferidos à esquerda, formulário real à direita, sem ímã nem spotlight | A rolagem grava o NIV na chapa de aço caractere por caractere e a lente do perito confere cada um | Fotográfico low-key (Unsplash) + fachada real; tema duplo por logo | 4500 |

*(empty: your first build has nothing to clear, so build whatever the interview
points at. From the second onwards, this table is the constraint.)*

---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

- Gramática Laudo técnico com ficha-checklist na margem.
- Gravação do NIV por rolagem como assinatura.
- Faixa de 15-16vh com 9 cenas.

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the scroll-craft repository. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.
