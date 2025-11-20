<template>
  <div class="rule-modal-overlay" @click.self="$emit('close')">
    <div class="rule-modal">
      <!-- 关闭按钮 -->
      <button class="close-button" @click="$emit('close')">
        <img 
          src="../assets/cz_close.png" 
          alt="关闭" 
          class="close-icon"
        />
      </button>
      
      <!-- 规则内容背景 -->
      <div class="rule-content">
        <img 
          src="../assets/winter_act_rule.png" 
          alt="活动规则" 
          class="rule-background"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close'])
</script>

<style scoped>
.rule-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
}

.rule-modal {
  position: relative;
  width: 100%;
  max-width: 750px; /* 限制最大宽度 */
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.rule-content {
  position: relative;
  width: 100%;
}

.rule-background {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 20px 20px 0 0;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  padding: 5px;
}

.close-icon {
  width: 29px;
  height: 29px;
  display: block;
}

</style>