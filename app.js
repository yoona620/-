// 모든 업무 데이터는 메모리에만 보관하며 새로고침 시 초기화됩니다.
const icons = {
  message: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/><path d="M8 11h8M8 15h5"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.9M15 3.1a4 4 0 0 1 0 7.8"/><circle cx="9" cy="7" r="4"/>',
  'check-square': '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="m7 12 3 3 7-7"/>',
  history: '<path d="M3 11a9 9 0 1 1 2.5 7M3 4v7h7M12 7v5l3 2"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
  sparkles: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM20 2v4M18 4h4"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 .5c0 2-2.5 2-2.5 4M12 17h.01"/>',
  external: '<path d="M14 3h7v7M21 3l-9 9M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/>',
  chevrons: '<path d="m8 9 4-4 4 4m-8 6 4 4 4-4"/>',
  home: '<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9ZM9 21v-8h6v8"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrow: '<path d="M4 12h16m-5-5 5 5-5 5"/>',
  right: '<path d="m9 5 7 7-7 7"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 12a20 20 0 0 0 18 0M12 11v4"/>',
  trend: '<path d="m3 17 6-6 4 4 8-10M15 5h6v6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z"/>'
};
function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.info}</svg>`;
}
function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(element => { element.innerHTML = icon(element.dataset.icon); });
}
// 사용자 입력을 HTML로 출력할 때는 항상 이 함수를 사용합니다.
function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}
function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
const today = dateKey(new Date());
function relativeDate(days) {
  const date = new Date(`${today}T12:00:00`);
  date.setDate(date.getDate() + days);
  return dateKey(date);
}
function shortDate(value) {
  if (!value) return '미정';
  return `${Number(value.slice(5, 7))}.${value.slice(8, 10)}`;
}
function displayDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' });
}
const contacts = [
  { id: 1, name: '블루웨이브 디자인', person: '김하늘', phone: '02-000-1001', industry: '디자인 · 브랜딩', last: relativeDate(-3), next: today, color: 'blue', initial: '블' },
  { id: 2, name: '그린테크 솔루션', person: '이서준', phone: '02-000-1002', industry: 'IT · 소프트웨어', last: relativeDate(-5), next: today, color: 'green', initial: '그' },
  { id: 3, name: '모멘트 마케팅', person: '박지우', phone: '02-000-1003', industry: '마케팅 · 광고', last: relativeDate(-2), next: relativeDate(1), color: 'purple', initial: '모' },
  { id: 4, name: '오렌지 스튜디오', person: '최도윤', phone: '02-000-1004', industry: '콘텐츠 · 미디어', last: relativeDate(-7), next: relativeDate(2), color: 'orange', initial: '오' },
  { id: 5, name: '넥스트 커머스', person: '정수아', phone: '02-000-1005', industry: '유통 · 이커머스', last: relativeDate(-4), next: relativeDate(3), color: 'blue', initial: '넥' },
  { id: 6, name: '라이트웍스', person: '윤시우', phone: '02-000-1006', industry: '컨설팅 · 서비스', last: relativeDate(-1), next: relativeDate(5), color: 'purple', initial: '라' }
];
const tasks = [
  { id: 1, title: '브랜드 리뉴얼 제안서 전달 및 피드백 확인', contactId: 1, due: today, time: '10:00', priority: 'urgent', done: false },
  { id: 2, title: '솔루션 도입 견적서 발송', contactId: 2, due: today, time: '11:30', priority: 'important', done: false },
  { id: 3, title: '마케팅 캠페인 미팅 일정 조율', contactId: 3, due: today, time: '14:00', priority: 'important', done: false },
  { id: 4, title: '콘텐츠 제작 진행 상황 확인', contactId: 4, due: today, time: '16:00', priority: 'normal', done: false },
  { id: 5, title: '신규 입점 제안 자료 정리', contactId: 5, due: today, time: '17:00', priority: 'normal', done: false },
  { id: 6, title: '지난 미팅 회의록 정리 및 공유', contactId: 6, due: today, time: '09:00', priority: 'normal', done: true },
  { id: 7, title: '캠페인 운영 방향 후속 논의', contactId: 3, due: relativeDate(1), time: '14:00', priority: 'important', done: false },
  { id: 8, title: '영상 제작 일정 협의', contactId: 4, due: relativeDate(2), time: '11:00', priority: 'normal', done: false }
];
const history = [
  { id: 1, contactId: 1, date: relativeDate(-3), method: '전화', summary: '새로운 브랜드 방향과 리뉴얼 범위를 논의했습니다. 제안서 검토 후 다음 단계로 진행하기로 했습니다.', followUp: '브랜드 리뉴얼 제안서 전달 및 피드백 확인' },
  { id: 2, contactId: 2, date: relativeDate(-5), method: '이메일', summary: '업무 솔루션 도입에 필요한 기능과 예산을 확인했습니다. 기본형과 확장형 견적을 요청받았습니다.', followUp: '솔루션 도입 견적서 발송' },
  { id: 3, contactId: 3, date: relativeDate(-2), method: '미팅', summary: '다음 캠페인의 목표와 주요 채널을 정리했습니다. 세부 일정은 후속 미팅에서 확정할 예정입니다.', followUp: '마케팅 캠페인 미팅 일정 조율' },
  { id: 4, contactId: 4, date: relativeDate(-7), method: '전화', summary: '콘텐츠 시안 작업에 착수했습니다. 초안 완성 후 진행 상황을 공유하기로 했습니다.', followUp: '콘텐츠 제작 진행 상황 확인' },
  { id: 5, contactId: 5, date: relativeDate(-4), method: '이메일', summary: '신규 입점 조건과 상품 구성에 대한 안내를 전달했습니다.', followUp: '신규 입점 제안 자료 정리' },
  { id: 6, contactId: 6, date: relativeDate(-1), method: '미팅', summary: '프로젝트 운영 현황을 점검하고 다음 달 컨설팅 방향을 합의했습니다.', followUp: '지난 미팅 회의록 공유 완료' }
];
const pageNames = { dashboard: '대시보드', contacts: '거래처 관리', tasks: '업무 관리', history: '연락 내역', vault: '비밀 보관함' };
const state = { page: 'dashboard', taskTab: 'pending', taskSearch: '', priority: 'all', contactSearch: '', historyContact: 'all', scheduleDay: today };
const main = document.getElementById('main-content');
const dialog = document.getElementById('form-dialog');
let toastTimer;
let vault = { ciphertext: null, salt: null, iv: null, key: null, text: '', locked: true };
let vaultTimer;
function contactById(id) { return contacts.find(contact => contact.id === Number(id)); }
function companyAvatar(contact) { return `<span class="company-avatar ${contact.color}">${escapeHTML(contact.initial)}</span>`; }
function priorityBadge(priority) {
  const labels = { urgent: '긴급', important: '중요', normal: '일반', done: '완료' };
  return `<span class="badge ${priority}"><i></i>${labels[priority]}</span>`;
}
function toast(message) {
  const element = document.getElementById('toast');
  element.textContent = message;
  element.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { element.hidden = true; }, 3500);
}
function pageHeading(title, subtitle, action = '') {
  return `<div class="page-heading"><div><h1>${title}</h1><p class="page-subtitle">${subtitle}</p></div>${action || `<span class="date-display">${icon('calendar')}${new Date(`${today}T12:00:00`).getFullYear()}년 ${displayDate(today)}</span>`}</div>`;
}
function pendingToday() { return tasks.filter(task => task.due <= today && !task.done); }
function renderMetrics() {
  const complete = tasks.filter(task => task.done && task.due === today).length;
  const upcoming = contacts.filter(contact => contact.next && contact.next >= today && contact.next <= relativeDate(7)).length;
  const urgent = pendingToday().filter(task => task.priority === 'urgent').length;
  const cards = [
    ['오늘의 업무', pendingToday().length, '건', 'calendar', 'blue', `<b class="urgent-text">긴급 업무 ${urgent}건</b> 먼저 확인하세요`],
    ['관리 중인 거래처', contacts.length, '곳', 'users', 'purple', `${icon('briefcase')}함께 성장하는 비즈니스 파트너`],
    ['완료한 업무', complete, '건', 'check-square', 'green', `${icon('check')}오늘도 한 걸음 더 나아갔어요`],
    ['다가오는 연락', upcoming, '건', 'phone', 'orange', `<b>7일 이내</b> 예정된 연락 일정`]
  ];
  return `<div class="metrics">${cards.map(([title, count, unit, symbol, color, description]) => `<article class="metric"><div class="metric-top">${title}<span class="metric-icon ${color}">${icon(symbol)}</span></div><div class="metric-value"><strong>${count}</strong><span>${unit}</span></div><div class="metric-bottom">${description}</div></article>`).join('')}</div>`;
}
function filteredTasks(dashboard) {
  return tasks.filter(task => (!dashboard || task.due <= today)
    && (state.taskTab === 'all' || (state.taskTab === 'done' ? task.done : !task.done))
    && (state.priority === 'all' || task.priority === state.priority)
    && `${task.title} ${contactById(task.contactId)?.name}`.toLowerCase().includes(state.taskSearch.toLowerCase()))
    .sort((a, b) => a.due.localeCompare(b.due) || a.time.localeCompare(b.time));
}
function taskRows(dashboard) {
  const list = filteredTasks(dashboard);
  if (!list.length) return '<div class="empty-state">표시할 업무가 없습니다.<br>새 업무를 추가하거나 필터를 변경해 보세요.</div>';
  return list.map(task => {
    const contact = contactById(task.contactId);
    return `<div class="task-row ${task.done ? 'completed' : ''}">
      <button class="task-check ${task.done ? 'checked' : ''}" data-toggle-task="${task.id}" aria-label="${escapeHTML(task.title)} ${task.done ? '미완료로 변경' : '완료하기'}" aria-pressed="${task.done}">${task.done ? icon('check') : ''}</button>
      <div class="task-info"><div class="task-title">${escapeHTML(task.title)}</div><div class="task-meta">${icon('briefcase')}${escapeHTML(contact?.name || '거래처 없음')}<span class="meta-divider">·</span>${icon('clock')}${task.time}${!dashboard ? `<span class="meta-divider">·</span>${shortDate(task.due)}` : ''}</div></div>
      <span class="task-priority">${priorityBadge(task.done ? 'done' : task.priority)}</span><span class="task-due ${task.due < today && !task.done ? 'overdue' : ''}">${task.due < today && !task.done ? '기한 지남' : task.due === today ? '오늘' : shortDate(task.due)}</span>
    </div>`;
  }).join('');
}
function taskPanel(dashboard = false) {
  const scope = tasks.filter(task => !dashboard || task.due <= today);
  return `<section class="panel">
    <div class="panel-heading"><h2 class="panel-title">${dashboard ? '오늘 해야 할 업무' : '나의 업무'}<span class="title-count">${scope.filter(task => !task.done).length}</span></h2>${dashboard ? '<a class="text-button" href="#tasks">전체 보기 ' + icon('right') + '</a>' : ''}</div>
    <div class="task-toolbar"><div class="tabs" aria-label="업무 상태">${[['pending', '해야 할 업무', scope.filter(task => !task.done).length], ['done', '완료한 업무', scope.filter(task => task.done).length], ...(!dashboard ? [['all', '전체', scope.length]] : [])].map(([value, label, count]) => `<button class="tab ${state.taskTab === value ? 'active' : ''}" data-task-tab="${value}" aria-pressed="${state.taskTab === value}">${label}<span>${count}</span></button>`).join('')}</div><button class="primary-button" data-add-task>${icon('plus')}업무 추가</button></div>
    <div class="task-list" id="task-list">${taskRows(dashboard)}</div>
    <div class="panel-footnote">${icon('info')}완료한 업무는 체크 버튼으로 언제든 되돌릴 수 있어요.</div>
  </section>`;
}
function contactTable() {
  return `<section class="panel contact-panel"><div class="panel-heading"><h2 class="panel-title">거래처 현황</h2><a class="text-button" href="#contacts">전체 보기 ${icon('right')}</a></div>
    <div class="table-wrap"><table><thead><tr><th>거래처명</th><th>담당자</th><th>마지막 연락</th><th>다음 연락</th><th>상태</th></tr></thead><tbody>${contacts.slice(0, 4).map(contact => `<tr><td><div class="contact-cell">${companyAvatar(contact)}<div><button class="contact-name" data-contact-detail="${contact.id}">${escapeHTML(contact.name)}</button><div class="contact-industry">${escapeHTML(contact.industry)}</div></div></div></td><td>${escapeHTML(contact.person)}</td><td>${shortDate(contact.last)}</td><td class="next-date">${shortDate(contact.next)}</td><td>${contact.next && contact.next <= today ? '<span class="badge important">연락 예정</span>' : '<span class="badge done">진행 중</span>'}</td></tr>`).join('')}</tbody></table></div><div class="table-note">거래처명을 클릭하면 연락 내역과 후속 조치를 확인할 수 있어요.</div></section>`;
}
function aiPanel() {
  const urgent = pendingToday().filter(task => task.priority === 'urgent');
  const target = urgent[0] || pendingToday()[0];
  return `<section class="ai-panel"><div class="ai-heading">${icon('sparkles')}AI 데일리 브리핑<span class="ai-label">DEMO</span></div>
    <h3>${target ? `오늘은 <span>${escapeHTML(contactById(target.contactId)?.name)}</span><br>연락부터 시작해 볼까요?` : '오늘의 업무를 모두 마쳤어요.<br><span>정말 수고하셨습니다!</span>'}</h3>
    <p>${target ? `${urgent.length ? '긴급 업무가 있어 우선 확인이 필요해요.' : '가장 이른 일정부터 차근차근 진행해 보세요.'} ${escapeHTML(target.title)} 업무를 확인해 주세요.` : '다가오는 연락 일정을 확인하고 여유롭게 다음 업무를 준비해 보세요.'}</p>
    <div class="ai-tip">${icon('info')}<p>업무 우선순위와 일정을 바탕으로 생성한<br>로컬 데모 요약입니다. 외부 AI 전송은 없어요.</p></div></section>`;
}
function schedulePanel() {
  const start = new Date(`${today}T12:00:00`);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const week = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setDate(date.getDate() + index);
    return { key: dateKey(date), number: date.getDate(), label: ['월', '화', '수', '목', '금', '토', '일'][index] };
  });
  const scheduled = contacts.filter(contact => contact.next === state.scheduleDay).map(contact => ({
    contact,
    task: tasks.filter(task => task.contactId === contact.id && task.due === state.scheduleDay && !task.done).sort((a, b) => a.time.localeCompare(b.time))[0]
  })).sort((a, b) => (a.task?.time || '24:00').localeCompare(b.task?.time || '24:00'));
  return `<section class="panel schedule-panel"><div class="panel-heading"><h2 class="panel-title">이번 주 연락 일정</h2><span class="calendar-month">${Number(today.slice(5, 7))}월 ${icon('calendar')}</span></div>
    <div class="week-strip">${week.map(day => `<button class="week-day ${day.key === state.scheduleDay ? 'selected' : ''}" data-schedule-day="${day.key}" aria-label="${displayDate(day.key)} 일정" aria-pressed="${day.key === state.scheduleDay}"><span>${day.label}</span><b>${day.number}</b><i style="visibility:${contacts.some(contact => contact.next === day.key) ? 'visible' : 'hidden'}"></i></button>`).join('')}</div>
    <div class="schedule-list">${scheduled.slice(0, 3).map(({ contact, task }) => {
      const title = task?.title || '예정된 연락 · 후속 일정 확인';
      return `<div class="schedule-item"><span class="timeline-dot"></span><div class="schedule-info"><strong>${escapeHTML(contact.name)}</strong><p>${escapeHTML(title.length > 19 ? title.slice(0, 19) + '…' : title)}</p>${priorityBadge(task?.priority || 'normal')}</div><span class="schedule-time">${task?.time || '시간 미정'}</span></div>`;
    }).join('') || '<div class="empty-state">예정된 연락이 없어요.<br>여유로운 하루를 계획해 보세요.</div>'}</div><a class="schedule-footer" href="#contacts">전체 연락 일정 확인하기 ${icon('arrow')}</a></section>`;
}
function dashboardPage() {
  return pageHeading('대시보드', '오늘의 업무와 소중한 연결을 한눈에 확인하세요.')
    + `<section class="welcome-banner"><div class="welcome-copy"><div class="welcome-eyebrow">${icon('sparkles')}YOUR SMART WORK PARTNER</div><h2>좋은 하루예요! 오늘도 함께 시작해요.</h2><p>오늘 확인해야 할 업무가 <strong>${pendingToday().length}건</strong> 있어요.<br>연락톡이 중요한 업무를 놓치지 않도록 도와드릴게요.</p></div><div class="banner-art" aria-hidden="true"><div class="art-card"><div class="art-top"><i></i><i></i><i></i></div><div class="art-row"><b>✓</b><span></span></div><div class="art-row"><b>✓</b><span></span></div><div class="art-row"><b></b><span></span></div></div><span class="art-bubble">${icon('message')}</span><span class="art-check">${icon('check')}</span><span class="art-star">✦</span></div></section>`
    + renderMetrics() + `<div class="dashboard-grid"><div class="main-column">${taskPanel(true)}${contactTable()}</div><div class="side-column">${aiPanel()}${schedulePanel()}<a class="panel vault-teaser" href="#vault"><span class="vault-teaser-icon" data-icon="lock"></span><div><strong>나만의 비밀 보관함</strong><p>중요한 메모를 안전하게 보관하세요.</p></div>${icon('right')}</a></div></div>`;
}
function contactCards() {
  const list = contacts.filter(contact => `${contact.name} ${contact.person} ${contact.phone}`.toLowerCase().includes(state.contactSearch.toLowerCase()));
  return list.map(contact => `<article class="panel contact-card"><div class="contact-card-heading">${companyAvatar(contact)}<div><h2>${escapeHTML(contact.name)}</h2><p>${escapeHTML(contact.industry)}</p></div></div><dl class="contact-details"><dt>담당자</dt><dd>${escapeHTML(contact.person)}</dd><dt>연락처 (가상)</dt><dd>${escapeHTML(contact.phone)}</dd><dt>마지막 연락</dt><dd>${contact.last ? displayDate(contact.last) : '내역 없음'}</dd><dt>다음 연락</dt><dd>${contact.next ? displayDate(contact.next) : '미정'}</dd></dl><button class="secondary-button" data-contact-detail="${contact.id}">연락 내역 및 상세 보기 ${icon('right')}</button></article>`).join('') || '<div class="panel empty-state">검색 결과가 없습니다.</div>';
}
function contactsPage() {
  return pageHeading('거래처 관리', '소중한 비즈니스 파트너와의 연결을 관리하세요.')
    + `<div class="management-toolbar"><label class="search-field">${icon('search')}<input id="contact-search" aria-label="거래처 검색" placeholder="거래처, 담당자, 연락처 검색" value="${escapeHTML(state.contactSearch)}"></label><button class="primary-button" data-add-contact>${icon('plus')}거래처 추가</button></div><div class="contact-grid" id="contact-grid">${contactCards()}</div>`;
}
function tasksPage() {
  return pageHeading('업무 관리', '작은 할 일부터 중요한 약속까지, 하나씩 완료해 보세요.')
    + `<div class="management-toolbar"><label class="search-field">${icon('search')}<input id="task-search" aria-label="업무 검색" placeholder="업무 또는 거래처 검색" value="${escapeHTML(state.taskSearch)}"></label><select id="priority-filter" aria-label="우선순위 필터">${[['all', '모든 우선순위'], ['urgent', '긴급'], ['important', '중요'], ['normal', '일반']].map(([value, label]) => `<option value="${value}" ${state.priority === value ? 'selected' : ''}>${label}</option>`).join('')}</select></div>${taskPanel()}`;
}
function historyRows(contactId = state.historyContact) {
  const list = history.filter(entry => contactId === 'all' || entry.contactId === Number(contactId)).sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
  return list.map(entry => {
    const contact = contactById(entry.contactId);
    return `<article class="history-item">${companyAvatar(contact)}<div><h3>${escapeHTML(contact.name)}</h3><small>${displayDate(entry.date)} · ${escapeHTML(entry.method)}</small><p>${escapeHTML(entry.summary)}</p>${entry.followUp ? `<div class="follow-up">후속 조치 · ${escapeHTML(entry.followUp)}</div>` : ''}</div></article>`;
  }).join('') || '<div class="empty-state">아직 연락 내역이 없어요. 첫 연락을 기록해 보세요.</div>';
}
function contactOptions(selected, all = false) {
  return `${all ? '<option value="all">모든 거래처</option>' : ''}${contacts.map(contact => `<option value="${contact.id}" ${String(selected) === String(contact.id) ? 'selected' : ''}>${escapeHTML(contact.name)}</option>`).join('')}`;
}
function historyPage() {
  return pageHeading('연락 내역', '지난 대화를 기록하고 다음 연결을 준비하세요.')
    + `<div class="management-toolbar"><select id="history-filter" aria-label="연락 내역 거래처 필터">${contactOptions(state.historyContact, true)}</select><button class="primary-button" data-add-history>${icon('plus')}연락 기록</button></div><section class="panel" id="history-list">${historyRows()}</section>`;
}
function vaultPage() {
  const configured = Boolean(vault.ciphertext);
  return pageHeading('비밀 보관함', '나만 확인할 수 있는 메모 공간입니다.')
    + `<section class="vault-page"><span class="vault-large-icon">${icon('lock')}</span><h2>${vault.locked ? '나만의 안전한 공간' : '보관함이 열렸어요'}</h2><p class="vault-description">${vault.locked ? '비밀번호로 보호되는 개인 메모 보관함입니다.<br>실제 비밀번호나 개인정보 대신 가상의 메모만 사용해 주세요.' : '메모는 암호화되어 현재 탭의 메모리에만 보관됩니다.<br>5분 후 또는 다른 메뉴로 이동하면 자동으로 잠깁니다.'}</p><div class="panel vault-box">
    ${vault.locked ? `<form id="vault-unlock-form"><label class="form-field">${configured ? '보관함 비밀번호' : '새 비밀번호 설정 (8자 이상)'}<input type="password" name="password" minlength="8" maxlength="128" required autocomplete="off" placeholder="데모용 비밀번호를 입력하세요"></label>${!configured ? '<label class="form-field">비밀번호 확인<input type="password" name="confirm" minlength="8" maxlength="128" required autocomplete="off" placeholder="비밀번호를 한 번 더 입력하세요"></label>' : ''}<p id="vault-error" class="form-error" role="alert"></p><button class="primary-button full-width" type="submit">${icon('lock')}${configured ? '보관함 잠금 해제' : '비밀번호 설정하고 시작하기'}</button></form>`
      : `<form id="vault-note-form"><label class="form-field">나만의 메모<textarea name="note" maxlength="5000" placeholder="가상의 메모를 자유롭게 적어 보세요.">${escapeHTML(vault.text)}</textarea></label><div class="form-actions"><button class="secondary-button" type="button" id="lock-vault">${icon('lock')}잠그기</button><button class="primary-button" type="submit">메모 저장</button></div><p class="form-hint">잠그기 전에 저장해 주세요. 저장하지 않은 변경 사항은 사라집니다.</p></form>`}
    </div><div class="privacy-notice">${icon('info')} 데모 전용 · 비밀번호는 저장하지 않으며 PBKDF2와 AES-GCM으로 메모를 암호화합니다. 새로고침하면 비밀번호와 모든 메모가 삭제됩니다. 비밀번호 복구 기능은 없으므로 실제 자료 보관 용도로 사용하지 마세요.</div></section>`;
}
function render() {
  document.getElementById('breadcrumb-title').textContent = pageNames[state.page];
  document.getElementById('contact-count').textContent = contacts.length;
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.toggle('active', link.dataset.page === state.page);
    if (link.dataset.page === state.page) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  main.innerHTML = ({ dashboard: dashboardPage, contacts: contactsPage, tasks: tasksPage, history: historyPage, vault: vaultPage })[state.page]();
  hydrateIcons(main);
  bindPage();
}
function closeMobileMenu() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar').inert = window.matchMedia('(max-width: 760px)').matches;
  document.getElementById('mobile-backdrop').hidden = true;
  document.getElementById('menu-button').setAttribute('aria-expanded', 'false');
}
function navigate() {
  const page = location.hash.slice(1);
  if (state.page === 'vault' && page !== 'vault') lockVault(false);
  state.page = Object.hasOwn(pageNames, page) ? page : 'dashboard';
  state.taskTab = 'pending';
  state.taskSearch = '';
  state.priority = 'all';
  if (dialog.open) dialog.close();
  closeMobileMenu();
  render();
  window.scrollTo(0, 0);
}
function showDialog(title, body) {
  document.getElementById('dialog-title').textContent = title;
  document.getElementById('dialog-body').innerHTML = body;
  hydrateIcons(dialog);
  if (!dialog.open) dialog.showModal();
}
function formActions(label) {
  return `<p class="form-hint">데모용 가상 정보만 입력하세요. 새로고침하면 초기화됩니다.</p><div class="form-actions"><button class="secondary-button" type="button" data-cancel>취소</button><button class="primary-button" type="submit">${label}</button></div>`;
}
function bindDialogForm(handler) {
  dialog.querySelector('[data-cancel]')?.addEventListener('click', () => dialog.close());
  dialog.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // 공백만 입력한 필수 텍스트는 유효한 업무나 거래처가 아닙니다.
    const blank = [...event.currentTarget.querySelectorAll('[required]')].find(input => !input.value.trim());
    if (blank) { blank.setCustomValidity('공백이 아닌 내용을 입력해 주세요.'); blank.reportValidity(); blank.oninput = () => blank.setCustomValidity(''); return; }
    handler(data);
    dialog.close();
    render();
  });
}
function showTaskForm(contactId = '') {
  if (!contacts.length) { toast('먼저 거래처를 추가해 주세요.'); return; }
  showDialog('새 업무 추가', `<form><label class="form-field">업무명<input name="title" required maxlength="100" placeholder="어떤 업무를 해야 하나요?"></label><label class="form-field">거래처<select name="contactId" required>${contactOptions(contactId)}</select></label><div class="form-row"><label class="form-field">예정일<input type="date" name="due" value="${today}" required></label><label class="form-field">시간<input type="time" name="time" value="10:00" required></label></div><label class="form-field">우선순위<select name="priority"><option value="normal">일반</option><option value="important">중요</option><option value="urgent">긴급</option></select></label>${formActions('업무 추가')}</form>`);
  bindDialogForm(data => {
    tasks.push({ id: Math.max(0, ...tasks.map(task => task.id)) + 1, title: data.get('title').trim(), contactId: Number(data.get('contactId')), due: data.get('due'), time: data.get('time'), priority: data.get('priority'), done: false });
    state.taskTab = 'pending';
    toast('새 업무가 추가되었습니다.');
  });
}
function showContactForm(id) {
  const contact = id ? contactById(id) : null;
  showDialog(contact ? '거래처 정보 수정' : '새 거래처 추가', `<form><label class="form-field">거래처명<input name="name" required maxlength="50" value="${escapeHTML(contact?.name || '')}" placeholder="가상 거래처명"></label><div class="form-row"><label class="form-field">담당자<input name="person" required maxlength="30" value="${escapeHTML(contact?.person || '')}" placeholder="가상 담당자"></label><label class="form-field">연락처 (가상)<input name="phone" type="tel" required maxlength="30" value="${escapeHTML(contact?.phone || '')}" placeholder="02-000-0000"></label></div><label class="form-field">업종<input name="industry" maxlength="50" value="${escapeHTML(contact?.industry || '')}" placeholder="예: 디자인 · 브랜딩"></label><div class="form-row"><label class="form-field">마지막 연락일<input type="date" name="last" max="${today}" value="${contact?.last || ''}"></label><label class="form-field">다음 연락 예정일<input type="date" name="next" value="${contact?.next || ''}"></label></div>${formActions(contact ? '변경 사항 저장' : '거래처 추가')}</form>`);
  bindDialogForm(data => {
    const values = { name: data.get('name').trim(), person: data.get('person').trim(), phone: data.get('phone').trim(), industry: data.get('industry').trim() || '기타', last: data.get('last'), next: data.get('next'), initial: data.get('name').trim().slice(0, 1) };
    if (contact) Object.assign(contact, values);
    else contacts.push({ id: Math.max(0, ...contacts.map(item => item.id)) + 1, color: 'blue', ...values });
    toast(contact ? '거래처 정보를 수정했습니다.' : '새 거래처가 추가되었습니다.');
  });
}
function showContactDetail(id) {
  const contact = contactById(id);
  const latest = history.filter(entry => entry.contactId === contact.id).sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)[0];
  const pending = tasks.filter(task => task.contactId === contact.id && !task.done);
  showDialog(contact.name, `<dl class="contact-details"><dt>담당자</dt><dd>${escapeHTML(contact.person)}</dd><dt>연락처 (가상)</dt><dd>${escapeHTML(contact.phone)}</dd><dt>마지막 연락</dt><dd>${contact.last ? displayDate(contact.last) : '내역 없음'}</dd><dt>다음 연락</dt><dd>${contact.next ? displayDate(contact.next) : '미정'}</dd><dt>남은 업무</dt><dd>${pending.length}건</dd></dl>
    <div class="detail-summary"><h3>최근 연락 및 후속 조치 요약</h3><p>${latest ? escapeHTML(latest.summary) : '아직 기록된 연락이 없습니다.'}</p>${latest?.followUp ? `<p style="margin-top:10px">후속 조치 · ${escapeHTML(latest.followUp)}</p>` : ''}</div><div class="detail-actions"><button class="secondary-button" id="edit-contact">정보 수정</button><button class="secondary-button" id="detail-history">전체 연락 내역</button><button class="primary-button" id="record-contact">${icon('plus')}연락 기록</button></div>`);
  document.getElementById('edit-contact').onclick = () => showContactForm(id);
  document.getElementById('record-contact').onclick = () => showHistoryForm(id);
  document.getElementById('detail-history').onclick = () => {
    state.historyContact = String(id);
    dialog.close();
    if (location.hash === '#history') render();
    else location.hash = 'history';
  };
}
function showHistoryForm(contactId = '') {
  showDialog('연락 내역 기록', `<form><label class="form-field">거래처<select name="contactId" required>${contactOptions(contactId)}</select></label><div class="form-row"><label class="form-field">연락일<input type="date" name="date" required max="${today}" value="${today}"></label><label class="form-field">연락 방법<select name="method"><option>전화</option><option>이메일</option><option>미팅</option><option>메신저</option></select></label></div><label class="form-field">대화 요약<textarea name="summary" required maxlength="1000" placeholder="어떤 이야기를 나누었나요?"></textarea></label><label class="form-field">후속 조치<input name="followUp" maxlength="100" placeholder="다음에 해야 할 일"></label><label class="form-field">다음 연락 예정일<input type="date" name="next"></label><p class="form-hint">후속 조치와 다음 연락일을 모두 입력하면 업무가 자동으로 추가됩니다.</p>${formActions('연락 기록 저장')}</form>`);
  bindDialogForm(data => {
    const id = Number(data.get('contactId'));
    history.push({ id: Math.max(0, ...history.map(entry => entry.id)) + 1, contactId: id, date: data.get('date'), method: data.get('method'), summary: data.get('summary').trim(), followUp: data.get('followUp').trim() });
    const contact = contactById(id);
    if (!contact.last || data.get('date') > contact.last) contact.last = data.get('date');
    if (data.get('next')) contact.next = data.get('next');
    if (data.get('next') && data.get('followUp').trim()) {
      tasks.push({ id: Math.max(0, ...tasks.map(task => task.id)) + 1, title: data.get('followUp').trim(), contactId: id, due: data.get('next'), time: '10:00', priority: 'normal', done: false });
    }
    toast('연락 내역과 후속 조치를 기록했습니다.');
  });
}
// 비밀번호를 저장하지 않고 키를 유도합니다. 암호화 결과도 현재 탭에만 존재합니다.
async function deriveKey(password, salt) {
  const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 310000, hash: 'SHA-256' }, material, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
function lockVault(update = true) {
  vault.key = null;
  vault.text = '';
  vault.locked = true;
  clearTimeout(vaultTimer);
  if (update && state.page === 'vault') render();
}
async function unlockVault(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const error = document.getElementById('vault-error');
  if (!globalThis.crypto?.subtle) { error.textContent = '암호화 기능은 HTTPS 또는 localhost에서만 사용할 수 있습니다.'; return; }
  const data = new FormData(form);
  if (!vault.ciphertext && data.get('password') !== data.get('confirm')) { error.textContent = '비밀번호가 일치하지 않습니다.'; return; }
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = '안전하게 확인 중…';
  try {
    const salt = vault.salt || crypto.getRandomValues(new Uint8Array(16));
    const key = await deriveKey(data.get('password'), salt);
    let text = '';
    let ciphertext = vault.ciphertext;
    let iv = vault.iv;
    if (ciphertext) text = new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext));
    else {
      iv = crypto.getRandomValues(new Uint8Array(12));
      ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(''));
    }
    // 암호화 중 메뉴가 바뀌었거나 폼이 교체되면 보관함을 열지 않습니다.
    if (state.page !== 'vault' || !form.isConnected || document.hidden) return;
    vault = { salt, iv, ciphertext, key, text, locked: false };
    form.reset();
    vaultTimer = setTimeout(() => { lockVault(); toast('보관함이 자동으로 잠겼습니다.'); }, 5 * 60 * 1000);
    render();
    toast('보관함이 열렸습니다.');
  } catch {
    if (form.isConnected) error.textContent = '비밀번호가 올바르지 않거나 보관함을 열 수 없습니다.';
  } finally {
    button.disabled = false;
    button.textContent = vault.ciphertext ? '보관함 잠금 해제' : '비밀번호 설정하고 시작하기';
  }
}
async function saveVault(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const key = vault.key;
  const text = new FormData(form).get('note');
  const button = form.querySelector('[type="submit"]');
  button.disabled = true;
  try {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(text));
    if (vault.locked || vault.key !== key || !form.isConnected) return;
    vault.iv = iv;
    vault.ciphertext = ciphertext;
    vault.text = text;
    toast('메모를 암호화하여 저장했습니다.');
  } catch { toast('메모를 저장하지 못했습니다. 다시 시도해 주세요.'); }
  finally { button.disabled = false; }
}
function bindPage() {
  main.querySelectorAll('[data-toggle-task]').forEach(button => button.onclick = () => {
    const task = tasks.find(item => item.id === Number(button.dataset.toggleTask));
    task.done = !task.done;
    render();
    toast(task.done ? '업무를 완료했습니다. 수고하셨어요!' : '해야 할 업무로 되돌렸습니다.');
  });
  main.querySelectorAll('[data-task-tab]').forEach(button => button.onclick = () => { state.taskTab = button.dataset.taskTab; render(); });
  main.querySelectorAll('[data-add-task]').forEach(button => button.onclick = () => showTaskForm());
  main.querySelectorAll('[data-add-contact]').forEach(button => button.onclick = () => showContactForm());
  main.querySelectorAll('[data-contact-detail]').forEach(button => button.onclick = () => showContactDetail(button.dataset.contactDetail));
  main.querySelectorAll('[data-add-history]').forEach(button => button.onclick = () => showHistoryForm());
  main.querySelectorAll('[data-schedule-day]').forEach(button => button.onclick = () => { state.scheduleDay = button.dataset.scheduleDay; render(); });
  document.getElementById('contact-search')?.addEventListener('input', event => {
    state.contactSearch = event.target.value;
    document.getElementById('contact-grid').innerHTML = contactCards();
    main.querySelectorAll('[data-contact-detail]').forEach(button => button.onclick = () => showContactDetail(button.dataset.contactDetail));
  });
  document.getElementById('task-search')?.addEventListener('input', event => {
    state.taskSearch = event.target.value;
    updateTaskList();
  });
  document.getElementById('priority-filter')?.addEventListener('change', event => { state.priority = event.target.value; updateTaskList(); });
  document.getElementById('history-filter')?.addEventListener('change', event => {
    state.historyContact = event.target.value;
    document.getElementById('history-list').innerHTML = historyRows();
  });
  document.getElementById('vault-unlock-form')?.addEventListener('submit', unlockVault);
  document.getElementById('vault-note-form')?.addEventListener('submit', saveVault);
  document.getElementById('lock-vault')?.addEventListener('click', () => { lockVault(); toast('보관함을 잠갔습니다.'); });
}
function updateTaskList() {
  document.getElementById('task-list').innerHTML = taskRows(false);
  main.querySelectorAll('[data-toggle-task]').forEach(button => button.onclick = () => {
    const task = tasks.find(item => item.id === Number(button.dataset.toggleTask));
    task.done = !task.done;
    render();
    toast(task.done ? '업무를 완료했습니다.' : '해야 할 업무로 되돌렸습니다.');
  });
}
document.getElementById('close-dialog').onclick = () => dialog.close();
document.getElementById('menu-button').onclick = () => {
  const open = document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar').inert = !open;
  document.getElementById('mobile-backdrop').hidden = !open;
  document.getElementById('menu-button').setAttribute('aria-expanded', String(open));
};
document.getElementById('mobile-backdrop').onclick = closeMobileMenu;
window.matchMedia('(max-width: 760px)').addEventListener('change', closeMobileMenu);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMobileMenu(); });
document.getElementById('notification-button').onclick = () => toast(`오늘 확인할 업무 ${pendingToday().length}건 · 긴급 ${pendingToday().filter(task => task.priority === 'urgent').length}건`);
document.getElementById('help-button').onclick = () => showDialog('연락톡 이용 안내', `<p class="form-hint">연락톡은 가상 데이터를 사용하는 업무 관리 데모입니다.</p><div class="detail-summary"><h3>이렇게 사용해 보세요</h3><p>1. 거래처 관리에서 가상의 거래처를 추가하거나 수정하세요.<br>2. 업무를 추가하고 우선순위와 예정일을 설정하세요.<br>3. 체크 버튼을 눌러 업무를 완료하세요.<br>4. 연락 기록에 후속 조치와 다음 연락일을 입력하면 업무가 자동으로 만들어집니다.<br>5. 비밀 보관함에서 데모용 비밀번호와 메모를 사용하세요.</p></div><p class="form-hint">입력 데이터는 서버나 브라우저 저장소에 저장하지 않습니다. 새로고침하면 초기화됩니다. AI 브리핑은 일정 기반 로컬 데모이며 외부 AI 서비스는 사용하지 않습니다.</p>`);
document.addEventListener('visibilitychange', () => { if (document.hidden) lockVault(); });
window.addEventListener('hashchange', navigate);
hydrateIcons();
navigate();
