(() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const path = {
    activity: 'M22 12h-4l-3 9L9 3l-3 9H2',
    'arrow-down-left': 'M17 17 7 7 M17 7H7v10',
    'arrow-left': 'M19 12H5 M12 19l-7-7 7-7',
    'arrow-up': 'M12 19V5 M5 12l7-7 7 7',
    'arrow-up-left': 'M17 17 7 7 M17 7H7v10',
    blocks: 'M3 3h8v8H3z M13 3h8v5h-8z M13 10h8v11h-8z M3 13h8v8H3z',
    braces: 'M8 3H6a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2 M16 3h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2',
    bug: 'M8 8h8a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4z M12 8V4 M9 4h6 M4 12H2 M4 17H2 M20 12h2 M20 17h2 M7 5 5 3 M17 5l2-2 M9 12v4 M15 12v4',
    'calendar-check': 'M8 2v4 M16 2v4 M3 9h18 M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M8 15l2 2 5-5',
    check: 'M5 12l4 4L19 6',
    'check-circle': 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z M8 12l3 3 5-6',
    'check-circle-2': 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z M8 12l3 3 5-6',
    'chevron-down': 'm6 9 6 6 6-6',
    'code-2': 'm18 16 4-4-4-4 M6 8l-4 4 4 4 M14.5 4l-5 16',
    database: 'M12 3C7 3 3 4.8 3 7s4 4 9 4 9-1.8 9-4-4-4-9-4z M3 7v10c0 2.2 4 4 9 4s9-1.8 9-4V7 M3 12c0 2.2 4 4 9 4s9-1.8 9-4',
    'database-backup': 'M12 3C7 3 3 4.8 3 7s4 4 9 4 9-1.8 9-4-4-4-9-4z M3 7v10c0 2.2 4 4 9 4 M3 12c0 2.2 3 4 7 4 M18 15v6 M15 18h6',
    'external-link': 'M14 3h7v7 M10 14 21 3 M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6',
    'file-text': 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 13h8 M8 17h8 M8 9h2',
    gauge: 'M12 14l4-4 M20.2 16A9 9 0 1 0 3.8 16 M5 19h14 M12 2v2 M4.9 5l1.4 1.4 M19.1 5l-1.4 1.4',
    'git-branch': 'M6 3v12 M18 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M6 15a6 6 0 0 0 6-6',
    github: 'M9 19c-4.5 1.5-4.5-2.5-6.5-3 M15 21v-3.5c0-1 .1-1.7-.5-2.5 3.3-.4 6.5-1.6 6.5-7A5.4 5.4 0 0 0 19.5 4 5 5 0 0 0 19.4.5L16 2a13 13 0 0 0-8 0L4.6.5A5 5 0 0 0 4.5 4 5.4 5.4 0 0 0 3 8c0 5.4 3.2 6.6 6.5 7-.6.8-.5 1.7-.5 2.5V21',
    'graduation-cap': 'm2 10 10-6 10 6-10 6-10-6z M6 12v5c4 3 8 3 12 0v-5 M22 10v6',
    headset: 'M3 14v-3a9 9 0 0 1 18 0v3 M3 14h4v6H5a2 2 0 0 1-2-2v-4z M21 14h-4v6h2a2 2 0 0 0 2-2v-4z M17 20a5 5 0 0 1-5 2',
    heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z',
    'heart-handshake': 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l3-2.9 M14 13l2 2 4-4 M15 16l2 2 4-4',
    info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 11v5 M12 7h.01',
    laptop: 'M3 4h18v13H3z M2 21h20l-1-4H3z',
    layers: 'm12 2 10 5-10 5L2 7l10-5z M2 12l10 5 10-5 M2 17l10 5 10-5',
    'life-buoy': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M4.9 4.9l4.3 4.3 M14.8 14.8l4.3 4.3 M19.1 4.9l-4.3 4.3 M9.2 14.8l-4.3 4.3',
    linkedin: 'M4 4h.01 M3 8h3v13H3z M10 8h3v2c1-2 6-2 6 3v8h-3v-7c0-3-3-3-3 0v7h-3z M2 2h20v20H2z',
    'lock-keyhole': 'M5 11h14v10H5z M8 11V7a4 4 0 1 1 8 0v4 M12 15v2',
    mail: 'M3 5h18v14H3z M3 6l9 7 9-7',
    menu: 'M4 6h16 M4 12h16 M4 18h16',
    'message-circle': 'M21 11.5a8.5 8.5 0 0 1-12.8 7.3L3 20l1.2-4.2A8.5 8.5 0 1 1 21 11.5z',
    'messages-square': 'M21 11a8 8 0 0 1-8 8H7l-4 3v-6a8 8 0 1 1 18-5z M8 8h8 M8 12h5',
    monitor: 'M3 4h18v13H3z M8 21h8 M12 17v4',
    'monitor-cog': 'M3 4h18v13H3z M8 21h8 M12 17v4 M16 8l1 1 2-1 M17 6v1 M16 10l1-1',
    moon: 'M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13z',
    network: 'M12 2v5 M5 17v-4h14v4 M12 7 5 13 M12 7l7 6 M9 21H3v-4h6z M21 21h-6v-4h6z M15 11H9V7h6z',
    phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.4 2.7a2 2 0 0 1-.6 1.7L7 9.9a16 16 0 0 0 6 6l1.8-1.9a2 2 0 0 1 1.7-.6l2.7.4a2 2 0 0 1 1.8 2.1z',
    quote: 'M3 21c3 0 5-2 5-5V5H2v8h4c0 2-1 3-3 3z M16 21c3 0 5-2 5-5V5h-6v8h4c0 2-1 3-3 3z',
    router: 'M4 14h16v7H4z M7 14V9 M12 14V9 M17 14V9 M4 4h16 M8 4v2 M12 4v2 M16 4v2 M8 18h.01 M12 18h.01 M16 18h.01',
    send: 'm22 2-7 20-4-9-9-4 20-7z M22 2 11 13',
    server: 'M3 4h18v6H3z M3 14h18v6H3z M7 7h.01 M7 17h.01 M11 7h6 M11 17h6',
    'settings-2': 'M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M2 14h4 M10 8h4 M18 16h4',
    shield: 'M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z',
    'shield-check': 'M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z M9 12l2 2 4-4',
    sparkles: 'm12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z M19 14l1.2 3.3L23 18l-2.8 1-1.2 3-1-3-3-1 3-.7L19 14z M5 2l.8 2.2L8 5l-2.2.8L5 8l-.8-2.2L2 5l2.2-.8L5 2z',
    star: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3z',
    sun: 'M12 3v2 M12 19v2 M3 12h2 M19 12h2 M5.6 5.6 7 7 M17 17l1.4 1.4 M18.4 5.6 17 7 M7 17l-1.4 1.4 M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z',
    terminal: 'M4 17l6-5-6-5 M12 19h8',
    'terminal-square': 'M3 3h18v18H3z M7 9l4 3-4 3 M13 16h4',
    'trending-up': 'M3 17l6-6 4 4 8-8 M15 7h6v6',
    users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.9 M16 3.1a4 4 0 0 1 0 7.8',
    workflow: 'M3 3h6v6H3z M15 15h6v6h-6z M15 3h6v6h-6z M6 9v3a3 3 0 0 0 3 3h6 M18 9v6',
    wrench: 'M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18a2.1 2.1 0 0 0 3 3l5.3-5.3a5 5 0 0 0 6.4-6.4l-3 3-3-3z',
    x: 'M18 6 6 18 M6 6l12 12',
    zap: 'm13 2-3 8h7l-6 12 1-9H5l8-11z'
  };
  const aliases = {
    'database-backup': 'database',
    'heart-handshake': 'heart',
    'monitor-cog': 'monitor',
    'check-circle-2': 'check-circle',
    'life-buoy': 'life-buoy'
  };
  document.querySelectorAll('i[data-lucide]').forEach((placeholder) => {
    const name = placeholder.getAttribute('data-lucide');
    const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
    const alias = hasOwn(aliases, name) ? aliases[name] : null;
    const d = hasOwn(path, name) ? path[name] : (alias && hasOwn(path, alias) ? path[alias] : path.sparkles);
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.8');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    if (placeholder.className) svg.setAttribute('class', placeholder.className);
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', d);
    if (name === 'star') p.setAttribute('fill', 'currentColor');
    svg.appendChild(p);
    placeholder.replaceWith(svg);
  });
})();
