Atualize um template que já existe na minha conta do EmailJS.

Regras:
- Não digite senhas nem códigos de verificação. Se aparecer tela de login, pare e me peça para entrar.
- Altere somente o que está descrito aqui. Não mude destinatários (To, Cc, Bcc), Reply To, outros templates nem serviços.
- Não envie e-mails de teste.

1. Abra https://dashboard.emailjs.com e confirme que estou logado.
2. Vá em "Email Templates" e abra o template "Cadastro de franqueado - Site 3V" (Template ID: template_fdag7cc).
3. Renomeie o template para: Cadastro de franqueado - Site Super Visão
4. Na aba "Content", troque:
   - Subject: Novo cadastro de franqueado · Super Visão · {{nome}}
   - From Name: Site Super Visão
5. Ainda em "Content", clique em "Edit Content", abra o editor de código (Code Editor / HTML), apague todo o HTML atual e cole o HTML que está no final desta mensagem, exatamente como está.
6. Confirme que o HTML novo não tem mais "3V" nem "Terceira Visão" e que a imagem do cabeçalho aponta para logo-supervisao.png.
7. Salve o template e confirme que o Template ID continua template_fdag7cc.
8. Me responda confirmando o que foi salvo e se algum passo não foi possível.

HTML do conteúdo (cole exatamente como está, do primeiro <table ao último </table>):

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f2eeee" style="background:#f2eeee;">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#1c1416;">

        <!-- cabeçalho -->
        <tr>
          <td bgcolor="#ffffff" style="background:#ffffff;padding:22px 28px 18px;border-bottom:4px solid #e21f1b;">
            <img src="https://daniel-gomess.github.io/site-vistoria/assets/img/logo-supervisao.png" width="200" alt="Super Visão Vistorias Automotivas" style="display:block;width:200px;height:auto;border:0;">
          </td>
        </tr>

        <!-- título -->
        <tr>
          <td style="padding:28px 28px 8px;">
            <p style="margin:0 0 6px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#e21f1b;font-weight:bold;">Novo cadastro de franqueado</p>
            <h1 style="margin:0;font-size:24px;line-height:1.25;color:#1c1416;">{{nome}} quer abrir uma franquia Super Visão</h1>
            <p style="margin:10px 0 0;font-size:14px;color:#6b5f61;">Recebido em {{data_hora}} (horário de Brasília)</p>
          </td>
        </tr>

        <!-- dados -->
        <tr>
          <td style="padding:20px 28px 4px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-size:15px;">
              <tr>
                <th bgcolor="#e21f1b" style="border:1px solid #e21f1b;padding:12px;text-align:left;background:#e21f1b;color:#ffffff;font-size:14px;">Campo</th>
                <th bgcolor="#e21f1b" style="border:1px solid #e21f1b;padding:12px;text-align:left;background:#e21f1b;color:#ffffff;font-size:14px;">Informação</th>
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
                <td style="border:1px solid #e3d6d7;padding:10px 12px;"><a href="mailto:{{email}}" style="color:#e21f1b;">{{email}}</a></td>
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
          <td style="padding:22px 28px 30px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="#e21f1b" style="background:#e21f1b;border-radius:6px;">
                  <a href="{{whatsapp_link}}" style="display:inline-block;padding:12px 18px;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;">Chamar no WhatsApp</a>
                </td>
                <td width="10" style="width:10px;"></td>
                <td style="border:1px solid #d9cccd;border-radius:6px;">
                  <a href="{{telefone_link}}" style="display:inline-block;padding:11px 16px;font-size:14px;font-weight:bold;color:#1c1416;text-decoration:none;">Ligar</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
