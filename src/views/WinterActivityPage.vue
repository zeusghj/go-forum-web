<template>
  <div class="page">

    <!-- 顶部背景图 -->
    <img class="top-bg" src="../assets/winter_top_bg.png" />

    <!-- 规则按钮 -->
    <img class="rule-btn" src="../assets/winter_rule_btn.png" @click="showRule = true" />

    <!-- 内容 -->
    <div class="content">
      <div
        v-for="(item, index) in nums"
        :key="index"
        class="card-wrapper"
      >
        <div class="card">
          <img :src="`src/assets/winter_act_${index+1}.png`" class="card-img" />

          <!-- 顶部进度标签 -->
          <div class="progress" :class="progressClass(index)">
            <span>
              {{ rechargeNum >= item ? `${item}/${item}` : `${rechargeNum}/${item}` }}
            </span>
          </div>

          <!-- 达成提示 -->
          <div v-if="rechargeNum >= item" class="done-text">已达成</div>

          <!-- 底部充值按钮 -->
          <img class="recharge-btn"
               src="../assets/zq_recharge_btn.png"
               @click="openRecharge" />
        </div>
      </div>

      <p class="tip">
        在法律许可范围内，公司有随时调整活动的权利并享有活动的最终解释权。
      </p>
    </div>

    <!-- 规则弹窗 -->
    <!-- <RuleDialog v-model:show="showRule" /> -->

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import RuleDialog from './RuleDialog.vue'

const nums = [58, 98, 299, 520, 1314]
const rechargeNum = ref(0)
const showRule = ref(false)

onMounted(async () => {
  const total = await fetchRechargeNum()
  rechargeNum.value = total
})

function fetchRechargeNum() {
  return Promise.resolve(120) // 伪接口
}

function progressClass(index) {
  if (rechargeNum.value === 0) return 'zero'
  if (rechargeNum.value >= nums[index]) return 'achieved'
  return 'doing'
}

function openRecharge() {
  // TODO：调用 Flutter 的充值入口
  alert('打开充值窗口')
}
</script>

<style scoped>
.page {
  background-color: #CB7C56;
  position: relative;
  min-height: 100vh;
}

.top-bg {
  width: 100%;
}

.rule-btn {
  position: absolute;
  top: 20px;
  right: 5px;
  width: 35px;
}

.card-wrapper {
  /* display: flex; */
  /* justify-content: center; */
  margin-bottom: 10px;
}

.card {
  position: relative;
  display: flex;
}

.card-img {
  width: 92%;
  margin: 0 auto;
}

.progress {
  position: absolute;
  top: 12px;
  right: 10px;
  background: #FFDCEE;
  padding: 2px 8px;
  border-radius: 6px;
}

.progress.achieved {
  background: linear-gradient(90deg, #FF00A0, #FF993C);
  color: white;
}

.done-text {
  position: absolute;
  top: 12px;
  right: -40px;
  color: #FF863D;
  font-size: 16px;
}

.recharge-btn {
  position: absolute;
  bottom: 10px;
  left: 50%;
  width: 150px;
  transform: translateX(-50%);
}

.tip {
  text-align: center;
  color: #FFE2C3;
  padding: 10px 20px;
  font-size: 14px;
}
</style>