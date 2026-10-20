// --- BÀI TẬP 1: TÌM KIẾM SẢN PHẨM ---
const products = [
    { id: 1, name: "Laptop ASUS ROG", price: "25.000.000đ" },
    { id: 2, name: "Bàn phím cơ AKKO", price: "1.500.000đ" },
    { id: 3, name: "Chuột Logitech G Pro", price: "2.200.000đ" },
    { id: 4, name: "Màn hình Dell UltraSharp", price: "8.900.000đ" },
    { id: 5, name: "Tai nghe Sony WH-1000XM5", price: "6.500.000đ" }
];

function renderProducts(list) {
    const container = document.getElementById('productList');
    const err = document.getElementById('errorMessage');
    if (!container) return;
    
    container.innerHTML = '';
    if (err) err.innerText = '';

    if (list.length === 0) {
        if (err) err.innerText = 'Không tìm thấy sản phẩm phù hợp!';
        return;
    }

    list.forEach(p => {
        const item = document.createElement('div');
        item.style.cssText = "border: 1px solid #ddd; padding: 10px; border-radius: 4px; background: white;";
        item.innerHTML = `<strong>${p.name}</strong> - Giá: <span style="color: #e74c3c;">${p.price}</span>`;
        container.appendChild(item);
    });
}

function searchProduct() {
    const inputElement = document.getElementById('searchInput');
    if (!inputElement) return;
    const input = inputElement.value;
    
    // Loại bỏ ký tự đặc biệt tránh Script Injection
    const cleanInput = input.replace(/[<>'"]/g, "").toLowerCase().trim();
    const filtered = products.filter(p => p.name.toLowerCase().includes(cleanInput));
    renderProducts(filtered);
}

// Khởi chạy hiển thị sản phẩm khi load trang
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
});

// --- BÀI TẬP 2: FORM VALIDATE & LOCALSTORAGE ---
function validateAndSave(e) {
    e.preventDefault();
    const name = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const status = document.getElementById('formStatus');

    // Kiểm tra mật khẩu: ít nhất 8 ký tự, có chữ hoa, chữ thường và số
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}\$/;
    if (!passRegex.test(password)) {
        status.innerHTML = '<p style="color: red; font-weight: bold;">Mật khẩu phải từ 8 ký tự, gồm chữ hoa, chữ thường & số!</p>';
        return;
    }

    const userData = { fullname: name, email: email, time: new Date().toLocaleString() };
    localStorage.setItem('userData', JSON.stringify(userData));
    status.innerHTML = '<p style="color: green; font-weight: bold;">Đăng ký thành công! Đã lưu vào LocalStorage.</p>';
}

// --- BÀI TẬP 3: COUNTDOWN TIMER ---
let timerInterval = null;

function startTimer() {
    if (timerInterval) clearInterval(timerInterval); // Xóa interval cũ tránh Memory Leak
    
    let totalSeconds = 10 * 60;
    const display = document.getElementById('timerDisplay');
    if (!display) return;

    timerInterval = setInterval(() => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        
        display.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (totalSeconds < 60) {
            display.classList.add('warning-animation');
        }

        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            alert('Hết thời gian làm bài!');
        }
        totalSeconds--;
    }, 1000);
}