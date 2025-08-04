function showNotification(message, type = 'info', duration = 3000) {
    const container = document.createElement('div');
    container.className = `notification notification-${type}`;
    container.innerHTML = message;
    
    document.body.appendChild(container);
    
    setTimeout(() => {
        container.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        container.classList.remove('show');
        setTimeout(() => {
            container.remove();
        }, 300);
    }, duration);
}

// CSS for notifications (should be added to your CSS file)
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius);
    background-color: var(--bg-card);
    color: var(--text-color);
    box-shadow: var(--shadow-lg);
    transform: translateX(120%);
    transition: transform 0.3s ease;
    z-index: 1000;
    max-width: 300px;
}

.notification.show {
    transform: translateX(0);
}

.notification-info {
    border-left: 4px solid var(--info-color);
}

.notification-success {
    border-left: 4px solid var(--success-color);
}

.notification-warning {
    border-left: 4px solid var(--warning-color);
}

.notification-error {
    border-left: 4px solid var(--danger-color);
}
`;

document.head.appendChild(notificationStyles);
