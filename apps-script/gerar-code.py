import os, sys, json
os.chdir(sys.argv[1])
tpl = open('emailjs/template-cadastro.html', encoding='utf-8').read()
tpl = tpl[tpl.index('-->') + 3:].strip()

code = r'''/**
 * Super Visão · envio do cadastro de franqueado pelo Gmail.
 *
 * Como usar (passo a passo completo no README do repositório):
 *   1. Cole este arquivo inteiro em um projeto novo em script.google.com.
 *   2. Ajuste DESTINO e COPIA abaixo, se precisar.
 *   3. Rode a função testarEnvio uma vez (autoriza o Gmail e manda um e-mail de teste).
 *   4. Implantar > Nova implantação > App da Web
 *        Executar como: Eu  |  Quem pode acessar: Qualquer pessoa
 *   5. Copie a URL que termina em /exec e coloque no index.html
 *      (atributo data-appsscript-url do formulário).
 *
 * Gerado a partir de emailjs/template-cadastro.html. Para mudar o visual do
 * e-mail, edite aquele arquivo e gere este de novo, ou edite TEMPLATE aqui.
 */

// ------------------------------------------------------------ configuração
var DESTINO = 'dani.augusto.gomes@hotmail.com';   // quem recebe os cadastros
var COPIA = '';                                     // e-mail do sócio (vírgula para mais de um), ou ''
var REMETENTE = 'Site Super Visão';                 // nome que aparece como remetente
var LIMITE_POR_HORA = 30;                           // trava contra abuso

// ------------------------------------------------------------- recebimento
function doPost(e) {
  try {
    var dados = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    if (dados._honey) return resposta({ ok: true });            // robô: finge sucesso
    var erro = validar(dados);
    if (erro) return resposta({ ok: false, erro: erro });
    if (!dentroDoLimite()) return resposta({ ok: false, erro: 'limite' });

    enviar(dados);
    return resposta({ ok: true });
  } catch (err) {
    console.error(err);
    return resposta({ ok: false, erro: 'falha' });
  }
}

function doGet() {
  return resposta({ ok: true, servico: 'cadastro Super Visão' });
}

// ------------------------------------------------------------------ envio
function enviar(d) {
  var campos = {
    nome: d.nome, primeiro_nome: d.primeiro_nome, telefone: d.telefone,
    telefone_link: d.telefone_link, whatsapp_link: d.whatsapp_link,
    email: d.email, reply_to: d.email, modelo: d.modelo,
    data_hora: d.data_hora || agoraBrasilia(), pagina: d.pagina
  };
  var html = TEMPLATE.replace(/\{\{(\w+)\}\}/g, function (_, k) {
    return escapar(campos[k] == null ? '' : String(campos[k]));
  });
  var opcoes = {
    to: DESTINO,
    subject: 'Novo cadastro de franqueado · Super Visão · ' + limpar(d.nome, 120),
    htmlBody: html,
    body: textoSimples(campos),
    name: REMETENTE,
    replyTo: d.email
  };
  if (COPIA) opcoes.cc = COPIA;
  MailApp.sendEmail(opcoes);
}

function textoSimples(c) {
  return 'Novo cadastro de franqueado\n\n' +
    'Nome: ' + c.nome + '\nTelefone: ' + c.telefone + '\nE-mail: ' + c.email +
    '\nModelo: ' + c.modelo + '\nRecebido em: ' + c.data_hora + ' (horário de Brasília)\n';
}

// -------------------------------------------------------------- validação
function validar(d) {
  if (!d || typeof d !== 'object') return 'dados';
  if (!d.nome || String(d.nome).trim().length < 3 || String(d.nome).length > 120) return 'nome';
  var dig = String(d.telefone || '').replace(/\D/g, '');
  if (dig.length < 10 || dig.length > 11) return 'telefone';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(d.email || '')) || String(d.email).length > 160) return 'email';
  var modelos = ['Delivery (R$ 20.000)', 'Micro (R$ 40.000)', 'Master (R$ 60.000)', 'Ainda não decidi'];
  if (modelos.indexOf(d.modelo) < 0) return 'modelo';
  // links montados pelo site: só aceita os formatos esperados
  if (d.whatsapp_link && !/^https:\/\/wa\.me\/55\d{10,11}(\?text=[^"<>\s]*)?$/.test(d.whatsapp_link)) return 'link';
  if (d.telefone_link && !/^tel:\+55\d{10,11}$/.test(d.telefone_link)) return 'link';
  if (d.pagina && !/^https?:\/\/[^"<>\s]+$/.test(d.pagina)) return 'link';
  return '';
}

function dentroDoLimite() {
  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var cache = CacheService.getScriptCache();
    var chave = 'envios-' + Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'yyyyMMddHH');
    var n = Number(cache.get(chave) || 0);
    if (n >= LIMITE_POR_HORA) return false;
    cache.put(chave, String(n + 1), 3700);
    return true;
  } finally {
    lock.releaseLock();
  }
}

// ---------------------------------------------------------------- apoio
function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
function escapar(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function limpar(s, max) {
  return String(s || '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
}
function agoraBrasilia() {
  return Utilities.formatDate(new Date(), 'America/Sao_Paulo', "dd/MM/yyyy 'às' HH:mm");
}

// --------------------------------------------------------------- teste
// Rode esta função no editor (botão Executar) para autorizar e receber um e-mail de teste.
function testarEnvio() {
  enviar({
    nome: 'Teste do script (pode apagar)', primeiro_nome: 'Teste',
    telefone: '(11) 90000-0000', telefone_link: 'tel:+5511900000000',
    whatsapp_link: 'https://wa.me/5511900000000', email: DESTINO,
    modelo: 'Micro (R$ 40.000)', pagina: 'https://daniel-gomess.github.io/site-vistoria/'
  });
}

// ------------------------------------------------------------- modelo
var TEMPLATE = ''' + json.dumps(tpl, ensure_ascii=False) + ''';
'''
os.makedirs('apps-script', exist_ok=True)
open('apps-script/Code.gs', 'w', encoding='utf-8').write(code)
print('ok', len(code))
