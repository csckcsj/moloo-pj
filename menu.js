console.log('menu.js 파일이 로드되었습니다.');

const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu');

if (hamburgerMenu && menu) {
  console.log('삼선 버튼과 메뉴 요소를 찾았습니다.');

  hamburgerMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });

} else {
  console.error('삼선 버튼 또는 메뉴 요소를 찾을 수 없습니다.');
}

const h1 = document.querySelector('h1');
if (h1) {
  h1.addEventListener('click', (e) => {
    e.stopPropagation();
    window.location.href = 'index.html';
  });
}
