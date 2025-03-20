// Share button functionality
document.addEventListener('DOMContentLoaded', () => {
    const shareButton = document.getElementById('shareMainButton');
    const shareOptions = document.getElementById('shareOptions');

    // Toggle share options
    shareButton.addEventListener('click', () => {
        shareOptions.classList.toggle('show');
    });

    // Close share options when clicking outside
    document.addEventListener('click', (e) => {
        if (!shareButton.contains(e.target) && !shareOptions.contains(e.target)) {
            shareOptions.classList.remove('show');
        }
    });
});

// Share functions
function shareOnWhatsApp() {
    const text = encodeURIComponent('Check out this awesome tools collection!');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareOnTwitter() {
    const text = encodeURIComponent('Check out this awesome tools collection!');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => {
            alert('Link copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy link:', err);
        });
}