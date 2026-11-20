Crie um template de e-mail na minha conta do EmailJS seguindo exatamente estes passos.

Regras:
- Não digite senhas nem códigos de verificação. Se aparecer tela de login, pare e me peça para entrar.
- Não altere nada além do que está descrito aqui. Não exclua templates nem serviços existentes.
- Não envie e-mails de teste.

1. Abra https://dashboard.emailjs.com e confirme que estou logado.
2. Vá em "Email Services". Se não houver nenhum serviço conectado, pare e me avise, porque eu mesmo preciso conectar meu e-mail. Se houver, anote o Service ID dele (formato service_xxxxxxx).
3. Vá em "Email Templates" e clique em "Create New Template".
4. Dê ao template o nome: Cadastro de franqueado - Site 3V
5. Na aba "Content", preencha:
   - Subject: Novo cadastro de franqueado · 3V · {{nome}}
   - Conteúdo: clique em "Edit Content", troque para o editor de código (Code Editor / HTML), apague todo o conteúdo padrão e cole o HTML que está no final desta mensagem, sem alterar nada nele.
   - To Email: dani.augusto.gomes@hotmail.com
   - From Name: Site 3V
   - Reply To: {{reply_to}}
   - Deixe "From Email" com a opção padrão do serviço, se houver essa opção.
6. Salve o template.
7. Anote o Template ID do template criado (formato template_xxxxxxx). Ele aparece em "Settings" do template ou na lista de templates.
8. Vá em "Account" (aba "General") e anote a Public Key.
9. Me responda com:
   - Service ID
   - Template ID
   - Public Key
   - Qualquer passo que não foi possível fazer e o motivo.

HTML do conteúdo (cole exatamente como está, do primeiro <table ao último </table>):

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f2eeee" style="background:#f2eeee;">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#1c1416;">

        <!-- cabeçalho -->
        <tr>
          <td bgcolor="#a31526" style="background:#a31526;padding:22px 28px;">
            <img src="https://daniel-gomess.github.io/site-vistoria/assets/img/logo1-mark.png" width="96" alt="3V Terceira Visão" style="display:block;width:96px;height:auto;border:0;">
          </td>
        </tr>

        <!-- título -->
        <tr>
          <td style="padding:28px 28px 8px;">
            <p style="margin:0 0 6px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#a31526;font-weight:bold;">Novo cadastro de franqueado</p>
            <h1 style="margin:0;font-size:24px;line-height:1.25;color:#1c1416;">{{nome}} quer abrir uma franquia 3V</h1>
            <p style="margin:10px 0 0;font-size:14px;color:#6b5f61;">Recebido em {{data_hora}} (horário de Brasília)</p>
          </td>
        </tr>

        <!-- dados -->
        <tr>
          <td style="padding:20px 28px 4px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-size:15px;">
              <tr>
                <th bgcolor="#a31526" style="border:1px solid #a31526;padding:12px;text-align:left;background:#a31526;color:#ffffff;font-size:14px;">Campo</th>
                <th bgcolor="#a31526" style="border:1px solid #a31526;padding:12px;text-align:left;background:#a31526;color:#ffffff;font-size:14px;">Informação</th>
              </tr>
              <tr>
                <td style="border:1px solid #e3d6d7;padding:10px 12px;font-weight:bold;width:34%;">Nome</td>
                <td style="border:1px solid #e3d6d7;padding:10px 12px;">{{nome}}</td>
              </tr>
              <tr>
                <td style="border:1px solid #e3d6d7;padding:10px 12px;font-weight:bold;width:34%;">Telefone</td>
                <td style="border:1px solid #e3d6d7;padding:10px 12px;"><a href="{{telefone_link}}" style="color:#1c1416;text-decoration:none;">{{telefone}}</a></td>
              </tr>
              <tr>
                <td style="border:1px solid #e3d6d7;padding:10px 12px;font-weight:bold;width:34%;">E-mail</td>
                <td style="border:1px solid #e3d6d7;padding:10px 12px;"><a href="mailto:{{email}}" style="color:#a31526;">{{email}}</a></td>
              </tr>
              <tr>
                <td style="border:1px solid #e3d6d7;padding:10px 12px;font-weight:bold;width:34%;">Modelo</td>
                <td style="border:1px solid #e3d6d7;padding:10px 12px;">{{modelo}}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ações -->
        <tr>
          <td style="padding:22px 28px 6px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="#a31526" style="background:#a31526;border-radius:6px;">
                  <a href="{{whatsapp_link}}" style="display:inline-block;padding:12px 18px;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;">Chamar no WhatsApp</a>
                </td>
                <td width="10" style="width:10px;"></td>
                <td style="border:1px solid #d9cccd;border-radius:6px;">
                  <a href="{{telefone_link}}" style="display:inline-block;padding:11px 16px;font-size:14px;font-weight:bold;color:#1c1416;text-decoration:none;">Ligar</a>
                </td>
              </tr>
            </table>
            <p style="margin:14px 0 0;font-size:13px;color:#6b5f61;">Para responder por e-mail, use o "Responder": a mensagem vai direto para {{primeiro_nome}}.</p>
          </td>
        </tr>

        <!-- rodapé -->
        <tr>
          <td style="padding:24px 28px 26px;">
            <p style="margin:0;padding-top:16px;border-top:1px solid #eadfe0;font-size:12px;color:#8a7d7f;">Enviado pelo formulário da landing page 3V: <a href="{{pagina}}" style="color:#8a7d7f;">{{pagina}}</a></p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
