// Vulnerável: Não sanitiza inputs
function addReview(gameId) {
    const comment = document.getElementById('review-comment').value;
    const rating = document.getElementById('review-rating').value;

    // Vulnerável: Envia dados sem validação
    fetch(`/shop/game/${gameId}/review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment, rating })
    })
    .then(response => response.json())
    .then(data => {
        // Vulnerável: Insere HTML direto do input do usuário
        const reviewsContainer = document.getElementById('reviews-container');
        reviewsContainer.innerHTML += `
            <div class="review-card">
                <h5>${data.user}</h5>
                <p>${data.comment}</p>
                <small>Avaliação: ${data.rating}/5</small>
            </div>
        `;
    })
    .catch(error => console.error('Erro:', error));
}

// Vulnerável: Não valida dados do cartão
function purchaseGame(gameId) {
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    // Vulnerável: Envia dados sensíveis sem criptografia
    fetch(`/shop/purchase/${gameId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cardNumber,
            expiryDate,
            cvv
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Compra realizada com sucesso!');
        window.location.href = '/shop/purchases/' + data.user;
    })
    .catch(error => console.error('Erro:', error));
} 