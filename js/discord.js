// 모달 열기 함수 (버튼의 onclick="openDiscordModal()" 로 연결)
function openDiscordModal() {
    const modal = document.getElementById('discord-modal');
    modal.classList.remove('hidden');
}

// 모달 닫기
function closeDiscordModal() {
    document.getElementById('discord-modal').classList.add('hidden');
}

// 확인 버튼 클릭 시 실제 동작
function confirmDiscordJoin() {
    // 1. 모달 닫기
    closeDiscordModal();
    
    // 2. 실제 디스코드 합류 로직 실행 (링크 이동 또는 다음 단계)
    console.log("디스코드 동기화 펑션 실행됨!");
    DiscordCommissionActivate(); 
}
async function DiscordCommissionActivate()
{
grecaptcha.ready(function() {
    grecaptcha.execute('6LfFRFksAAAAACKLSrNr7a8XB8g0wDXAj2bpBTX9', {action: 'submit'}).then(async function(token) {
		const payload = {
			recaptchaToken: token,
			accessToken: localStorage.getItem('discord_token')
		};
		const queryString = `?recaptchaToken=${encodeURIComponent(payload.recaptchaToken)}&commissionType=${encodeURIComponent(payload.commissionType)}&accessToken=${encodeURIComponent(payload.accessToken)}`;
			const res = await fetch(`https://script.google.com/macros/s/AKfycbyim2toAUVKaIi3cLPT-qYLjHGcQj_umsE8bsU0Q-c3xydx4ItrTM1NXjHZr8u90SqfMg/exec` + queryString, {
				method: 'GET'
			});
			const result = await res.json();
		});
	});
}
