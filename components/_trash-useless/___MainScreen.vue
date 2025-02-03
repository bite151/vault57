<script setup lang="ts">
  const slogan = [
    'Старая школа, новые победы.',
    'Присоединяйся к нам',
    'Перезагрузи своё детство!'
  ]
</script>

<template>
  <div class="main-screen">
    <NuxtImg src="/images/3.jpg" class="background" />
    <div class="content-container">
      <p class="main-title">Игровой клуб</p>

      <RunningLine :text="slogan" />

      <div class="description">
        <p>Vault57 не просто место для игр — это сообщество, где поклонники ретро собираются, чтобы поделиться воспоминаниями, обменяться секретами и советами, и конечно же, сразиться за звание лучшего игрока.</p>
        <p>Это место, где дружба крепнет в битвах с боссами, а соперничество становится началом новых знакомств.</p>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.main-screen {
  position: relative;
  padding: 78px 28px 28px;
  height: 100vh;
  display: flex;
  align-items: center;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-position: center;
  object-fit: cover;
}

.main-title {
  padding-top: 12px;
  margin-bottom: 48px;
  width: min-content;
  line-height: 84px;
  letter-spacing: -3px;
  font-size: 96px;
  font-family: Play-Bold, sans-serif;
  text-transform: uppercase;
  color: #fff;
  text-stroke: 2px #000000;
  -webkit-text-stroke: 2px #000000;
}

.description{
  margin-top: 40px;
  width: 670px;
  color: #fff;

  p {
    line-height: 1.4;
    font-size: 16px;
    font-weight: 300;
    margin-bottom: 8px;
  }
}
</style>
