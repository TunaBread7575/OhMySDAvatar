import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function initAnnouncement() {
    const bar = document.getElementById('announcement-bar');
	const iconBack = document.getElementById('icon-background');
    const textEl = document.getElementById('announcement-text');

    const announceRef = doc(db, "status", "vyVgDB8Y4PFoFNHaZyNS");

    // 실시간 감시 (운영자가 DB 수정하면 즉시 바뀜)
    onSnapshot(announceRef, (doc) => {
        if (doc.exists()) {
            const data = doc.data();
            
            if (data.announcementType > 0) {
                textEl.innerText = data.announcement;
                
				// 1. 기존 배경색 클래스들 초기화 (중요)
                bar.classList.remove('bg-gray-900', 'bg-red-500', 'bg-blue-500', 'bg-amber-500');
				iconBack.classList.remove('bg-white/20', 'bg-sky-400', 'bg-white/30', 'bg-indigo-500');

                // 2. 타입에 맞춰 배경색 지정
                var bgColor = 'bg-gray-900'; // 기본값 (일반)
				var ibgColor = 'bg-indigo-500'; // 기본값 (일반)

				switch(data.announcementType)
				{
					case 2:	bgColor = 'bg-blue-500'; ibgColor = 'bg-sky-400'; break;  // 정보/업데이트
					case 3:	bgColor = 'bg-amber-500'; ibgColor = 'bg-white/30'; break; // 주의/점검예정
                    case 4:	bgColor = 'bg-red-500'; ibgColor = 'bg-white/20'; break;   // 긴급/중단
                }

				iconBack.classList.add(ibgColor);
				bar.classList.add(bgColor);
				bar.classList.add('announcement-active');
                setTimeout(closeAnnouncement, 10000);
            } else {
                closeAnnouncement();
            }
        }
    });
}

// 공지 닫기 함수
window.closeAnnouncement = function() {
    const bar = document.getElementById('announcement-bar');
    bar.classList.remove('announcement-active');
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', initAnnouncement);