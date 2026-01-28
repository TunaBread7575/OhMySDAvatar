let selectedImages = [null, null, null, null];

async function previewImg(index) {
    const file = document.getElementById(`img-${index}`).files[0];
    if (!file) return;

    // 로딩 표시 (선택 사항)
    const preview = document.getElementById(`preview-${index}`);
    preview.innerHTML = `<span class="text-xs text-indigo-600">압축 중...</span>`;

    try {
        // 1200px 너비, 화질 0.7(70%)로 압축
        const compressedBase64 = await compressImage(file, 1920, 0.9);
        
        // 미리보기 화면 업데이트
        preview.innerHTML = `<img src="${compressedBase64}" class="w-full h-full object-cover">`;
        
        // 전송용 배열에 저장
        selectedImages[index] = compressedBase64;
    } catch (error) {
        console.error("이미지 처리 실패:", error);
        alert("이미지 처리 중 오류가 발생했습니다.");
    }
}

const CONFIG = {
    GAS_URL: "https://script.google.com/macros/s/AKfycbwUU3-AstFdjuKGIT8N9sUT2UxXAWs2hearTmSvhnBlQJGinNW-wfpkNVdDi1E3FGQ2jQ/exec",
    DISCORD_CLIENT_ID: "1465944562576130184",
    REDIRECT_URI: window.location.origin + window.location.pathname,
	OAuth2Scopes: "identify"
};

        // --- 페이지 전환 로직 ---
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.getElementById(pageId + '-page').classList.add('active');
    window.scrollTo(0,0);
}

function checkAuthAndGo(pageId) {
    if (localStorage.getItem('discord_token')) showPage(pageId);
    else showPage('login');
}

        // --- 인증 로직 ---
function loginDiscord() {
    const url = `https://discord.com/api/oauth2/authorize?client_id=${CONFIG.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(CONFIG.REDIRECT_URI)}&response_type=token&scope=${CONFIG.OAuth2Scopes}`;
    location.href = url;
}

function handleAuthCallback() {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const token = fragment.get('access_token');
    if (token) {
        localStorage.setItem('discord_token', token);
        history.replaceState(null, null, ' '); // URL에서 토큰 제거
        fetchUserInfo(token);
    } else {
        const storedToken = localStorage.getItem('discord_token');
        if (storedToken) fetchUserInfo(storedToken);
    }
}

async function fetchUserInfo(token) {
    const res = await fetch("https://discord.com/api/users/@me", {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
        const user = await res.json();
        document.getElementById('user-profile').classList.remove('hidden');
        document.getElementById('nav-login-btn').classList.add('hidden');
        document.getElementById('user-name').innerText = user.username;
        document.getElementById('user-avatar').src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        localStorage.setItem('discord_id', user.id);
    } else {
        logout();
    }
}

function logout() {
    localStorage.clear();
    location.reload();
}

        // --- 데이터 전송 및 조회 ---
async function submitForm() {
	for(var i = 0; i < selectedImages.length; i++)
	{
		if(!selectedImages[i])
		{
			alert("사진을 전부 채워주세요!");
			return;
		}
	}
	const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.innerText = "처리 중...";
	
	grecaptcha.ready(function() {
    grecaptcha.execute('6LfFRFksAAAAACKLSrNr7a8XB8g0wDXAj2bpBTX9', {action: 'submit'}).then(async function(token) {
    const payload = {
		recaptchaToken: token,
        accessToken: localStorage.getItem('discord_token'),
    };
	const queryString = `?accessToken=${encodeURIComponent(payload.accessToken)}`;

    try {
		const res = await fetch(CONFIG.GAS_URL + queryString, {
			method: 'GET'
		});
        const result = await res.json();
        if (result.status == 200) {
			alert(`신청 완료! 신청ID: ${result.id}`);
			sendToDiscord(result.id, selectedImages, token);
			//checkAuthAndGo('status');
		} else if(result.status == 400) {
			alert(`신청 실패. ${result.message}`);
        } else {
            throw new Error(result.message);
        }
    } catch (e) {
		console.log(queryString);
        alert("제출 실패: 나중에 다시 시도해주세요.",e);
    } finally {
        btn.disabled = false;
        btn.innerText = "신청서 제출하기";
    }
	});
	});
}

async function sendToDiscord(id, base64Data, token) {
	try {
		const response = await fetch(CONFIG.GAS_URL, {
			method: 'POST',
			body: JSON.stringify({
				image: base64Data,
				fileName: fileName,
				commissionId: id,
				userName: user.username,
				accessToken: localStorage.getItem('discord_token'),
				recaptchaToken: token,
			})
		});
		return ContentService.createTextOutput(JSON.stringify({
		status: "success",
		message: "데이터 전송 성공!"
		})).setMimeType(ContentService.MimeType.JSON);
	}catch(err){
		return ContentService.createTextOutput(JSON.stringify({
		status: "error",
		message: err.toString()
		})).setMimeType(ContentService.MimeType.JSON);
	}
}

// 초기화
window.onload = handleAuthCallback;