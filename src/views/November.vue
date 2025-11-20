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
        <div class="activity-cards">
          <div 
            v-for="(num, index) in nums"
            :key="index"
            class="activity-card-wrapper"
          >
            <div class="activity-card">
              <!-- 卡片背景图 -->
              <img 
                :src="cardImages[index]"
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

                <!-- 进行中的状态 -->
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
                  src="../assets/zq_recharge_btn.png"
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
    <NovemberRule 
      v-if="showRuleModal"
      @close="showRuleModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import NovemberRule from './NovemberRule.vue';

// 提前导入所有图片
import card1 from '@/assets/winter_act_1.png';
import card2 from '@/assets/winter_act_2.png';
import card3 from '@/assets/winter_act_3.png';
import card4 from '@/assets/winter_act_4.png';
import card5 from '@/assets/winter_act_5.png';

// 响应式数据
const nums = ref([58, 98, 299, 520, 1314])
const rechargeNum = ref(0)
const showRuleModal = ref(false)

const cardImages = [card1, card2, card3, card4, card5];

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
  // console.log('打开充值页面')
  // 在实际项目中可能是打开弹窗或跳转页面
  // showRechargeDialog.value = true
   Activity.postMessage('dazi://jumpToRecharge');
}

const showActivityRule = () => {
    showRuleModal.value = true
}

const getCardImage = (index) => {
    // 使用require动态加载图片，webpack会将其作为依赖处理
    return require(`src/assets/winter_act_${index + 1}.png`);
}

// 模拟 API
const SystemApi = {
  rechargeTotal: () => Promise.resolve(150) // 模拟返回150
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

.activity-content {
    position: relative;
    padding: 20px 0;
}

/* 活动卡片 */
.activity-cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: -50px; /* 与背景图重叠 */
  position: relative;
  z-index: 2;
}

.activity-card-wrapper {
  width: 92%;
}

.activity-card {
  position: relative;
}

.card-background {
  width: 100%;
  display: block;
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
  width: 80px;
  height: 12px;
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
  font-size: 9px;
  font-weight: 600;
  z-index: 1;
  position: relative;
}

.progress-bar.unstarted .progress-text,
.progress-bar.in-progress .progress-text {
  color: #FF4387;
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
  font-size: 11px;
  font-weight: 600;
  color: #FF863D;
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
  width: 150px;
  /* height: 66px; */
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

</style>