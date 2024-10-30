<template>
  <div class="personality-test">
    <el-header height="100px" class="header">
      <h1>拓趣测试</h1>
      <p>PassionPath</p>
    </el-header>

    <el-main>
      <el-row :gutter="20" class="description-cards">
        <el-col :span="8" v-for="card in cards" :key="card.title">
          <el-card shadow="hover">
            <template #header>
              <div class="card-icon">
                <img :src="card.icon" :alt="card.title" />
              </div>
            </template>
            <p>{{ card.description }}</p>
          </el-card>
        </el-col>
      </el-row>

      <div v-for="(question, index) in questions" :key="index" class="question">
        <h3>{{ question.dimension }}</h3>
        <p>{{ question.text }}</p>
        <div class="rating-scale">
          <span class="label">一般</span>
          <div class="circles">
          <span
            v-for="n in 5"
            :key="n"
            :class="['circle', { selected: question.rating === n }]"
            @click="setRating(index, n)"
          ></span>
          </div>
          <span class="label">非常同意</span>
        </div>
      </div>
      <button @click="submitAnswers">提交答案</button>
    </el-main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {useResultStore} from "@/stores/result.js";
import {ElMessage} from "element-plus";
import router from "@/router/index.js";
    const cards = ref([
      {
        title: '做自己',
        icon: 'src/assets/welcome/img1.png',
        description: '做你自己，诚实回答，找出你的兴趣爱好。'
      },
      {
        title: '理解影响',
        icon: 'src/assets/welcome/img2.png',
        description: '了解你的性格类型如何在你生活的各个领域中产生影响。'
      },
      {
        title: '塑造自我',
        icon: 'src/assets/welcome/img3.png',
        description: '借助我们的整合资料，塑造全新的自我。'
      }
    ]);

const questions = ref([
  { dimension: '开放性', text: '我喜欢尝试新的和不同的事物。', rating: null },
  { dimension: '开放性', text: '我对抽象概念感兴趣。', rating: null },
  { dimension: '尽责性', text: '我坚持完成所有的任务和责任。', rating: null },
  { dimension: '尽责性', text: '我是一个非常有条理的人。', rating: null },
  { dimension: '外向性', text: '我享受社交场合和聚会。', rating: null },
  { dimension: '外向性', text: '我喜欢在公共场合表现自己。', rating: null },
  { dimension: '宜人性', text: '我喜欢帮助别人。', rating: null },
  { dimension: '宜人性', text: '我通常理解他人的感受。', rating: null },
  { dimension: '神经质', text: '我容易紧张或焦虑。', rating: null },
  { dimension: '神经质', text: '我对挑战感到不安。', rating: null },
]);

const setRating = (index, rating) => {
  questions.value[index].rating = rating;
};

const resultStore=useResultStore();
const submitAnswers = () => {
  const answers = questions.value.map(q => q.rating);
  resultStore.maxIndex=answers.indexOf(Math.max(...answers));
  console.log('用户评分结果：', answers,resultStore.maxIndex);
  ElMessage({type:'success',message:'测试成功'});
  router.push('/');
  // 此处可以发送数据到服务器
};


</script>

<style scoped>
.personality-test {
  background-color: #f5f5f5;
  min-height: 100vh;
  text-align: center;
  font-family: Arial, sans-serif;
}

.header {
  background-color: #d14f48;
  color: #ffffff;
  padding: 20px;
}

.header h1 {
  font-size: 2em;
  margin: 0;
}

.header p {
  font-size: 1.2em;
  margin: 0;
}

.description-cards {
  margin-top: 20px;
}

.card-icon {
  text-align: center;
  margin-bottom: 10px;
}

.card-icon img {
  width: 40px;
  height: 40px;
}

.questionnaire {
  width: 600px;
  margin: auto;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #4a4a4a;
}

.question {
  margin: 20px 0;
  padding: 20px;
  border-bottom: 1px solid #eaeaea;
}

.rating-scale {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.label {
  font-size: 0.9em;
  color: #7a7a7a;
}

.circles {
  display: flex;
  gap: 10px;
}

.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #b5b5b5;
  cursor: pointer;
  transition: 0.3s;
}

.circle:hover {
  transform: scale(1.1);
}

.selected {
  background-color: #4caf50;
  border-color: #4caf50;
}
button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
