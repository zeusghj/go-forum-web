<template>
  <div class="winter-activity-page">
    <!-- 顶部导航栏 -->
    <div class="app-bar">
      <button class="back-button" @click="$router.back()">
        <span class="back-icon">←</span>
      </button>
      <h1 class="title">11月初冬充值活动</h1>
      <div class="placeholder"></div> <!-- 用于居中标题 -->
    </div>

    <!-- 页面内容 -->
    <div class="page-content">
      <!-- 顶部背景图 -->
      <img 
        src="@/assets/images/home/winter_top_bg.png" 
        alt="冬季活动背景" 
        class="top-background"
      />

      <!-- 活动内容区域 -->
      <div class="activity-content">
        <!-- 规则按钮 -->
        <button class="rule-button" @click="showActivityRule">
          <img 
            src="@/assets/images/home/winter_rule_btn.png" 
            alt="活动规则" 
            class="rule-btn-img"
          />
        </button>

        <!-- 活动卡片列表 -->
        <div class="activity-cards">
          <div 
            v-for="(num, index) in nums" 
            :key="index" 
            class="activity-card-wrapper"
          >
            <div class="activity-card">
              <!-- 卡片背景图 -->
              <img 
                :src="require(`@/assets/images/home/winter_act_${index + 1}.png`)" 
                :alt="`活动${index + 1}`"
                class="card-background"
              />

              <!-- 进度指示器 -->
              <div class="progress-indicator">
                <!-- 未充值状态 -->
                <div v-if="rechargeNum === 0" class="progress-bar unstarted">
                  <span class="progress-text">0/{{ num }}</span>
                </div>

                <!-- 已完成状态 -->
                <div v-else-if="rechargeNum >= num" class="completed-status">
                  <div class="progress-bar completed">
                    <span class="progress-text">{{ num }}/{{ num }}</span>
                  </div>
                  <span class="achieved-text">已达成</span>
                </div>

                <!-- 进行中状态 -->
                <div v-else class="progress-bar in-progress">
                  <div 
                    class="progress-fill"
                    :style="{ width: `${(rechargeNum / num) * 100}%` }"
                  ></div>
                  <span class="progress-text">{{ rechargeNum }}/{{ num }}</span>
                </div>
              </div>

              <!-- 充值按钮 -->
              <button class="recharge-btn" @click="handleRecharge">
                <img 
                  src="@/assets/images/home/zq_recharge_btn.png" 
                  alt="立即充值" 
                  class="recharge-btn-img"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- 活动说明 -->
        <div class="activity-notice">
          <p>在法律许可范围内，公司有随时调整活动的权利并享有活动的最终解释权，请详细了解规则后再参与。</p>
        </div>
      </div>
    </div>

    <!-- 活动规则弹窗 -->
    <WinterActivityRule 
      v-if="showRuleModal" 
      @close="showRuleModal = false" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import WinterActivityRule from './WinterActivityRule.vue'

const router = useRouter()

// 响应式数据
const nums = ref([58, 98, 299, 520, 1314])
const rechargeNum = ref(0)
const showRuleModal = ref(false)

// 生命周期
onMounted(() => {
  loadData()
})

// 方法
const loadData = async () => {
  try {
    // 模拟 API 调用
    const total = await SystemApi.rechargeTotal()
    rechargeNum.value = typeof total === 'number' ? Math.floor(total) : 0
  } catch (error) {
    console.error('加载数据失败:', error)
    rechargeNum.value = 0
  }
}

const handleRecharge = () => {
  // 处理充值逻辑，对应 Flutter 中的 Get.find<MainController>().showRechargePage()
  console.log('打开充值页面')
  // 在实际项目中可能是打开弹窗或跳转页面
  // showRechargeDialog.value = true
}

const showActivityRule = () => {
  showRuleModal.value = true
}

// 模拟 API
const SystemApi = {
  rechargeTotal: () => Promise.resolve(150) // 模拟返回150
}
</script>

<style scoped>
.winter-activity-page {
  min-height: 100vh;
  background-color: #CB7C56;
  position: relative;
}

/* 导航栏样式 */
.app-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.back-button {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
}

.back-icon {
  font-size: 20px;
  color: #222222;
}

.title {
  font-size: 18px;
  font-weight: 500;
  color: #222222;
  margin: 0;
}

.placeholder {
  width: 40px; /* 与返回按钮宽度保持一致 */
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
  width: 70px;
  height: 180px;
  object-fit: contain;
}

/* 活动卡片 */
.activity-cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: -100px; /* 与背景图重叠 */
  position: relative;
  z-index: 2;
}

.activity-card-wrapper {
  width: 100%;
  max-width: 690px;
  padding: 0 15px;
}

.activity-card {
  position: relative;
  margin-bottom: 10px;
}

.card-background {
  width: 100%;
  display: block;
  border-radius: 12px;
}

/* 进度指示器 */
.progress-indicator {
  position: absolute;
  top: 12px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 2px;
}

.progress-bar {
  width: 160px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 3px;
  position: relative;
  overflow: hidden;
}

.progress-bar.unstarted {
  background-color: #FFDBEE;
}

.progress-bar.completed {
  background: linear-gradient(90deg, #FF00A0, #FF993C);
}

.progress-bar.in-progress {
  background-color: #FFDBEE;
}

.progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: linear-gradient(90deg, #FF00A0, #FF993C);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 18px;
  font-weight: 600;
  z-index: 1;
  position: relative;
}

.progress-bar.unstarted .progress-text,
.progress-bar.in-progress .progress-text {
  color: #FFFF4387;
}

.progress-bar.completed .progress-text {
  color: white;
}

.completed-status {
  display: flex;
  align-items: center;
  gap: 2px;
}

.achieved-text {
  font-size: 22px;
  font-weight: 600;
  color: #FFFF863D;
  white-space: nowrap;
}

/* 充值按钮 */
.recharge-btn {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.recharge-btn:hover {
  transform: translateX(-50%) scale(1.05);
}

.recharge-btn:active {
  transform: translateX(-50%) scale(0.95);
}

.recharge-btn-img {
  width: 300px;
  height: 66px;
  object-fit: contain;
}

/* 活动说明 */
.activity-notice {
  padding: 15px;
  text-align: center;
}

.activity-notice p {
  color: #FFFFE2C3;
  font-size: 12px;
  line-height: 1.4;
  margin: 0;
  max-width: 100%;
  word-break: break-word;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .activity-card-wrapper {
    padding: 0 10px;
  }
  
  .progress-bar {
    width: 140px;
    height: 20px;
  }
  
  .progress-text {
    font-size: 14px;
  }
  
  .achieved-text {
    font-size: 18px;
  }
  
  .recharge-btn-img {
    width: 250px;
    height: 55px;
  }
  
  .rule-btn-img {
    width: 50px;
    height: 140px;
  }
}
</style>