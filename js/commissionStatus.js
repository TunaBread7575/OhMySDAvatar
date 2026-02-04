async function RequestCommissionDB()
{
	
	showLoading();
	grecaptcha.ready(function() {
		grecaptcha.execute('6LfFRFksAAAAACKLSrNr7a8XB8g0wDXAj2bpBTX9', {action: 'submit'}).then(async function(token) {
			const payload = {
				requestType: 1, //DB Request
				recaptchaToken: token,
				accessToken: localStorage.getItem('discord_token')
			};
			const queryString = `?requestType=${encodeURIComponent(payload.requestType)}&recaptchaToken=${encodeURIComponent(payload.recaptchaToken)}&accessToken=${encodeURIComponent(payload.accessToken)}`;

			try {
				const res = await fetch(CONFIG.GAS_URL + queryString, {
					method: 'GET'
				});
				const result = await res.json();
				if (result.header.status == 200) {
					renderStatusList(result.db);
				} else if(result.header.status == 401) {
					alert(`불러오기 실패. ${result.header.message}`);
				} else {
					throw new Error(result.header.message);
				}
			} catch (e) {
				alert("불러오기 실패: 나중에 다시 시도해주세요.",e);
			}
		});
	});
	
}

function showLoading() {
    const container = document.getElementById('status-list');
    const skeletonHTML = `
        <div class="animate-pulse space-y-4">
            ${[1, 2, 3].map(() => `
                <div class="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="flex items-center gap-4 w-full">
                        <div class="w-12 h-12 bg-gray-200 rounded-2xl shrink-0"></div>
                        <div class="flex-1 space-y-2">
                            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div class="h-3 bg-gray-100 rounded w-1/2"></div>
                        </div>
                    </div>
                    <div class="h-10 bg-gray-100 rounded-xl w-24"></div>
                </div>
            `).join('')}
        </div>
    `;
    container.innerHTML = skeletonHTML;
}

function renderStatusList(DBdata) {
	const cleanList = DBdata.map(item => {
    const f = item.fields;
    return {
        commissionId: f.commissionId?.stringValue || "", 
        discordId: f.discordId?.stringValue || "",
		commissionType: f.commissionType?.stringValue || "",
        discordName: f.discordName?.stringValue || "Unknown",
        date: f.date?.stringValue || "",
        status: Number(f.status?.integerValue || 0) 
    };
});
    const statusListContainer = document.getElementById('status-list');
   
        if (cleanList.size) {
			statusListContainer.innerHTML = `<div id="status-list" class="space-y-4">
                <div class="bg-white border border-gray-200 rounded-2xl p-6 text-center text-gray-500">
                    신청 내역이 없습니다.
                </div>
            </div>`;
            return;
        }

		var itemcount = 0;

        // 2. 카드 생성
        let html = '';
        cleanList.forEach((data) => {
			if(data.status > 0 && data.status < 3)
				itemcount++;

			const statusStyle = getStatusDesign(data.status); // 상태별 색상 함수

			const paymentButton = data.status === 0 
				? `<button onclick="openPaymentModal('${data.commissionId}')" 
						class="mt-2 md:mt-0 w-full md:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95">
						결제수단 보기
				</button>` 
				: '';

			html += `
				<div class="animate-fadeInUp bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
					<div class="flex items-center gap-4">
						<div class="w-12 h-12 ${statusStyle.bgColor} rounded-2xl flex items-center justify-center text-xl">
							${statusStyle.icon}
						</div>
						<div class="overflow-hidden">
							<h3 class="font-bold text-gray-800 text-lg leading-tight">${data.commissionType}</h3>
							<p class="text-[11px] text-gray-400 font-mono mt-0.5 opacity-80 truncate">
								${data.commissionId}
							</p>
						</div>
					</div>
						
					<div class="flex items-center gap-6 justify-between md:justify-end">
						<div class="text-right">
							<div class="text-xs text-gray-400 mb-1">신청일</div>
							<div class="text-sm font-medium text-gray-600">${data.date.substring(0,10)}</div>
						</div>
						<div class="${statusStyle.badgeColor} px-4 py-2 rounded-xl text-sm font-bold">
							${statusStyle.StatusText}
						</div>
						${paymentButton}
					</div>
				</div>
			`;
    	});
		
    statusListContainer.innerHTML = html;

	const statusBar = document.getElementById('status-bar');
	const itemCountSpan = document.getElementById('item-count');

	if (true/*itemcount > 0*/) {
		statusBar.classList.remove('hidden'); // 바 나타내기
		statusBar.classList.add('flex');     // 레이아웃 적용
		itemCountSpan.innerText = items.length; // 개수 업데이트
	} else {
		statusBar.classList.add('hidden');    // 데이터 없으면 숨김
	}
}

// 모달 열기
function openPaymentModal(orderId) {
    const modal = document.getElementById('qrModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    // 필요하다면 여기서 orderId를 활용해 금액 등을 동적으로 변경할 수 있습니다.
}

// 모달 닫기
function closePaymentModal() {
    const modal = document.getElementById('qrModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// 계좌번호 복사 함수
function copyAccount() {
    const account = document.getElementById('accountNumber').innerText;
    navigator.clipboard.writeText(account).then(() => {
        alert("계좌번호가 복사되었습니다!");
    });
}

// 배경 클릭 시 닫기
window.onclick = function(event) {
    const modal = document.getElementById('qrModal');
    if (event.target == modal) {
        closePaymentModal();
    }
}


function getStatusDesign(status) {
    const styles = {
        0: { StatusText: "입금 대기", bgColor: 'bg-slate-100', badgeColor: 'bg-slate-100 text-slate-500', icon: '⏳' },
        1: { StatusText: "대기중", bgColor: 'bg-amber-100', badgeColor: 'bg-amber-100 text-amber-700', icon: '⭕' },
        2: { StatusText: "작업중", bgColor: 'bg-indigo-100', badgeColor: 'bg-indigo-100 text-indigo-600', icon: '🎨' },
        3: { StatusText: "전달 대기", bgColor: 'bg-blue-100', badgeColor: 'bg-blue-100 text-blue-600', icon: '🚚' },
		4: { StatusText: "완료", bgColor: 'bg-emerald-100', badgeColor: 'bg-emerald-100 text-emerald-600', icon: '✅' }
    };
    return styles[status] || styles[0];
}