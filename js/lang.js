const translations = {
    ko: {
		// 네비게이션
		nav: {
			home: "홈",
			status: "신청현황",
			login: "시작하기",
			logout: "로그아웃"
		},

		// 홈 화면
		home: {
			headline: "나만의 아바타를<br>더욱 특별하게.",
			subheadline: "VRC 아바타 커미션 - 나만의 아바타를 귀여운 SD 캐릭터로.",
			applyBtn: "커미션 신청하기",
			statusBtn: "현황 조회",
			discordLabel: "실시간 문의 및 소식",
			discordServer: "디스코드 서버",

			slotTitle: "현재 슬롯",
			availabilityTitle: "신청 가능 여부",
			processTimeTitle: "평균 소요 기간",
			processTimeValue: "7일 이내"
		},

		// 로그인 페이지
		login: {
			title: "로그인이 필요합니다",
			desc: "진행 상황 알림을 위해 디스코드 로그인을 사용합니다.",
			discordLoginBtn: "디스코드로 계속하기"
		},

		// 신청 폼
		form: {
			title: "커미션 신청서 작성",

			commissionTypeLabel: "커미션 타입",
			commissionTypePlaceholder: "타입을 선택해주세요",

			typeA: "A타입 (3등신)",
			typeB: "B타입 (2등신)",
			price: "20,000원",

			referenceImageLabel: "참고 이미지 (최대 4장)",
			addPhoto: "사진 추가",

			submitBtn: "신청서 제출하기"
		},

		// 신청 현황
		status: {
			title: "내 커미션 현황",
			inProgress: "커미션 진행 중",
			activeCount: "현재 <span id='item-count' class='text-indigo-600 font-bold'>0</span>개 활성화",
			empty: "신청 내역이 없습니다.",

			syncBar: "원활한 커미션 진행을 위해 <span class='text-indigo-500 font-semibold'>디스코드 서버 참여</span>와 <span class='text-indigo-500 font-semibold'>동기화</span>를 진행해 주세요.",
			syncBtn: "디스코드 동기화하기"
		},

		// 결제 모달
		payment: {
			title: "결제 안내",
			desc: "아래 계좌로 입금해 주시면 확인 후 작업이 시작됩니다.",

			bank: "은행명",
			account: "계좌번호",
			holder: "예금주",

			confirmBtn: "확인했습니다",
			notice: "입금 후 디스코드 서버에 메시지를 남겨주시면 확인 후 상태가 \"대기중\"으로 변경됩니다."
		},

		// QR 결제
		qr: {
			title: "QR 코드로 간편 송금",
			desc: "카메라로 스캔하면 바로 연결됩니다.",
			toss: "토스"
		},

		// 디스코드 안내 모달
		discordModal: {
			title: "잠깐만요! 📢",
			desc: "디스코드 서버에 먼저 <span class='text-indigo-600 font-bold underline text-base'>합류한 상태</span>여야 진행이 가능합니다. 이미 서버에 계신가요?",
			inquiry: "만약 동기화가 잘 진행되지 않는다면 <span class='font-medium text-slate-500'>@administrator</span>에게 문의해 주세요.",

			confirmBtn: "네, 확인했습니다!",
			laterBtn: "나중에 할게요"
		},

		//커미션 스테이터스
		commissionStatus: {
			paymentCheck: "결제수단 보기",
			orderDate: "신청일"
		}
	},
    en: {
		// Navigation
		nav: {
			home: "Home",
			status: "Status",
			login: "Get Started",
			logout: "Logout"
		},

		// Home Screen
		home: {
			headline: "Make your avatar<br>even more special.",
			subheadline: "VRC Avatar Commission - Turn your avatar into a cute SD character.",
			applyBtn: "Order Commission",
			statusBtn: "Check Status",
			discordLabel: "Live Updates & Support",
			discordServer: "Discord Server",

			slotTitle: "Current Slots",
			availabilityTitle: "Availability",
			processTimeTitle: "Average Turnaround",
			processTimeValue: "Within 7 days"
		},

		// Login Page
		login: {
			title: "Login Required",
			desc: "We use Discord login to provide notifications regarding your progress.",
			discordLoginBtn: "Continue with Discord"
		},

		// Commission Form
		form: {
			title: "Submit Commission",

			commissionTypeLabel: "Commission Type",
			commissionTypePlaceholder: "Please select a type",

			typeA: "Type A (3-Headed SD)",
			typeB: "Type B (2-Headed SD)",
			price: "20,000 KRW",

			referenceImageLabel: "Reference Images (Max 4)",
			addPhoto: "Add Photo",

			submitBtn: "Submit Application"
		},

		// Application Status
		status: {
			title: "My Commissions",
			inProgress: "Commission in Progress",
			activeCount: "<span id='item-count' class='text-indigo-600 font-bold'>0</span> active project(s)",
			empty: "No commission history found.",

			syncBar: "Please <span class='text-indigo-500 font-semibold'>Join our Discord</span> and <span class='text-indigo-500 font-semibold'>Sync</span> for a smooth process.",
			syncBtn: "Sync Discord"
		},

		// Payment Modal
		payment: {
			title: "Payment Information",
			desc: "Work begins once the deposit to the account below is confirmed.",

			bank: "Bank",
			account: "Account Number",
			holder: "Account Holder",

			confirmBtn: "I understand",
			notice: "After depositing, please leave a message on the Discord server. Status will change to \"Waiting\" after verification."
		},

		// QR Payment
		qr: {
			title: "Quick Transfer via QR",
			desc: "Scan with your camera to open the payment link.",
			toss: "Toss"
		},

		// Discord Notice Modal
		discordModal: {
			title: "Wait a moment! 📢",
			desc: "You must <span class='text-indigo-600 font-bold underline text-base'>join our Discord server</span> first to proceed. Are you already a member?",
			inquiry: "If synchronization is not working, please contact <span class='font-medium text-slate-500'>@administrator</span>.",

			confirmBtn: "Yes, I'm in!",
			laterBtn: "Maybe later"
		},

		commissionStatus: {
			paymentCheck: "View Payment Methods",
			orderDate: "Order Date"
		}
	},
	ja: {
		// ナビゲーション
		nav: {
			home: "ホーム",
			status: "予約状況",
			login: "はじめる",
			logout: "ログアウト"
		},

		// ホーム画面
		home: {
			headline: "あなたのアバターを<br>もっと特別に。",
			subheadline: "VRCアバター依頼 - あなたのアバターを可愛いSDキャラに。",
			applyBtn: "依頼を申し込む",
			statusBtn: "状況を確認",
			discordLabel: "リアルタイムお問い合わせ",
			discordServer: "Discordサーバー",

			slotTitle: "現在の枠",
			availabilityTitle: "受付状況",
			processTimeTitle: "平均所要期間",
			processTimeValue: "7日以内"
		},

		// ログインページ
		login: {
			title: "ログインが必要です",
			desc: "進行状況の通知のため、Discordログインを使用します。",
			discordLoginBtn: "Discordで続ける"
		},

		// 依頼フォーム
		form: {
			title: "依頼申込書の作成",

			commissionTypeLabel: "依頼タイプ",
			commissionTypePlaceholder: "タイプを選択してください",

			typeA: "Aタイプ (3頭身)",
			typeB: "Bタイプ (2頭身)",
			price: "20,000ウォン",

			referenceImageLabel: "参考画像 (最大4枚)",
			addPhoto: "写真を追加",

			submitBtn: "申込書を提出する"
		},

		// 依頼状況
		status: {
			title: "自分の依頼状況",
			inProgress: "依頼進行中",
			activeCount: "現在 <span id='item-count' class='text-indigo-600 font-bold'>0</span>件 進行中",
			empty: "申し込み履歴がありません。",

			syncBar: "スムーズな進行のため、<span class='text-indigo-500 font-semibold'>Discordサーバーへの参加</span>と<span class='text-indigo-500 font-semibold'>同期</span>を行ってください。",
			syncBtn: "Discord同期"
		},

		// 決済モーダル
		payment: {
			title: "お支払い案内",
			desc: "以下の口座にお振込みいただければ、確認後に作業を開始いたします。",

			bank: "銀行名",
			account: "口座番号",
			holder: "名義人",

			confirmBtn: "確認しました",
			notice: "お振込み後、Discordサーバーにてご連絡ください。確認後、ステータスが「待機中」に変更されます。"
		},

		// QR決済
		qr: {
			title: "QRコードで簡単送金",
			desc: "カメラでスキャンするとすぐに接続されます。",
			toss: "Toss"
		},

		// Discord案内モーダル
		discordModal: {
			title: "ちょっと待ってください！ 📢",
			desc: "先にDiscordサーバーに<span class='text-indigo-600 font-bold underline text-base'>参加している状態</span>である必要があります。すでに参加されていますか？",
			inquiry: "同期がうまく行かない場合は、<span class='font-medium text-slate-500'>@administrator</span>までお問い合わせください。",

			confirmBtn: "はい、確認しました！",
			laterBtn: "後で設定する"
		},

		commissionStatus: {
			paymentCheck: "お支払い方法を確認",
			orderDate: "依頼日"
		}
	}
};

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
        const path = el.getAttribute('data-i18n'); // "home.headline"
        
        // 🚀 2중 구조 해석 로직
        // path를 '.' 기준으로 나누어 객체 안으로 타고 들어갑니다.
        const translation = path.split('.').reduce((obj, key) => {
            return obj && obj[key];
        }, translations[lang]);

        if (translation) {
            // HTML 태그(<br>, <span> 등)가 포함될 수 있으므로 innerHTML 사용
            el.innerHTML = translation;
        }
    });

    // 언어 설정 저장 및 방향성(RTL 등) 대응 (선택사항)
    document.documentElement.lang = lang;
    localStorage.setItem('preferred-lang', lang);
}


function toggleLangDropdown() {
    const dropdown = document.getElementById('lang-dropdown');
    dropdown.classList.toggle('hidden');
}

// 2. 언어 변경 및 드롭다운 닫기
function changeLang(lang) {
    // 이전에 만든 setLanguage 함수 호출
    setLanguage(lang);
    
    // 현재 표시 언어 텍스트 업데이트
    document.getElementById('current-lang-text').innerText = lang === 'ja' ? 'JP' : lang.toUpperCase();
    
    // 드롭다운 닫기
    document.getElementById('lang-dropdown').classList.add('hidden');
}

// 3. 외부 클릭 시 드롭다운 닫기 (사용자 편의성)
window.addEventListener('click', function(e) {
    const container = document.getElementById('lang-dropdown-container');
    const dropdown = document.getElementById('lang-dropdown');
    if (!container.contains(e.target)) {
        dropdown.classList.add('hidden');
    }
});