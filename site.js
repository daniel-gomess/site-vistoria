/* Super Visão · comportamento próprio da página.
   O engine (scrollcraft.js) fica intocado. Aqui moram:
   1. a ficha de vistoria (nav que marca cada item como conferido)
   2. a gravação do NIV (assinatura da página)
   3. a escolha de modelo pela tabela, levada até o formulário
   4. o envio do cadastro via FormSubmit */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function progressOf(el) { return parseFloat(el.style.getPropertyValue('--sc-p')) || 0; }

  /* ---------------------------------------------- 1. ficha de vistoria -- */
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-ficha]'));
  var items = links.map(function (a) {
    return { a: a, el: document.getElementById(a.getAttribute('data-ficha')) };
  }).filter(function (i) { return i.el; });

  function updateFicha() {
    var line = window.innerHeight * 0.45;
    var hereIdx = 0;
    items.forEach(function (it, i) { if (it.el.getBoundingClientRect().top <= line) hereIdx = i; });
    var atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    items.forEach(function (it, i) {
      var done = i < hereIdx || (atEnd && i === hereIdx);
      it.a.classList.toggle('is-done', done);
      it.a.classList.toggle('is-here', i === hereIdx);
      if (i === hereIdx) it.a.setAttribute('aria-current', 'step'); else it.a.removeAttribute('aria-current');
    });
  }

  /* ------------------------------------------------- 2. gravação do NIV -- */
  var plate = document.querySelector('[data-niv]');
  var niv = plate && plate.closest('[data-sc-act]');
  var chars = plate ? Array.prototype.slice.call(plate.querySelectorAll('.plate__code span')) : [];
  var lens = plate && plate.querySelector('.plate__lens');
  var stamp = plate && plate.querySelector('.plate__stamp');
  var phaseEl = plate && plate.querySelector('.plate__phase');
  var countEl = plate && plate.querySelector('.plate__count');
  var N = chars.length;
  var last = '';

  // Linha do tempo, em progresso do ato (0..1):
  //   0.06 a 0.50  o punção grava um caractere por vez
  //   0.54 a 0.86  a lente do perito passa e confere cada um
  //   0.90 em diante  o carimbo do laudo
  var STAMP = [0.06, 0.50], CHECK = [0.54, 0.86], DONE = 0.9;

  function renderNiv(p) {
    var n = Math.floor(clamp01((p - STAMP[0]) / (STAMP[1] - STAMP[0])) * N + 0.0001);
    var m = Math.floor(clamp01((p - CHECK[0]) / (CHECK[1] - CHECK[0])) * N + 0.0001);
    var done = p >= DONE;
    var key = n + ':' + m + ':' + (done ? 1 : 0);
    var lensOn = p > CHECK[0] - 0.03 && p < DONE + 0.02;

    if (lens) {
      lens.classList.toggle('is-on', lensOn);
      if (lensOn) {
        var t = clamp01((p - CHECK[0]) / (CHECK[1] - CHECK[0]));
        var idx = Math.min(N - 1, Math.floor(t * N));
        var c = chars[idx];
        var pr = plate.getBoundingClientRect(), cr = c.getBoundingClientRect();
        // posição contínua entre o caractere atual e o próximo
        var frac = t * N - idx;
        var next = chars[Math.min(N - 1, idx + 1)].getBoundingClientRect();
        var x = (cr.left + cr.width / 2) + ((next.left - cr.left) * Math.min(frac, 1)) - pr.left;
        lens.style.setProperty('--lens-x', x.toFixed(1) + 'px');
        lens.style.top = ((cr.top + cr.height / 2) - pr.top) + 'px';
      }
    }
    if (key === last) return;
    last = key;
    plate.setAttribute('data-sc-verify-state', key);

    chars.forEach(function (s, i) {
      s.classList.toggle('is-stamped', i < n);
      s.classList.toggle('is-ok', i < m);
    });
    if (stamp) stamp.classList.toggle('is-on', done);
    if (phaseEl && countEl) {
      if (done) { phaseEl.textContent = 'Numeração conferida'; countEl.textContent = N + '/' + N; }
      else if (m > 0) { phaseEl.textContent = 'Perito conferindo'; countEl.textContent = m + '/' + N; }
      else if (n >= N) { phaseEl.textContent = 'Gravação concluída'; countEl.textContent = N + '/' + N; }
      else if (n > 0) { phaseEl.textContent = 'Gravando'; countEl.textContent = n + '/' + N; }
      else { phaseEl.textContent = 'Pronto para gravar'; countEl.textContent = '0/' + N; }
    }
  }

  /* --------------------------------------------------------- laço único -- */
  var nivVisible = false;
  if (niv && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { nivVisible = es[0].isIntersecting; }, { rootMargin: '20% 0px' }).observe(niv);
  }
  var ticking = false;
  function frame() {
    ticking = false;
    updateFicha();
    if (plate) renderNiv(reduce ? 1 : (nivVisible ? progressOf(niv) : (niv.getBoundingClientRect().top < 0 ? 1 : 0)));
  }
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  // o engine publica --sc-p no próprio rAF; um laço curto garante a leitura depois dele
  (function loop() { if (nivVisible) frame(); requestAnimationFrame(loop); })();
  request();

  /* ---------------------------------- 3. escolha de modelo pela tabela -- */
  var form = document.getElementById('form-cadastro');
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-escolher]');
    if (!a || !form) return;
    var r = form.querySelector('input[data-modelo="' + a.getAttribute('data-escolher') + '"]');
    if (r) { r.checked = true; clearErr(form.querySelector('.modelo'), 'e-modelo'); }
  });

  /* ------------------------------------------------------ 4. cadastro -- */
  if (!form) return;
  var tel = form.querySelector('#f-tel');
  var nome = form.querySelector('#f-nome');
  var email = form.querySelector('#f-email');
  var btn = form.querySelector('button[type="submit"]');
  var status = form.querySelector('.form__status');
  var done = document.querySelector('.form-done');

  function digits(v) { return (v || '').replace(/\D/g, '').slice(0, 11); }
  function maskPhone(v) {
    var d = digits(v);
    if (d.length <= 2) return d.length ? '(' + d : '';
    if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
  }
  tel.addEventListener('input', function () {
    var atEnd = tel.selectionStart === tel.value.length;
    tel.value = maskPhone(tel.value);
    if (atEnd) tel.setSelectionRange(tel.value.length, tel.value.length);
  });

  function setErr(input, id, msg) {
    var p = document.getElementById(id);
    if (p) p.textContent = msg;
    if (input) input.setAttribute('aria-invalid', 'true');
  }
  function clearErr(input, id) {
    var p = document.getElementById(id);
    if (p) p.textContent = '';
    if (input) input.removeAttribute('aria-invalid');
  }
  [[nome, 'e-nome'], [tel, 'e-tel'], [email, 'e-email']].forEach(function (pair) {
    pair[0].addEventListener('input', function () { clearErr(pair[0], pair[1]); });
  });
  form.addEventListener('change', function (e) {
    if (e.target.name === 'Modelo') clearErr(form.querySelector('.modelo'), 'e-modelo');
  });

  function validate() {
    var ok = true, first = null;
    var n = nome.value.trim();
    if (n.length < 3) { setErr(nome, 'e-nome', 'Informe seu nome completo.'); ok = false; first = first || nome; }
    var d = digits(tel.value);
    if (d.length < 10 || d.length > 11) { setErr(tel, 'e-tel', 'Informe um telefone com DDD, por exemplo (11) 91234-5678.'); ok = false; first = first || tel; }
    var em = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) { setErr(email, 'e-email', 'Informe um e-mail válido.'); ok = false; first = first || email; }
    var modelo = form.querySelector('input[name="Modelo"]:checked');
    if (!modelo) { setErr(form.querySelector('.modelo'), 'e-modelo', 'Escolha um modelo ou marque "Ainda não decidi".'); ok = false; first = first || form.querySelector('input[name="Modelo"]'); }
    if (first) first.focus();
    return ok;
  }

  /* ---- envio do cadastro --------------------------------------------------
     O envio é separado em "provedores", escolhidos nesta ordem:
       appsscript  principal. Google Apps Script que envia pelo Gmail
                   (apps-script/Code.gs). Usa data-appsscript-url no <form>.
       emailjs     usado se a URL do Apps Script estiver vazia. Chaves em data-emailjs-*.
       formsubmit  reserva final, se nenhum dos dois estiver configurado.
     Para a VPS, basta criar outro provedor que faça POST para a API própria
     e escolher ele em pickProvider(). O resto do formulário não muda. */

  var EMAILJS_URL = 'https://api.emailjs.com/api/v1.0/email/send';
  var FORMSUBMIT_URL = 'https://formsubmit.co/ajax/dani.augusto.gomes@hotmail.com';

  function emailjsConfig() {
    var c = {
      service: (form.getAttribute('data-emailjs-service') || '').trim(),
      template: (form.getAttribute('data-emailjs-template') || '').trim(),
      key: (form.getAttribute('data-emailjs-key') || '').trim()
    };
    return c.service && c.template && c.key ? c : null;
  }

  function agoraBrasilia() {
    try {
      return new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }).replace(',', ' às');
    } catch (e) { return new Date().toLocaleString('pt-BR'); }
  }

  // Os dados do cadastro em um formato neutro; cada provedor traduz para o seu.
  function buildLead() {
    var modelo = form.querySelector('input[name="Modelo"]:checked');
    var d = digits(tel.value);
    var primeiroNome = nome.value.trim().split(/\s+/)[0];
    var aberto = modelo.getAttribute('data-modelo') === 'indeciso';
    var msgWhats = 'Olá, ' + primeiroNome + '! Aqui é da Super Visão. Recebemos seu cadastro de interesse na franquia' +
      (aberto ? '' : ' ' + modelo.getAttribute('data-modelo').replace(/^./, function (c) { return c.toUpperCase(); })) +
      ' e gostaríamos de conversar.';
    return {
      nome: nome.value.trim(),
      primeiro_nome: primeiroNome,
      telefone: maskPhone(tel.value),
      telefone_link: 'tel:+55' + d,
      whatsapp_link: 'https://wa.me/55' + d + '?text=' + encodeURIComponent(msgWhats),
      email: email.value.trim(),
      modelo: modelo.value,
      data_hora: agoraBrasilia(),
      pagina: location.href.split('#')[0]
    };
  }

  var providers = {
    appsscript: function (lead, url) {
      var body = {};
      for (var k in lead) body[k] = lead[k];
      body._honey = form.querySelector('input[name="_honey"]').value;
      // Sem cabeçalho Content-Type: o navegador manda text/plain e não faz a
      // checagem prévia de CORS, que o Apps Script não responde.
      return fetch(url, { method: 'POST', body: JSON.stringify(body) })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && res.ok) return;
          console.warn('[cadastro] Apps Script respondeu', res);
          throw new Error('');
        });
    },

    emailjs: function (lead, cfg) {
      var params = {};
      for (var k in lead) params[k] = lead[k];
      params.reply_to = lead.email;   // o template usa {{reply_to}} no campo Reply-To
      return fetch(EMAILJS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_id: cfg.service, template_id: cfg.template, user_id: cfg.key, template_params: params })
      }).then(function (r) {
        if (r.ok) return;
        return r.text().then(function (t) {
          console.warn('[cadastro] EmailJS respondeu', r.status, t);
          throw new Error('');
        });
      });
    },

    formsubmit: function (lead) {
      // O campo precisa se chamar "email": é dele que o FormSubmit tira o Reply-To.
      // (O "_replyto" enviado antes foi ignorado; o e-mail recebido veio sem Reply-To.)
      return fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          'Nome': lead.nome,
          'Telefone': lead.telefone,
          'email': lead.email,
          'Modelo': lead.modelo,
          'Data e hora (Brasília)': lead.data_hora,
          '_subject': 'Novo cadastro de franqueado · Super Visão',
          '_template': 'table',
          '_captcha': 'false'
        })
      })
        .then(function (r) { return r.json().catch(function () { return { success: r.ok ? 'true' : 'false' }; }); })
        .then(function (res) {
          if (res && (res.success === true || res.success === 'true')) return;
          console.warn('[cadastro] FormSubmit respondeu', res);
          if (/activat/i.test((res && res.message) || '')) {
            throw new Error('Formulário aguardando ativação. Confira a caixa de entrada do e-mail de destino e clique no link de ativação do FormSubmit.');
          }
          throw new Error('');
        });
    }
  };

  function sendLead(lead) {
    var gas = (form.getAttribute('data-appsscript-url') || '').trim();
    if (gas) return providers.appsscript(lead, gas);
    var cfg = emailjsConfig();
    return cfg ? providers.emailjs(lead, cfg) : providers.formsubmit(lead);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = ''; status.classList.remove('is-error');
    if (!validate()) return;
    if (form.querySelector('input[name="_honey"]').value) return; // robô

    var lead = buildLead();
    btn.disabled = true;
    var label = btn.textContent;
    btn.textContent = 'Enviando…';

    sendLead(lead)
      .then(function () {
        done.querySelector('[data-done-nome]').textContent = lead.primeiro_nome;
        form.hidden = true;
        done.hidden = false;
        done.focus();
      })
      .catch(function (err) {
        status.textContent = (err && err.message) || 'Não foi possível enviar agora. Verifique sua conexão e tente novamente.';
        status.classList.add('is-error');
        btn.disabled = false;
        btn.textContent = label;
      });
  });
})();
