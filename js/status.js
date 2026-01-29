import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 상태를 감시할 엘리먼트들 (HTML에 해당 ID가 있어야 합니다)
const statusBadge = document.getElementById('status-badge');
const slotText = document.getElementById('slot-text');
const processTime = document.getElementById('process-time');
const applyBtn = document.getElementById('submit-btn');

onSnapshot(doc(db, "status", "vyVgDB8Y4PFoFNHaZyNS"), (docSnap) => {
    if (docSnap.exists()) {
        const data = docSnap.data();

		processTime.innerText = data.processTime;
        
        // 1. 슬롯 텍스트 업데이트 (0 / 5)
        slotText.innerText = `${data.currentSlot} / ${data.maxSlot}`;

        // 2. 신청 가능 여부 판단 (canApply가 true이고 슬롯이 남았을 때)
        const isAvailable = data.canApply && (data.currentSlot < data.maxSlot);
        if (isAvailable) {
            statusBadge.innerText = "신청 가능";
            statusBadge.className = "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold";
            applyBtn.disabled = false;
            applyBtn.innerText = "신청하기";
        } else {
            statusBadge.innerText = "신청 마감";
            statusBadge.className = "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold";
            applyBtn.disabled = true;
            applyBtn.innerText = "현재 신청할 수 없습니다";
        }
    }
});