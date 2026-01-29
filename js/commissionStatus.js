async function RequestCommissionDB()
{
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
					renderStatusList(result.header.db);
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
function renderStatusList(DBdata) {
    const statusListContainer = document.getElementById('status-list');
   
        if (DBdata.empty) {
            return;
        }

        // 2. 카드 생성
        let html = '';
        DBdata.forEach((data) => {
			const statusStyle = getStatusDesign(data.status); // 상태별 색상 함수

			html += `
				<div class="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
					<div class="flex items-center gap-4">
						<div class="w-12 h-12 ${statusStyle.bgColor} rounded-2xl flex items-center justify-center text-xl">
							${statusStyle.icon}
						</div>
						<div>
							<div class="text-xs text-gray-400 font-mono mb-1">#${doc.id.slice(0, 8).toUpperCase()}</div>
							<h3 class="font-bold text-gray-800 text-lg">${data.type || 'SD 커미션'}</h3>
						</div>
					</div>
						
					<div class="flex items-center gap-6 justify-between md:justify-end">
						<div class="text-right">
							<div class="text-xs text-gray-400 mb-1">신청일</div>
							<div class="text-sm font-medium text-gray-600">${data.createdAt?.toDate().toLocaleDateString() || '-'}</div>
						</div>
						<div class="${statusStyle.badgeColor} px-4 py-2 rounded-xl text-sm font-bold">
							${data.statusText || '대기 중'}
						</div>
					</div>
				</div>
			`;
    	});
    statusListContainer.innerHTML = html;
}

// 상태별 디자인 정의 (내 마음대로 커스텀 가능)
function getStatusDesign(status) {
    const styles = {
        0: { bgColor: 'bg-gray-100', badgeColor: 'bg-gray-100 text-gray-500', icon: '⏳' },
        1: { bgColor: 'bg-indigo-100', badgeColor: 'bg-indigo-100 text-indigo-600', icon: '🎨' },
        2: { bgColor: 'bg-emerald-100', badgeColor: 'bg-emerald-100 text-emerald-600', icon: '✅' },
        3: { bgColor: 'bg-red-100', badgeColor: 'bg-red-100 text-red-600', icon: '❌' }
    };
    return styles[status] || styles[0];
}