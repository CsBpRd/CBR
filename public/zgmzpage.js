(function() {
  var KEYS = {
    shortcuts: 'zgmz_shortcuts',
    engines: 'zgmz_engines',
    currentEngine: 'zgmz_currentEngine',
    display: 'zgmz_display',
    dsKey: 'zgmz_dsKey',
    defaultShortcuts: 'zgmz_defaultShortcuts'
  };

  var DEFAULT_SHORTCUTS = [];

  var DEFAULT_ENGINES = [
    { name: '必应', urlTemplate: 'https://www.bing.com/search?q=%s' },
    { name: '百度', urlTemplate: 'https://www.baidu.com/s?wd=%s' }
  ];

  var DEFAULT_DISPLAY = {
    customText: ''
  };

  var state = {
    shortcuts: [],
    engines: [],
    currentEngine: '必应',
    display: {},
    dsKey: '',
    editingShortcut: null,
    currentIconType: 'auto',
    uploadedIconData: ''
  };

  var dsBalanceCache = { value: '', at: 0, pending: false };

  function genId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
  }

  function loadAll() {
    try {
      var sc = localStorage.getItem(KEYS.shortcuts);
      state.shortcuts = sc ? JSON.parse(sc) : null;
    } catch(e) { state.shortcuts = null; }

    if (!state.shortcuts) {
      state.shortcuts = JSON.parse(JSON.stringify(DEFAULT_SHORTCUTS));
      saveShortcuts();
    }

    try {
      var en = localStorage.getItem(KEYS.engines);
      state.engines = en ? JSON.parse(en) : null;
    } catch(e) { state.engines = null; }

    if (!state.engines) {
      state.engines = JSON.parse(JSON.stringify(DEFAULT_ENGINES));
      saveEngines();
    }

    try {
      var ce = localStorage.getItem(KEYS.currentEngine);
      state.currentEngine = ce || '必应';
    } catch(e) { state.currentEngine = '必应'; }

    var di = null;
    try {
      di = localStorage.getItem(KEYS.display);
    } catch(e) {}
    if (di) {
      try {
        var parsedDisplay = JSON.parse(di);
        state.display = { customText: parsedDisplay.customText || '' };
      } catch(e) {
        state.display = { customText: '' };
      }
    } else {
      state.display = JSON.parse(JSON.stringify(DEFAULT_DISPLAY));
      saveDisplay();
    }

    try {
      var dk = localStorage.getItem(KEYS.dsKey);
      state.dsKey = dk || '';
    } catch(e) { state.dsKey = ''; }
  }

  function saveShortcuts() {
    localStorage.setItem(KEYS.shortcuts, JSON.stringify(state.shortcuts));
  }
  function saveEngines() {
    localStorage.setItem(KEYS.engines, JSON.stringify(state.engines));
    localStorage.setItem(KEYS.currentEngine, state.currentEngine);
  }
  function saveDisplay() {
    localStorage.setItem(KEYS.display, JSON.stringify(state.display));
  }
  function saveDsKey() {
    localStorage.setItem(KEYS.dsKey, state.dsKey);
  }

  function getDomain(url) {
    try {
      var u = new URL(url);
      return u.hostname;
    } catch(e) {
      return '';
    }
  }

  function getAutoIconUrl(url) {
    var domain = getDomain(url);
    if (!domain) return '';
    return 'https://icons.duckduckgo.com/ip3/' + domain + '.ico';
  }

  function renderShortcuts() {
    var container = document.getElementById('shortcutsContainer');
    container.innerHTML = '';
    state.shortcuts.sort(function(a, b) { return a.order - b.order; });

    state.shortcuts.forEach(function(sc) {
      var a = document.createElement('a');
      a.className = 'iconBackBox';
      a.href = sc.url;
      a.setAttribute('data-id', sc.id);

      if (sc.iconType === 'symbol' || sc.iconType === 'auto') {
        var symDiv = document.createElement('div');
        symDiv.className = 'symbol-icon';
        var txt = sc.iconData || sc.name.charAt(0);
        symDiv.textContent = txt.length > 1 && txt.charCodeAt(0) > 127 ? txt.charAt(0) : txt.substring(0, 2);
        symDiv.style.fontWeight = 'bold';
        symDiv.style.color = sc.iconColor || '#000000';
        a.appendChild(symDiv);
      } else {
        var img = document.createElement('img');
        img.src = sc.iconType === 'upload' ? sc.iconData : getAutoIconUrl(sc.url);
        img.alt = sc.name;
        img.onerror = function() {
          this.style.display = 'none';
          var fallback = document.createElement('div');
          fallback.className = 'symbol-icon';
          fallback.textContent = sc.name.charAt(0).toUpperCase();
          this.parentNode.insertBefore(fallback, this);
        };
        a.appendChild(img);
      }

      var nameDiv = document.createElement('div');
      var p = document.createElement('p');
      p.textContent = sc.name;
      nameDiv.appendChild(p);
      a.appendChild(nameDiv);

      a.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showShortcutMenu(e, sc.id);
      });

      container.appendChild(a);
    });
  }

  function renderEngineSelect() {
    var sel = document.getElementById('engineSelect');
    var settingsSel = document.getElementById('settingsEngineSelect');
    sel.innerHTML = '';
    settingsSel.innerHTML = '';

    state.engines.forEach(function(eng) {
      var opt1 = document.createElement('option');
      opt1.value = eng.name;
      opt1.textContent = eng.name;
      sel.appendChild(opt1);

      var opt2 = document.createElement('option');
      opt2.value = eng.name;
      opt2.textContent = eng.name;
      settingsSel.appendChild(opt2);
    });

    sel.value = state.currentEngine;
    settingsSel.value = state.currentEngine;
    updateSearchAction();
  }

  function updateSearchAction() {
    var eng = state.engines.find(function(e) { return e.name === state.currentEngine; });
    if (!eng) eng = state.engines[0];
    if (!eng) return;

    var form = document.getElementById('searchForm');
    var template = eng.urlTemplate;
    var hasQuery = template.indexOf('%s') !== -1;

    if (hasQuery) {
      var parts = template.split('%s');
      var before = parts[0] || '';

      // 提取参数名，如 "?q=" → "q"
      var paramMatch = before.match(/[?&]([^=]+)=$/);
      var paramName = paramMatch ? paramMatch[1] : 'q';

      // 提取基础URL（去掉查询字符串部分）
      var baseUrl = before;
      var queryStart = baseUrl.indexOf('?');
      if (queryStart !== -1) {
        baseUrl = baseUrl.substring(0, queryStart);
      }

      form.action = baseUrl;
      var searchInput = document.getElementById('searchInput');
      searchInput.name = paramName;
    } else {
      form.action = template;
    }

    form.method = 'get';
  }

  function renderDisplayCards() {
    var container = document.getElementById('displayCards');
    container.innerHTML = '';
    var text = state.display.customText || '';
    if (text) {
      text.split(/[|｜]/).forEach(function(part) {
        if (!part.trim()) return;
        var card = createCard('custom', parseCustomText(part));
        container.appendChild(card);
      });
    }
    adjustSearchWidth();
  }

  function createCard(id, value, label) {
    var div = document.createElement('div');
    div.className = 'display-card';
    div.setAttribute('data-card', id);
    var vSpan = document.createElement('span');
    vSpan.className = 'card-value';
    vSpan.textContent = value;
    div.appendChild(vSpan);
    if (label) {
      var lSpan = document.createElement('span');
      lSpan.className = 'card-label';
      lSpan.textContent = label;
      div.appendChild(lSpan);
    }
    return div;
  }

  function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  function pad3(n) {
    return n < 10 ? '00' + n : (n < 100 ? '0' + n : '' + n);
  }

  var WEEKDAYS_CN = ['日', '一', '二', '三', '四', '五', '六'];
  var MONTHS_CN = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
  var ICU_LETTERS = 'GyYuUrQqMLwWdDFgEecahHkKmsSzZvVOxX';

  function getGreet() {
    var h = new Date().getHours();
    if (h >= 5 && h < 9) return '早上好';
    if (h >= 9 && h < 12) return '上午好';
    if (h >= 12 && h < 14) return '中午好';
    if (h >= 14 && h < 18) return '下午好';
    return '晚上好';
  }

  function getDsBalance() {
    if (!state.dsKey) return '未配置';
    if (dsBalanceCache.value && Date.now() - dsBalanceCache.at < 60000) {
      return dsBalanceCache.value;
    }
    if (!dsBalanceCache.pending) {
      dsBalanceCache.pending = true;
      fetchDsBalance();
    }
    return dsBalanceCache.value || '查询中…';
  }

  function fetchDsBalance() {
    fetch('https://api.deepseek.com/user/balance', {
      headers: { 'Authorization': 'Bearer ' + state.dsKey }
    }).then(function(res) {
      return res.json();
    }).then(function(obj) {
      var info = obj && obj.balance_infos && obj.balance_infos[0];
      dsBalanceCache.value = info && typeof info.total_balance !== 'undefined'
        ? (info.currency === 'CNY' ? info.total_balance + '元' : '$' + info.total_balance)
        : '查询失败';
      dsBalanceCache.at = Date.now();
      dsBalanceCache.pending = false;
      renderDisplayCards();
    }).catch(function() {
      dsBalanceCache.value = '查询失败';
      dsBalanceCache.at = Date.now();
      dsBalanceCache.pending = false;
      renderDisplayCards();
    });
  }

  function strftime(format, d) {
    var dayOfYear = Math.floor((d - new Date(d.getFullYear(), 0, 1)) / 86400000) + 1;
    var map = {
      '%Y': String(d.getFullYear()),
      '%y': pad(d.getFullYear() % 100),
      '%m': pad(d.getMonth() + 1),
      '%d': pad(d.getDate()),
      '%e': d.getDate() < 10 ? ' ' + d.getDate() : String(d.getDate()),
      '%H': pad(d.getHours()),
      '%I': pad(d.getHours() % 12 || 12),
      '%M': pad(d.getMinutes()),
      '%S': pad(d.getSeconds()),
      '%p': d.getHours() < 12 ? '上午' : '下午',
      '%A': '星期' + WEEKDAYS_CN[d.getDay()],
      '%a': '周' + WEEKDAYS_CN[d.getDay()],
      '%B': MONTHS_CN[d.getMonth()],
      '%b': MONTHS_CN[d.getMonth()].substring(0, 3),
      '%j': pad3(dayOfYear),
      '%u': d.getDay() === 0 ? '7' : String(d.getDay()),
      '%w': String(d.getDay()),
      '%F': d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()),
      '%T': pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()),
      '%%': '%'
    };
    return format.replace(/%(Y|y|m|d|e|H|I|M|S|p|A|a|B|b|j|u|w|F|T|%)/g, function(m) {
      return map[m];
    });
  }

  function shouldUseICU(token) {
    for (var i = 0; i < token.length; i++) {
      var ch = token[i];
      if (/[A-Za-z]/.test(ch) && ICU_LETTERS.indexOf(ch) === -1) {
        return false;
      }
    }
    return true;
  }

  function icuFormat(format, d) {
    var tokens = format.match(/[A-Za-z]+|[^A-Za-z]+/g) || [];
    var out = '';
    tokens.forEach(function(tok) {
      if (!/^[A-Za-z]+$/.test(tok)) {
        out += tok;
        return;
      }
      var kind = tok.charAt(0);
      var len = tok.length;
      var h = d.getHours();
      switch (kind) {
        case 'y':
          out += len >= 3 ? String(d.getFullYear()) : pad(d.getFullYear() % 100);
          break;
        case 'M':
          if (len >= 3) out += MONTHS_CN[d.getMonth()];
          else if (len === 2) out += pad(d.getMonth() + 1);
          else out += String(d.getMonth() + 1);
          break;
        case 'd':
          out += len === 2 ? pad(d.getDate()) : String(d.getDate());
          break;
        case 'H':
          out += len === 2 ? pad(h) : String(h);
          break;
        case 'h':
          out += len === 2 ? pad(h % 12 || 12) : String(h % 12 || 12);
          break;
        case 'm':
          out += len === 2 ? pad(d.getMinutes()) : String(d.getMinutes());
          break;
        case 's':
          out += len === 2 ? pad(d.getSeconds()) : String(d.getSeconds());
          break;
        case 'E':
          out += len >= 4 ? '星期' + WEEKDAYS_CN[d.getDay()] : '周' + WEEKDAYS_CN[d.getDay()];
          break;
        case 'a':
          out += h < 12 ? '上午' : '下午';
          break;
        case 'G':
          out += '公元';
          break;
        default:
          out += tok;
      }
    });
    return out;
  }

  function parseCustomText(template) {
    var d = new Date();
    var out = '';
    var lastIndex = 0;
    var match;
    var regex = /\{([^{}]*)\}/g;
    while ((match = regex.exec(template)) !== null) {
      out += template.substring(lastIndex, match.index);
      lastIndex = regex.lastIndex;
      var token = match[1];
      if (token === 'greet') {
        out += getGreet();
      } else if (token === 'ds_balance') {
        out += getDsBalance();
      } else if (token.indexOf('%') !== -1) {
        out += strftime(token, d);
      } else if (shouldUseICU(token)) {
        out += icuFormat(token, d);
      } else {
        out += token;
      }
    }
    out += template.substring(lastIndex);
    return out;
  }

  var contextMenu = document.getElementById('contextMenu');

  function showContextMenu(e, items) {
    contextMenu.innerHTML = '';
    items.forEach(function(item) {
      if (item === '-') {
        var div = document.createElement('div');
        div.className = 'menu-divider';
        contextMenu.appendChild(div);
        return;
      }
      var div = document.createElement('div');
      div.className = 'menu-item';
      div.textContent = item.label;
      div.addEventListener('click', function() {
        hideContextMenu();
        item.action();
      });
      contextMenu.appendChild(div);
    });

    contextMenu.style.left = e.clientX + 'px';
    contextMenu.style.top = e.clientY + 'px';
    contextMenu.style.display = 'block';

    var rect = contextMenu.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      contextMenu.style.left = (e.clientX - rect.width) + 'px';
    }
    if (rect.bottom > window.innerHeight) {
      contextMenu.style.top = (e.clientY - rect.height) + 'px';
    }
  }

  function hideContextMenu() {
    contextMenu.style.display = 'none';
  }

  function showShortcutMenu(e, shortcutId) {
    showContextMenu(e, [
      { label: '编辑', action: function() { openEditShortcut(shortcutId); } },
      { label: '删除', action: function() { deleteShortcut(shortcutId); } }
    ]);
  }

  document.addEventListener('contextmenu', function(e) {
    if (e.target.closest('.iconBackBoxAll')) return;
    if (e.target.closest('.modal-overlay')) return;
    e.preventDefault();
    showContextMenu(e, [
      { label: '添加捷径', action: function() { openAddShortcut(); } },
      { label: '打开设置', action: function() { openSettings(); } }
    ]);
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.context-menu')) {
      hideContextMenu();
    }
  });

  /* Shortcut Modal */
  var shortcutModal = document.getElementById('shortcutModal');
  var shortcutModalTitle = document.getElementById('shortcutModalTitle');
  var shortcutNameInput = document.getElementById('shortcutName');
  var shortcutUrlInput = document.getElementById('shortcutUrl');
  var iconFileInput = document.getElementById('iconFileInput');
  var iconPreview = document.getElementById('iconPreview');
  var symbolInput = document.getElementById('symbolInput');
  var symbolPreview = document.getElementById('symbolPreview');
  var symbolBold = document.getElementById('symbolBold');
  var symbolColor = document.getElementById('symbolColor');

  function getIconChars(name) {
    if (!name) return '';
    return name.charCodeAt(0) > 127 ? name.substring(0, 1) : name.substring(0, 2);
  }

  function autoFillSymbol() {
    if (state.currentIconType === 'symbol') {
      var n = shortcutNameInput.value.trim();
      symbolInput.value = getIconChars(n);
      symbolPreview.textContent = symbolInput.value;
      updateSymbolPreviewStyle();
    }
  }

  /* 名称输入时同步更新符号图标 */
  shortcutNameInput.addEventListener('input', autoFillSymbol);

  function openAddShortcut() {
    state.editingShortcut = null;
    state.currentIconType = 'symbol';
    state.uploadedIconData = '';
    shortcutModalTitle.textContent = '添加快捷方式';
    shortcutNameInput.value = '';
    shortcutUrlInput.value = '';
    iconFileInput.value = '';
    iconPreview.innerHTML = '';
    symbolInput.value = '';
    symbolPreview.textContent = '';
    symbolBold.checked = true;
    symbolColor.value = '#000000';
    setActiveTab('symbol');
    shortcutModal.classList.add('active');
    shortcutNameInput.focus();
  }

  function openEditShortcut(id) {
    var sc = state.shortcuts.find(function(s) { return s.id === id; });
    if (!sc) return;
    state.editingShortcut = sc;
    state.currentIconType = sc.iconType;
    state.uploadedIconData = sc.iconType === 'upload' ? sc.iconData : '';
    shortcutModalTitle.textContent = '编辑快捷方式';
    shortcutNameInput.value = sc.name;
    shortcutUrlInput.value = sc.url;
    iconFileInput.value = '';
    symbolInput.value = getIconChars(sc.name);
    symbolPreview.textContent = getIconChars(sc.name);
    symbolBold.checked = sc.iconType === 'symbol' ? (sc.iconBold !== false) : (sc.iconType === 'auto' ? true : false);
    symbolColor.value = sc.iconType === 'symbol' && sc.iconColor ? sc.iconColor : (sc.iconType === 'auto' ? '#000000' : '#000000');

    if (sc.iconType === 'upload' && sc.iconData) {
      iconPreview.innerHTML = '<img src="' + sc.iconData + '">';
    } else {
      iconPreview.innerHTML = '';
    }

    setActiveTab(sc.iconType === 'auto' ? 'symbol' : sc.iconType);
    shortcutModal.classList.add('active');
  }

  function setActiveTab(tab) {
    state.currentIconType = tab;
    document.querySelectorAll('.icon-tab').forEach(function(t) {
      t.classList.toggle('active', t.getAttribute('data-tab') === tab);
    });
    document.querySelectorAll('.icon-tab-content').forEach(function(c) {
      c.classList.remove('active');
    });
    document.getElementById('tab' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');
  }

  document.querySelectorAll('.icon-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      setActiveTab(this.getAttribute('data-tab'));
      autoFillSymbol();
    });
  });

  iconFileInput.addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
      state.uploadedIconData = ev.target.result;
      iconPreview.innerHTML = '<img src="' + ev.target.result + '">';
    };
    reader.readAsDataURL(file);
  });

  symbolBold.addEventListener('change', updateSymbolPreviewStyle);
  symbolColor.addEventListener('input', updateSymbolPreviewStyle);

  function updateSymbolPreviewStyle() {
    symbolPreview.style.fontWeight = symbolBold.checked ? 'bold' : 'normal';
    symbolPreview.style.color = symbolColor.value;
  }

  document.getElementById('shortcutModalClose').addEventListener('click', function() {
    shortcutModal.classList.remove('active');
  });
  document.getElementById('shortcutModalCancel').addEventListener('click', function() {
    shortcutModal.classList.remove('active');
  });

  document.getElementById('shortcutModalSave').addEventListener('click', function() {
    var name = shortcutNameInput.value.trim();
    var url = shortcutUrlInput.value.trim();
    if (!name || !url) return;

    if (!/^https?:\/\//.test(url)) {
      url = 'https://' + url;
    }

    var iconType = state.currentIconType;
    var iconData = '';

    if (iconType === 'upload' && state.uploadedIconData) {
      iconData = state.uploadedIconData;
    } else {
      iconType = 'symbol';
      iconData = getIconChars(name);
    }

    var iconBold = iconType === 'symbol' ? (symbolBold.checked || true) : false;
    var iconColor = iconType === 'symbol' ? (symbolColor.value || '#000000') : '';

    if (state.editingShortcut) {
      state.editingShortcut.name = name;
      state.editingShortcut.url = url;
      state.editingShortcut.iconType = iconType;
      state.editingShortcut.iconData = iconData;
      state.editingShortcut.iconBold = iconBold;
      state.editingShortcut.iconColor = iconColor;
    } else {
      var maxOrder = state.shortcuts.reduce(function(m, s) {
        return s.order > m ? s.order : m;
      }, -1);
      state.shortcuts.push({
        id: genId(),
        name: name,
        url: url,
        iconType: iconType,
        iconData: iconData,
        iconBold: iconBold,
        iconColor: iconColor,
        order: maxOrder + 1
      });
    }

    saveShortcuts();
    renderShortcuts();
    shortcutModal.classList.remove('active');
  });

  function deleteShortcut(id) {
    if (!confirm('确定删除这个快捷方式吗？')) return;
    state.shortcuts = state.shortcuts.filter(function(s) { return s.id !== id; });
    saveShortcuts();
    renderShortcuts();
  }

  /* Settings Modal */
  var settingsModal = document.getElementById('settingsModal');

  function openSettings() {
    renderSettingsEngineSelect();
    document.getElementById('customTextInput').value = state.display.customText || '';
    document.getElementById('dsKeyInput').value = state.dsKey || '';
    settingsModal.classList.add('active');
  }

  function renderSettingsEngineSelect() {
    var sel = document.getElementById('settingsEngineSelect');
    sel.innerHTML = '';
    state.engines.forEach(function(eng) {
      var opt = document.createElement('option');
      opt.value = eng.name;
      opt.textContent = eng.name;
      sel.appendChild(opt);
    });
    sel.value = state.currentEngine;
  }

  document.getElementById('settingsModalClose').addEventListener('click', function() {
    settingsModal.classList.remove('active');
  });
  document.getElementById('settingsModalCloseBtn').addEventListener('click', function() {
    settingsModal.classList.remove('active');
  });

  document.getElementById('settingsEngineSelect').addEventListener('change', function() {
    state.currentEngine = this.value;
    document.getElementById('engineSelect').value = state.currentEngine;
    saveEngines();
    updateSearchAction();
  });

  document.getElementById('addEngineBtn').addEventListener('click', function() {
    var name = document.getElementById('newEngineName').value.trim();
    var url = document.getElementById('newEngineUrl').value.trim();
    if (!name || !url) return;
    if (url.indexOf('%s') === -1) {
      alert('URL模板必须包含 %s');
      return;
    }
    state.engines.push({ name: name, urlTemplate: url });
    saveEngines();
    renderEngineSelect();
    renderSettingsEngineSelect();
    document.getElementById('newEngineName').value = '';
    document.getElementById('newEngineUrl').value = '';
  });

  document.getElementById('deleteEngineBtn').addEventListener('click', function() {
    var sel = document.getElementById('settingsEngineSelect');
    var name = sel.value;
    if (name === '必应' || name === '百度') {
      alert('默认引擎不可删除');
      return;
    }
    if (state.engines.length <= 1) {
      alert('至少保留一个搜索引擎');
      return;
    }
    if (!confirm('确定删除搜索引擎 "' + name + '" 吗？')) return;
    state.engines = state.engines.filter(function(e) { return e.name !== name; });
    if (state.currentEngine === name) {
      state.currentEngine = state.engines[0].name;
    }
    saveEngines();
    renderEngineSelect();
    renderSettingsEngineSelect();
  });

  document.getElementById('customTextInput').addEventListener('input', function() {
    state.display.customText = this.value;
    saveDisplay();
    renderDisplayCards();
  });
  document.getElementById('dsKeyInput').addEventListener('input', function() {
    state.dsKey = this.value.trim();
    saveDsKey();
    dsBalanceCache = { value: '', at: 0, pending: false };
    renderDisplayCards();
  });

  /* Close modals on overlay click */
  shortcutModal.addEventListener('click', function(e) {
    if (e.target === shortcutModal) shortcutModal.classList.remove('active');
  });
  settingsModal.addEventListener('click', function(e) {
    if (e.target === settingsModal) settingsModal.classList.remove('active');
  });

  /* Close modals on Escape */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      shortcutModal.classList.remove('active');
      settingsModal.classList.remove('active');
      hideContextMenu();
    }
  });

  /* Engine select change */
  document.getElementById('engineSelect').addEventListener('change', function() {
    state.currentEngine = this.value;
    localStorage.setItem(KEYS.currentEngine, state.currentEngine);
    updateSearchAction();
  });

  function adjustSearchWidth() {
    var cards = document.getElementById('displayCards');
    var form = document.getElementById('searchForm');
    if (!cards || !form) return;
    var cardEls = cards.querySelectorAll('.display-card');
    var total = 0;
    for (var i = 0; i < cardEls.length; i++) {
      total += cardEls[i].offsetWidth;
    }
    if (cardEls.length > 1) {
      total += (cardEls.length - 1) * 20; // gap
    }
    var minWidth = 580;
    var maxWidth = Math.min(window.innerWidth - 60, 900);
    var newWidth = Math.max(minWidth, Math.min(total + 40, maxWidth));
    form.style.width = newWidth + 'px';
  }

  /* Welcome Modal */
  var welcomeModal = document.getElementById('welcomeModal');
  var welcomeNextBtn = document.getElementById('welcomeNextBtn');
  var welcomeSlides = document.querySelectorAll('.welcome-slide');
  var welcomeDots = document.querySelectorAll('.welcome-dot');
  var welcomeIndex = 0;

  function showWelcomeSlide(i) {
    welcomeIndex = i;
    welcomeSlides.forEach(function(slide, idx) {
      slide.classList.toggle('active', idx === i);
    });
    welcomeDots.forEach(function(dot, idx) {
      dot.classList.toggle('active', idx === i);
    });
    welcomeNextBtn.textContent = i === welcomeSlides.length - 1 ? '开始使用' : '下一步';
  }

  welcomeNextBtn.addEventListener('click', function() {
    if (welcomeIndex < welcomeSlides.length - 1) {
      showWelcomeSlide(welcomeIndex + 1);
    } else {
      localStorage.setItem('zgmz_welcomed', 'true');
      welcomeModal.classList.remove('active');
      showWelcomeSlide(0);
    }
  });

  function checkWelcome() {
    if (!localStorage.getItem('zgmz_welcomed')) {
      welcomeModal.classList.add('active');
    }
  }

  /* Reset All */
  window.resetAllData = function() {
    if (!confirm('确定要清除所有配置并重新引导吗？')) return;
    localStorage.removeItem('zgmz_shortcuts');
    localStorage.removeItem('zgmz_engines');
    localStorage.removeItem('zgmz_currentEngine');
    localStorage.removeItem('zgmz_display');
    localStorage.removeItem('zgmz_dsKey');
    localStorage.removeItem('zgmz_welcomed');
    localStorage.removeItem('zgmz_defaultShortcuts');
    location.reload();
  };

  /* Init */
  loadAll();
  renderShortcuts();
  renderEngineSelect();
  renderDisplayCards();
  adjustSearchWidth();
  checkWelcome();
  setInterval(renderDisplayCards, 1000);
  window.addEventListener('resize', adjustSearchWidth);
})();
