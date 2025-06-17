document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử DOM
    const loginBtn = document.getElementById('loginBtn');
    const cartBtn = document.getElementById('cartBtn');
    const loginModal = document.getElementById('loginModal');
    const cartModal = document.getElementById('cartModal');
    const closeLogin = document.getElementById('closeLogin');
    const closeCart = document.getElementById('closeCart');
    const loginSubmit = document.getElementById('loginSubmit');
    const loginStatus = document.getElementById('loginStatus');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Mảng lưu trữ giỏ hàng
    let cart = [];

    // Hàm cập nhật giỏ hàng
    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price.toLocaleString('vi-VN')}₫`;
            cartItems.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = total.toLocaleString('vi-VN');
        cartCount.textContent = cart.length;
    }

    // Xử lý sự kiện thêm vào giỏ hàng
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const name = productCard.dataset.name;
            const price = parseInt(productCard.dataset.price);

            cart.push({ name, price });
            updateCart();
            alert(`${name} đã được thêm vào giỏ hàng!`);
        });
    });

    // Xử lý hiển thị/ẩn modal đăng nhập
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'block';
    });

    closeLogin.addEventListener('click', () => {
        loginModal.style.display = 'none';
        loginStatus.textContent = '';
        usernameInput.value = '';
        passwordInput.value = '';
    });

    // Xử lý đăng nhập
    loginSubmit.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Kiểm tra đơn giản (giả lập)
        if (username === '' || password === '') {
            loginStatus.textContent = 'Vui lòng nhập đầy đủ thông tin!';
            loginStatus.style.color = 'red';
        } else if (username === 'admin' && password === '123456') {
            loginStatus.textContent = 'Đăng nhập thành công!';
            loginStatus.style.color = 'green';
            setTimeout(() => {
                loginModal.style.display = 'none';
                loginStatus.textContent = '';
                usernameInput.value = '';
                passwordInput.value = '';
            }, 1000);
        } else {
            loginStatus.textContent = 'Tên đăng nhập hoặc mật khẩu không đúng!';
            loginStatus.style.color = 'red';
        }
    });

    // Xử lý hiển thị/ẩn modal giỏ hàng
    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.style.display = 'block';
    });

    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Đóng modal khi nhấp ra ngoài
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            loginStatus.textContent = '';
            usernameInput.value = '';
            passwordInput.value = '';
        }
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
});