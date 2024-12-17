document.addEventListener("DOMContentLoaded", function () {
    const flicking = new Flicking("#flick", {
        circular: true,
        bound: true
    });

    const portfolioSection = document.querySelector('#portfolio');
    const flickingItems = document.querySelectorAll('.flicking-item');

    flickingItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('yellow')) {  // 캡스톤 프로젝트 항목
                Promise.all([
                    fetch('pages/capstonePage.html'),
                    fetch('styles/capstonePage.css')
                ])
                .then(async ([htmlResponse, cssResponse]) => {
                    const html = await htmlResponse.text();
                    const css = await cssResponse.text();
                    
                    // CSS 스타일 적용
                    const styleElement = document.createElement('style');
                    styleElement.textContent = css;
                    document.head.appendChild(styleElement);
                    
                    // HTML 내용의 경로 수정
                    const modifiedHtml = html
                        .replace(/src="\.\.\/images\//g, 'src="images/')
                        .replace(/src="\.\.\/videos\//g, 'src="videos/');
                    
                    // 수정된 HTML 콘텐츠 적용
                    portfolioSection.innerHTML = modifiedHtml;

                    // 비디오 요소 재설정
                    const video = portfolioSection.querySelector('video');
                    if (video) {
                        video.load(); // 비디오 재로드
                    }

                    portfolioSection.scrollIntoView({ behavior: 'smooth' });
                })
                .catch(error => console.error('Error:', error));
            }
            else if (this.classList.contains('orange')) {  // 포트폴리오 페이지 항목
                Promise.all([
                    fetch('pages/portfolio.html'),
                    fetch('styles/portfolio.css')
                ])
                .then(async ([htmlResponse, cssResponse]) => {
                    const html = await htmlResponse.text();
                    const css = await cssResponse.text();
                    
                    const styleElement = document.createElement('style');
                    styleElement.textContent = css;
                    document.head.appendChild(styleElement);
                    
                    // 이미지 경로 수정 부분을 정규식으로 변경
                    const modifiedHtml = html.replace(/src="\.\.\/images\//g, 'src="images/');
                    portfolioSection.innerHTML = modifiedHtml;
                    portfolioSection.scrollIntoView({ behavior: 'smooth' });
                })
                .catch(error => console.error('Error:', error));
            }
            else if (this.classList.contains('pink')) {  // 깃허브 항목
                window.open('https://github.com/JseSeo?tab=repositories', '_blank');
            }
        });
    });
}); 