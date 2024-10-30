<script setup>
import { ref } from 'vue'

const settings = ref({
  youtubeSummary: false,
  llmUsage: false,
  linkSummary: false
})

const saveSettings = () => {
  console.log('Settings saved:', settings.value)
}

const roomInfo = ref({
  name: '',
  id: ''
})
</script>

<template>
    <h1>Settings</h1>
    <div class="room-info">
      <div>방이름: {{ roomInfo.name }}</div>
      <div>방ID: {{ roomInfo.id }}</div>
    </div>
    <div class="toggle">
      <label for="youtubeSummary">
        YouTube 요약
        <span class="switch">
          <input type="checkbox" id="youtubeSummary" v-model="settings.youtubeSummary">
          <span class="slider"></span>
        </span>
      </label>
      <div class="description">YouTube 링크를 감지하여 자동으로 요약해줍니다.</div>
    </div>
    <div class="toggle">
      <label for="llmUsage">
        LLM 사용
        <span class="switch">
          <input type="checkbox" id="llmUsage" v-model="settings.llmUsage">
          <span class="slider"></span>
        </span>
      </label>
      <div class="description">##을 감지하여 내용을 요약해줍니다.</div>
    </div>
    <div class="toggle">
      <label for="linkSummary">
        링크 요약
        <span class="switch">
          <input type="checkbox" id="linkSummary" v-model="settings.linkSummary">
          <span class="slider"></span>
        </span>
      </label>
      <div class="description">http://, https:// 등의 링크에 AI가 접속하여 자동으로 요약해줍니다.</div>
    </div>
    <button class="save-button" @click="saveSettings">저장</button>
    <!-- <pre>{{ settings }}</pre> -->

</template>

<style scoped>
  .toggle {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  label {
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .description {
    font-size: 0.9em;
    color: #666;
    margin-top: 5px;
    width: 100%;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 24px;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  input:checked + .slider {
    background-color: #D2B48C;
  }
  input:checked + .slider:before {
    transform: translateX(26px);
  }

  .save-button {
    display: block;
    width: 100%;
    padding: 12px;
    background-color: #D2B48C;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .save-button:hover {
    background-color: #C1A378;
  }

  .save-button:active {
    background-color: #B08F68;
  }

  .room-info {
    margin-top: 3px;
    margin-bottom: 15px;
    font-size: 0.9em;
    color: #333;
  }
</style>
