// Initialize empty cart object
let cart = {};

// Initialize cart display when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
});

/**
 * Add a service to the cart
 * @param {string} serviceId - Unique identifier for the service
 * @param {string} name - Name of the service
 * @param {number} price - Price of the service
 */
function addToCart(serviceId, name, price) {
    // Check if service already in cart
    if (cart[serviceId]) {
        alert('This service is already in your cart!');
        return;
    }
    
    // Add service to cart
    cart[serviceId] = { name, price };
    
    // Update button to show "Remove" state
    const serviceItem = document.querySelector(`[data-service="${serviceId}"]`);
    const button = serviceItem.querySelector('.service-btn');
    
    button.className = 'service-btn remove-btn';
    button.innerHTML = 'Remove Item <i class="fas fa-minus-circle"></i>';
    button.onclick = function() { removeFromCart(serviceId); };
    
    // Update the cart display
    updateCartDisplay();
}

/**
 * Remove a service from the cart
 * @param {string} serviceId - Unique identifier for the service to remove
 */
function removeFromCart(serviceId) {
    // Store service info before deleting
    const serviceInfo = cart[serviceId];
    
    // Remove from cart
    delete cart[serviceId];
    
    // Update button to show "Add" state
    const serviceItem = document.querySelector(`[data-service="${serviceId}"]`);
    const button = serviceItem.querySelector('.service-btn');
    
    button.className = 'service-btn add-btn';
    button.innerHTML = 'Add Item <i class="fas fa-plus-circle"></i>';
    button.onclick = function() { 
        addToCart(serviceId, serviceInfo.name, serviceInfo.price); 
    };
    
    // Update the cart display
    updateCartDisplay();
}

/**
 * Update the cart display to reflect current cart contents
 */
function updateCartDisplay() {
    const cartBody = document.getElementById('cart-body');
    const totalElement = document.getElementById('total-amount');
    
    // Clear current display
    cartBody.innerHTML = '';
    
    const items = Object.entries(cart);
    
    // Show empty cart message if no items
    if (items.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="3" class="empty-cart-message">
                <i class="fas fa-shopping-cart"></i>
                <span>No items added</span>
            </td>
        `;
        cartBody.appendChild(emptyRow);
    } else {
        // Display each item in cart
        items.forEach(([id, item], index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)}</td>
            `;
            cartBody.appendChild(row);
        });
    }
    
    // Update total
    const total = calculateTotal();
    totalElement.textContent = `₹ ${total.toFixed(2)}`;
}

/**
 * Calculate the total price of all items in cart
 * @returns {number} Total price
 */
function calculateTotal() {
    return Object.values(cart).reduce((sum, item) => sum + item.price, 0);
}

/**
 * Hide all error and success messages
 */
function hideAllMessages() {
    document.getElementById('error-msg').style.display = 'none';
    document.getElementById('error-name').style.display = 'none';
    document.getElementById('error-email').style.display = 'none';
    document.getElementById('error-email-invalid').style.display = 'none';
    document.getElementById('error-phone').style.display = 'none';
    document.getElementById('success-msg').style.display = 'none';
}

/**
 * Show an error message and hide it after 5 seconds
 * @param {string} elementId - The ID of the error message element
 */
function showError(elementId) {
    hideAllMessages();
    document.getElementById(elementId).style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(function() {
        document.getElementById(elementId).style.display = 'none';
    }, 5000);
}

/**
 * Handle the booking form submission
 */
function handleBooking() {
    // Hide any previous messages
    hideAllMessages();
    
    // Check cart FIRST - show error if empty
    if (Object.keys(cart).length === 0) {
        showError('error-msg');
        return;
    }
    
    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // Validate Full Name
    if (!fullName) {
        showError('error-name');
        return;
    }
    
    // Validate Email
    if (!email) {
        showError('error-email');
        return;
    }
    
    // Validate Email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showError('error-email-invalid');
        return;
    }
    
    // Validate Phone
    if (!phone) {
        showError('error-phone');
        return;
    }
    
    // Prepare booking data
    const servicesList = Object.values(cart)
        .map(item => `${item.name} - ₹${item.price}`)
        .join(', ');
    
    const total = calculateTotal();
    
    // Log booking details (in real app, this would send to server)
    console.log('Booking Details:');
    console.log('Name:', fullName);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Services:', servicesList);
    console.log('Total:', `₹${total.toFixed(2)}`);
    
    // Show success message
    document.getElementById('success-msg').style.display = 'block';
    
    // Hide success message after 5 seconds
    setTimeout(function() {
        document.getElementById('success-msg').style.display = 'none';
    }, 5000);
    
    // Reset form
    document.getElementById('booking-form').reset();
    
    // Clear cart
    cart = {};
    updateCartDisplay();
    resetAllButtons();
}

/**
 * Reset all service buttons to "Add" state
 */
function resetAllButtons() {
    document.querySelectorAll('.remove-btn').forEach(btn => {
        const serviceItem = btn.closest('.service-item');
        const serviceId = serviceItem.dataset.service;
        const serviceName = serviceItem.querySelector('.service-name').textContent;
        const price = parseInt(serviceItem.dataset.price);
        
        btn.className = 'service-btn add-btn';
        btn.innerHTML = 'Add Item <i class="fas fa-plus-circle"></i>';
        btn.onclick = function() { 
            addToCart(serviceId, serviceName, price); 
        };
    });
}
