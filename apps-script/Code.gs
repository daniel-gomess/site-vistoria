/**
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
var TEMPLATE = "<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" bgcolor=\"#f2eeee\" style=\"background:#f2eeee;\">\n  <tr>\n    <td align=\"center\" style=\"padding:24px 12px;\">\n      <table role=\"presentation\" width=\"600\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:100%;max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#1c1416;\">\n\n        <!-- cabeçalho -->\n        <tr>\n          <td bgcolor=\"#ffffff\" style=\"background:#ffffff;padding:22px 28px 18px;border-bottom:4px solid #e21f1b;\">\n            <img src=\"https://daniel-gomess.github.io/site-vistoria/assets/img/logo-supervisao.png\" width=\"200\" alt=\"Super Visão Vistorias Automotivas\" style=\"display:block;width:200px;height:auto;border:0;\">\n          </td>\n        </tr>\n\n        <!-- título -->\n        <tr>\n          <td style=\"padding:28px 28px 8px;\">\n            <p style=\"margin:0 0 6px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#e21f1b;font-weight:bold;\">Novo cadastro de franqueado</p>\n            <h1 style=\"margin:0;font-size:24px;line-height:1.25;color:#1c1416;\">{{nome}} quer abrir uma franquia Super Visão</h1>\n            <p style=\"margin:10px 0 0;font-size:14px;color:#6b5f61;\">Recebido em {{data_hora}} (horário de Brasília)</p>\n          </td>\n        </tr>\n\n        <!-- dados -->\n        <tr>\n          <td style=\"padding:20px 28px 4px;\">\n            <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;font-size:15px;\">\n              <tr>\n                <th bgcolor=\"#e21f1b\" style=\"border:1px solid #e21f1b;padding:12px;text-align:left;background:#e21f1b;color:#ffffff;font-size:14px;\">Campo</th>\n                <th bgcolor=\"#e21f1b\" style=\"border:1px solid #e21f1b;padding:12px;text-align:left;background:#e21f1b;color:#ffffff;font-size:14px;\">Informação</th>\n              </tr>\n              <tr>\n                <td style=\"border:1px solid #e3d6d7;padding:10px 12px;font-weight:bold;width:34%;\">Nome</td>\n                <td style=\"border:1px solid #e3d6d7;padding:10px 12px;\">{{nome}}</td>\n              </tr>\n              <tr>\n                <td style=\"border:1px solid #e3d6d7;padding:10px 12px;font-weight:bold;width:34%;\">Telefone</td>\n                <td style=\"border:1px solid #e3d6d7;padding:10px 12px;\"><a href=\"{{telefone_link}}\" style=\"color:#1c1416;text-decoration:none;\">{{telefone}}</a></td>\n              </tr>\n              <tr>\n                <td style=\"border:1px solid #e3d6d7;padding:10px 12px;font-weight:bold;width:34%;\">E-mail</td>\n                <td style=\"border:1px solid #e3d6d7;padding:10px 12px;\"><a href=\"mailto:{{email}}\" style=\"color:#e21f1b;\">{{email}}</a></td>\n              </tr>\n              <tr>\n                <td style=\"border:1px solid #e3d6d7;padding:10px 12px;font-weight:bold;width:34%;\">Modelo</td>\n                <td style=\"border:1px solid #e3d6d7;padding:10px 12px;\">{{modelo}}</td>\n              </tr>\n            </table>\n          </td>\n        </tr>\n\n        <!-- ações -->\n        <tr>\n          <td style=\"padding:22px 28px 30px;\">\n            <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n              <tr>\n                <td bgcolor=\"#e21f1b\" style=\"background:#e21f1b;border-radius:6px;\">\n                  <a href=\"{{whatsapp_link}}\" style=\"display:inline-block;padding:12px 18px;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;\">Chamar no WhatsApp</a>\n                </td>\n                <td width=\"10\" style=\"width:10px;\"></td>\n                <td style=\"border:1px solid #d9cccd;border-radius:6px;\">\n                  <a href=\"{{telefone_link}}\" style=\"display:inline-block;padding:11px 16px;font-size:14px;font-weight:bold;color:#1c1416;text-decoration:none;\">Ligar</a>\n                </td>\n              </tr>\n            </table>\n          </td>\n        </tr>\n\n      </table>\n    </td>\n  </tr>\n</table>";
