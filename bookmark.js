const Data = [
  {
    name: '자주 방문',
    sites: [
      { name: 'Google', url: 'https://www.google.com' },
      { name: 'YouTube', url: 'https://www.youtube.com' },
      { name: 'Naver', url: 'https://www.naver.com' },
    ]
  },
  {
    name: '개발',
    sites: [
      { name: 'GitHub', url: 'https://www.github.com' },
      { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
    ]
  }
];

let currentTargetGrid = null;

function createCategoryBox(categoryName, sites = []) {
  const box = document.createElement('div');
  box.className = 'category-box';

  box.innerHTML = `
    <div class="category-box-header">
      <span class="category-box-title">${categoryName}</span>
      <button class="delete-category-btn">🗑 카테고리 삭제</button>
    </div>
    <div class="site-grid"></div>
  `;

  const grid = box.querySelector('.site-grid');

  sites.forEach(site => addSiteCard(grid, site.name, site.url));

  const addBtn = document.createElement('button');
  addBtn.className = 'add-site-card';
  addBtn.innerHTML = `<span class="plus">+</span><span>추가</span>`;
  addBtn.addEventListener('click', () => {
    currentTargetGrid = grid;
    openBookmarkForm(grid);
  });
  grid.appendChild(addBtn);

  box.querySelector('.delete-category-btn').addEventListener('click', () => {
    if (confirm(`"${categoryName}" 카테고리를 삭제할까요?`)) {
      box.remove();
    }
  });

  return box;
}

function addSiteCard(grid, name, url) {
  let faviconUrl;
  try {
    const urlObj = new URL(url);
    faviconUrl = `${urlObj.origin}/favicon.ico`;
  } catch {
    faviconUrl = '';
  }

  const card = document.createElement('a');
  card.className = 'site-card';
  card.href = url;
  card.target = '_blank';
  card.innerHTML = `
    <button class="delete-site">✕</button>
    <img src="${faviconUrl}" alt="${name}" onerror="this.style.display='none'">
    <span class="site-name">${name}</span>
  `;

  card.querySelector('.delete-site').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    card.remove();
  });

  const addBtn = grid.querySelector('.add-site-card');
  if (addBtn) {
    grid.insertBefore(card, addBtn);
  } else {
    grid.appendChild(card);
  }
}

document.getElementById('addCategoryBtn').addEventListener('click', () => {
  const name = prompt('카테고리 이름을 입력하세요:');
  if (name && name.trim()) {
    const box = createCategoryBox(name.trim(), []);
    document.getElementById('categoryList').appendChild(box);
  }
});

function openBookmarkForm(grid) {
  currentTargetGrid = grid;
  document.getElementById('bookmarkName').value = '';
  document.getElementById('bookmarkUrl').value = '';
  document.getElementById('addBookmarkForm').classList.remove('hidden');
  document.getElementById('overlay').classList.remove('hidden');
  document.getElementById('bookmarkName').focus();
}

document.getElementById('confirmBookmarkBtn').addEventListener('click', () => {
  const name = document.getElementById('bookmarkName').value.trim();
  const url = document.getElementById('bookmarkUrl').value.trim();

  if (!name || !url) {
    alert('이름과 URL을 입력해주세요.');
    return;
  }

  if (currentTargetGrid) {
    addSiteCard(currentTargetGrid, name, url);
  }

  closeBookmarkForm();
});

document.getElementById('cancelBookmarkBtn').addEventListener('click', closeBookmarkForm);
document.getElementById('overlay').addEventListener('click', closeBookmarkForm);

function closeBookmarkForm() {
  document.getElementById('addBookmarkForm').classList.add('hidden');
  document.getElementById('overlay').classList.add('hidden');
  currentTargetGrid = null;
}

document.getElementById('bookmarkUrl').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('confirmBookmarkBtn').click();
});


const list = document.getElementById('categoryList');
Data.forEach(cat => {
  list.appendChild(createCategoryBox(cat.name, cat.sites));
});