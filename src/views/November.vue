<template>
  <div class="activity-page">
    <!-- 顶部导航栏 -->

    <!-- 页面内容 -->
    <div class="page-content">
      <!-- 顶部背景图 -->
      <img src="../assets/winter_top_bg.png"
           alt="11月充值活动背景"
           class="top-background"
      />

      <!-- 规则按钮 -->
        <button class="rule-button" @click="showActivityRule">
            <img 
                src="../assets/winter_rule_btn.png"
                alt="活动规则"
                class="rule-btn-img"
            />
        </button>

      <!-- 活动内容区域 -->
      <div class="activity-content">
        

        <!-- 活动卡片列表 -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';


const showRuleModal = ref(false)

const showActivityRule = () => {
    showRuleModal.value = true
}

</script>

<style scoped>

.activity-page {
  min-height: 100vh;
  background-color: #CB7C56;
  position: relative;
}

/* 页面内容 */
.page-content {
  position: relative;
  min-height: calc(100vh - 60px);
}

.top-background {
    width: 100%;
    display: block;
}

.activity-content {
    position: relative;
    padding: 20px 0;
}

/* 规则按钮 */
.rule-button {
    position: absolute;
    top: 20px;
    right: 5px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 10;
}

.rule-btn-img {
  width: 35px;
  object-fit: contain;
}

</style>