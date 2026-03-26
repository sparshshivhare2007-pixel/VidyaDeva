let currentPhone = '';

document.getElementById('sendOtpBtn').addEventListener('click', async () => {
    const phone = document.getElementById('phone').value;
    
    if (!phone || phone.length !== 10) {
        showMessage('Please enter a valid 10-digit mobile number', 'error');
        return;
    }
    
    currentPhone = phone;
    
    const btn = document.getElementById('sendOtpBtn');
    const btnText = btn.querySelector('span');
    const btnLoader = btn.querySelector('.btn-loader');
    
    btn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    
    try {
        const response = await fetch('http://localhost:5000/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage('OTP sent to your WhatsApp number', 'success');
            
            document.getElementById('otpSection').style.display = 'block';
            document.getElementById('sendOtpBtn').style.display = 'none';
            document.getElementById('verifyBtn').style.display = 'block';
        } else {
            showMessage(data.message || 'Failed to send OTP', 'error');
        }
    } catch (error) {
        showMessage('Network error. Please try again.', 'error');
    } finally {
        btn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
});

document.getElementById('verifyBtn').addEventListener('click', async () => {
    const otp = document.getElementById('otp').value;
    
    if (!otp || otp.length !== 6) {
        showMessage('Please enter the 6-digit OTP', 'error');
        return;
    }
    
    const btn = document.getElementById('verifyBtn');
    const btnText = btn.querySelector('span');
    const btnLoader = btn.querySelector('.btn-loader');
    
    btn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    
    try {
        const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: currentPhone, otp })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage('Login successful! Redirecting...', 'success');
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            showMessage(data.message || 'Invalid OTP', 'error');
        }
    } catch (error) {
        showMessage('Network error. Please try again.', 'error');
    } finally {
        btn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
});

function showMessage(msg, type) {
    const msgDiv = document.getElementById('message');
    msgDiv.textContent = msg;
    msgDiv.className = `message ${type}`;
    
    setTimeout(() => {
        msgDiv.className = 'message';
        msgDiv.textContent = '';
    }, 5000);
}
