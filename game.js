document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const counter = document.getElementById('counter');
    let snailCount = 0;
    
    function moveSnail(snail) {
        // Vitesse de déplacement aléatoire entre 0.1 et 0.5 pixels par frame
        const speed = Math.random() * 0.4 + 0.1;
        
        // Direction initiale aléatoire (0 = droite, 1 = gauche)
        let direction = Math.random() > 0.5 ? 1 : -1;
        // Initialise la direction de l'image
        snail.style.transform = direction === 1 ? 'scaleX(1)' : 'scaleX(-1)';
        
        // Fonction pour changer la direction
        function changeDirection() {
            direction = -direction; // Inverse la direction
            snail.style.transform = direction === 1 ? 'scaleX(1)' : 'scaleX(-1)';
            
            // Programme le prochain changement de direction
            const nextChange = Math.random() * 50000 + 10000; // Entre 10 et 60 secondes
            setTimeout(changeDirection, nextChange);
        }
        
        // Démarre le premier changement de direction
        const firstChange = Math.random() * 50000 + 10000;
        setTimeout(changeDirection, firstChange);
        
        function animate() {
            // Calcul des nouvelles coordonnées
            const currentX = parseFloat(snail.style.left);
            const newX = currentX + (speed * direction);
            
            // Vérification des limites du conteneur
            const maxX = gameContainer.clientWidth - 100;
            
            if (newX >= 0 && newX <= maxX) {
                snail.style.left = `${newX}px`;
            } else {
                // Si l'escargot atteint un bord, on le fait rebondir
                snail.style.left = newX < 0 ? '0px' : `${maxX}px`;
                direction = -direction; // Inverse la direction au rebond
                snail.style.transform = direction === 1 ? 'scaleX(1)' : 'scaleX(-1)';
            }
            
            // Continue le mouvement
            requestAnimationFrame(animate);
        }
        
        // Démarre l'animation
        animate();
    }
    
    gameContainer.addEventListener('click', (event) => {
        const snail = document.createElement('img');
        snail.src = 'escargot.png';
        snail.className = 'snail';
        
        // Position aléatoire dans le conteneur
        const maxX = gameContainer.clientWidth - 100;
        const maxY = gameContainer.clientHeight - 100;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        snail.style.left = `${randomX}px`;
        snail.style.top = `${randomY}px`;
        
        gameContainer.appendChild(snail);
        
        // Démarre le mouvement de l'escargot
        moveSnail(snail);
        
        // Mise à jour du compteur
        snailCount++;
        counter.textContent = `Escargots: ${snailCount}`;
    });
}); 