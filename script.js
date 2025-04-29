document.addEventListener('DOMContentLoaded', () => {
    const cardSection = document.getElementById('card-section');
    const steps = cardSection.querySelectorAll('.step');
    const searchInput = document.getElementById('search-input'); // 검색창 요소
    const dropdownMenu = document.getElementById('step-dropdown'); // 드롭다운 메뉴 요소

    console.log('Total steps found:', steps.length);

    let currentStepIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    if (!cardSection || steps.length === 0) {
        console.error('Card section or steps not found!');
        return;
    }

    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle('active', i === index);
        });
        currentStepIndex = index;
    }

    function handleSwipe() {
        const swipeThreshold = 50; // 최소 스와이프 거리 (px)
        const swipeDistance = touchStartX - touchEndX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // 왼쪽으로 스와이프 (다음 단계)
                if (currentStepIndex < steps.length - 1) {
                    showStep(currentStepIndex + 1);
                }
            } else {
                // 오른쪽으로 스와이프 (이전 단계)
                if (currentStepIndex > 0) {
                    showStep(currentStepIndex - 1);
                }
            }
        }
    }

    cardSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    cardSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    // --- 검색 드롭다운 로직 추가 ---
    if (searchInput && dropdownMenu) {
        // 검색창 포커스 시 드롭다운 보이기
        searchInput.addEventListener('focus', () => {
            dropdownMenu.classList.add('active');
        });

        // 검색창 포커스 아웃 시 드롭다운 숨기기 (약간의 딜레이 후)
        searchInput.addEventListener('blur', () => {
            // 링크 클릭 이벤트를 처리할 시간을 벌기 위해 setTimeout 사용
            setTimeout(() => {
                dropdownMenu.classList.remove('active');
            }, 150); // 150ms 딜레이
        });

        // 드롭다운 메뉴 항목 클릭 시 해당 단계로 이동
        dropdownMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                e.preventDefault(); // 기본 링크 이동 방지
                const targetIndex = parseInt(e.target.dataset.stepIndex, 10);
                if (!isNaN(targetIndex) && targetIndex >= 0 && targetIndex < steps.length) {
                    showStep(targetIndex);
                    dropdownMenu.classList.remove('active'); // 드롭다운 숨기기
                    // searchInput.blur(); // 선택 후 포커스 제거 (선택 사항)
                }
            }
        });
    }
    // --- 검색 드롭다운 로직 끝 ---

    // 초기 단계 표시 (이미 CSS로 처리됨)
    // showStep(currentStepIndex);
}); 