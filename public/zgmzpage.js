(function() {
  var KEYS = {
    shortcuts: 'zgmz_shortcuts',
    engines: 'zgmz_engines',
    currentEngine: 'zgmz_currentEngine',
    display: 'zgmz_display',
    defaultShortcuts: 'zgmz_defaultShortcuts'
  };

  var DEFAULT_SHORTCUTS = [];

  var DEFAULT_ENGINES = [
    { name: '必应', urlTemplate: 'https://www.bing.com/search?q=%s' },
    { name: '百度', urlTemplate: 'https://www.baidu.com/s?wd=%s' }
  ];

  var DEFAULT_DISPLAY = {
    showDate: true,
    showTime: true,
    showGreeting: true,
    customText: '',
    userName: ''
  };

  var state = {
    shortcuts: [],
    engines: [],
    currentEngine: '必应',
    display: {},
    editingShortcut: null,
    currentIconType: 'auto',
    uploadedIconData: ''
  };

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

    try {
      var di = localStorage.getItem(KEYS.display);
      state.display = di ? JSON.parse(di) : null;
    } catch(e) { state.display = null; }

    if (!state.display) {
      state.display = JSON.parse(JSON.stringify(DEFAULT_DISPLAY));
      saveDisplay();
    }
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
    var d = state.display;

    if (d.showDate) {
      var card = createCard('date', formatDate(new Date()));
      container.appendChild(card);
    }
    if (d.showTime) {
      var card = createCard('time', formatTime(new Date()));
      container.appendChild(card);
    }
    if (d.showGreeting) {
      var card = createCard('greeting', getGreeting(d.userName || ''));
      container.appendChild(card);
    }
    if (d.customText) {
      var card = createCard('custom', parseCustomText(d.customText));
      container.appendChild(card);
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

  function formatDate(d) {
    return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日';
  }

  function formatTime(d) {
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    return pad(h) + ':' + pad(m) + ':' + pad(s);
  }

  function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  function getGreeting(userName) {
    var h = new Date().getHours();
    var greeting;
    if (h >= 5 && h < 12) greeting = '早上好';
    else if (h >= 12 && h < 18) greeting = '下午好';
    else greeting = '晚上好';
    if (userName) return greeting + '，' + userName;
    return greeting;
  }

  function getGreetingBase() {
    var h = new Date().getHours();
    if (h >= 5 && h < 12) return '早上好';
    if (h >= 12 && h < 18) return '下午好';
    return '晚上好';
  }

  function parseCustomText(template) {
    var d = new Date();
    var userName = state.display.userName || '';
    var vars = {
      name: userName,
      greeting: getGreetingBase(),
      time: formatTime(d),
      date: formatDate(d),
      hour: pad(d.getHours()),
      minute: pad(d.getMinutes()),
      second: pad(d.getSeconds()),
      weekday: '星期' + ['日','一','二','三','四','五','六'][d.getDay()]
    };
    return template.replace(/\{(\w+)\}/g, function(match, key) {
      return vars[key] !== undefined ? vars[key] : match;
    });
  }

  function getDisplayLength(text) {
    var expanded = parseCustomText(text);
    var len = 0;
    for (var i = 0; i < expanded.length; i++) {
      len += expanded.charCodeAt(i) > 127 ? 2 : 1;
    }
    return len;
  }

  function truncateCustomText(text, maxUnits) {
    var expanded = parseCustomText(text);
    var weight = 0;
    var cutAt = text.length;
    // Find shortest prefix within limit by iterating the raw template text
    // We expand the full template, then figure out how many raw chars produce <= maxUnits
    // Simple approach: binary search on raw text length
    for (var n = 0; n <= text.length; n++) {
      var partial = text.substring(0, n);
      var w = getDisplayLength(partial);
      if (w > maxUnits) { cutAt = n - 1; break; }
    }
    return text.substring(0, cutAt);
  }

  function updateCharCounter() {
    var input = document.getElementById('customTextInput');
    var counter = document.getElementById('charCounter');
    if (!input || !counter) return;
    var raw = input.value;
    var len = getDisplayLength(raw);
    var maxUnits = 80;
    counter.textContent = len + '/' + maxUnits;
    counter.style.color = len > maxUnits ? '#c44' : '#999';
  }
  function updateCustomText() {
    var customCard = document.querySelector('[data-card="custom"] .card-value');
    if (customCard && state.display.customText) {
      customCard.textContent = parseCustomText(state.display.customText);
    }
  }

  function updateTime() {
    var timeCard = document.querySelector('[data-card="time"] .card-value');
    if (timeCard) {
      timeCard.textContent = formatTime(new Date());
    }
    updateCustomText();
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
    document.getElementById('toggleDate').checked = state.display.showDate;
    document.getElementById('toggleTime').checked = state.display.showTime;
    document.getElementById('toggleGreeting').checked = state.display.showGreeting;
    document.getElementById('toggleCustomText').checked = !!state.display.customText;
    document.getElementById('customTextInput').value = state.display.customText || '';
    document.getElementById('customTextRow').style.display = state.display.customText ? 'flex' : 'none';
    document.getElementById('customTextHint').style.display = state.display.customText ? 'block' : 'none';
    document.getElementById('charCounter').style.display = state.display.customText ? 'block' : 'none';
    document.getElementById('userNameInput').value = state.display.userName || '';
    settingsModal.classList.add('active');
    updateCharCounter();
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

  document.getElementById('toggleDate').addEventListener('change', function() {
    state.display.showDate = this.checked;
    saveDisplay();
    renderDisplayCards();
  });
  document.getElementById('toggleTime').addEventListener('change', function() {
    state.display.showTime = this.checked;
    saveDisplay();
    renderDisplayCards();
  });
  document.getElementById('toggleGreeting').addEventListener('change', function() {
    state.display.showGreeting = this.checked;
    saveDisplay();
    renderDisplayCards();
  });
  document.getElementById('toggleCustomText').addEventListener('change', function() {
    document.getElementById('customTextRow').style.display = this.checked ? 'flex' : 'none';
    document.getElementById('customTextHint').style.display = this.checked ? 'block' : 'none';
    document.getElementById('charCounter').style.display = this.checked ? 'block' : 'none';
    updateCharCounter();
    if (!this.checked) {
      state.display.customText = '';
      saveDisplay();
      renderDisplayCards();
    }
  });
  document.getElementById('customTextInput').addEventListener('input', function() {
    var truncated = truncateCustomText(this.value, 80);
    if (truncated !== this.value) {
      this.value = truncated;
    }
    state.display.customText = this.value;
    saveDisplay();
    renderDisplayCards();
    updateCharCounter();
  });
  document.getElementById('userNameInput').addEventListener('input', function() {
    state.display.userName = this.value;
    saveDisplay();
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
  var welcomeStartBtn = document.getElementById('welcomeStartBtn');

  welcomeStartBtn.addEventListener('click', function() {
    localStorage.setItem('zgmz_welcomed', 'true');
    welcomeModal.classList.remove('active');
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
  setInterval(updateTime, 1000);
  window.addEventListener('resize', adjustSearchWidth);
})();
