document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const guard = document.getElementById('guard');
    guard.style.left = "80px";
    guard.style.bottom = "30px";
    const enemies = [];

    let score = 0;
  
    function createEnemy() {
      const enemy = document.createElement('div');
      enemy.style.top = "5px";
      enemy.className = 'enemy';
      enemy.style.left = Math.random() * (gameContainer.offsetWidth - 30) + 'px';
      gameContainer.appendChild(enemy);
      enemies.push(enemy);
    }
  
    function updateEnemies() {
      for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        const enemyTop = parseInt(enemy.style.top);
        console.log("enemyTop is " + enemyTop);
        const guardBottom = parseInt(guard.style.bottom);
        let enemyBottom = 350 - enemyTop;

        if (enemyBottom <= guardBottom && enemyBottom >= guardBottom - 30) {
          const enemyLeft = parseInt(enemy.style.left);
          const guardLeft = parseInt(guard.style.left);
  
          if (enemyLeft >= guardLeft - 30 && enemyLeft <= guardLeft + 50) {
            // 守卫砍中敌人
            gameContainer.removeChild(enemy);
            enemies.splice(i, 1);
            score++;
          }
        }
  
        const newY = enemyTop + 1;
        if (newY > gameContainer.offsetHeight) {
          // 敌人走过了，移除敌人
          gameContainer.removeChild(enemy);
          enemies.splice(i, 1);
        } else {
          enemy.style.top = newY + 'px';
        }
      }
  
      requestAnimationFrame(updateEnemies);
    }
  
    function updateScore() {
      const scoreElement = document.createElement('div');
      scoreElement.textContent = '得分: 0';
      gameContainer.appendChild(scoreElement);
  
      function update() {
        scoreElement.textContent = '得分: ' + score;
        requestAnimationFrame(update);
      }
  
      update();
    }
  
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            // 守卫向左移动
            const currentLeft = parseInt(guard.style.left);
            guard.style.left = Math.max(0, currentLeft - 10) + 'px';
          } else if (event.key === 'ArrowRight') {
            // 守卫向右移动
            const currentLeft = parseInt(guard.style.left);
            guard.style.left = Math.min(gameContainer.offsetWidth - 50, currentLeft + 10) + 'px';
          } else if (event.key === 'ArrowUp') {
            // 守卫向上移动
            const currentBottom = parseInt(guard.style.bottom);
            guard.style.bottom = Math.min(gameContainer.offsetHeight - 50, currentBottom + 10) + 'px';
          } else if (event.key === 'ArrowDown') {
            // 守卫向下移动
            const currentBottom = parseInt(guard.style.bottom);
            guard.style.bottom = Math.max(0, currentBottom - 10) + 'px';
          }
    });
  
    updateScore();
    setInterval(createEnemy, 1000); // 每隔1秒生成一个敌人
    updateEnemies();
  });