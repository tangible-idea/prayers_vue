<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'
import './assets/setting.css'
import './assets/loading.css'

const settings = ref({
  youtubeSummary: false,
  llmUsage: false,
  linkSummary: false
})

// roomTag (Global)
var roomId = '';

// loading state
const loading = ref(false)

// model const 
const roomInfo = ref({
  name: '',
  id: ''
})

const saveSettings = async () => {
  try {
    loading.value= true;
    console.log('Settings saved:', settings.value)

    const { data, error } = await supabase
      .from('kakao_room')
      .upsert({
        room_tag: roomId,
        setting: JSON.stringify(settings.value)
      })
      .select()

    if (error) {
      console.error('Error saving settings:', error)
      return;
    }

    console.log('Upserted data:', data)
  } catch (error) {
      console.error('Error parsing settings JSON:', error);
  } finally {
    loading.value = false;
  }
}

//const rooms = ref([])

function populateSetting(settingFromServer) {
  try {
    console.log(settingFromServer);
    if(settingFromServer == '{}') {
      return;
    }
    settings.value = JSON.parse(settingFromServer);
  } catch (error) {
      console.error('Error parsing settings JSON:', error);
  } finally {
    loading.value = false;
  }
}

/** 
 * Query from Supabase 
 */
async function getRoomTitle() {

  loading.value= true;

  // Extract roomId from the URL
  const path = window.location.pathname;
  roomId = path.substring(1); // Remove the leading '/'
  
  // Query Supabase with the roomId
  const { data, error } = await supabase
    .from('kakao_room')
    .select()
    .eq('room_tag', roomId)
    .single();

  if (error) {
    console.error('Error fetching room title:', error);
    return;
  }

  // set room id from the URL/Supabase
  roomInfo.value.id = roomId
  roomInfo.value.name = data.room_title;
  console.log(data);
  //rooms.value = data;
  populateSetting(data.setting)
}


onMounted(() => {
  getRoomTitle();
})
</script>

<template>
  <div>
    <div v-if="loading" class="overlay">
      <div class="spinner"></div>
    </div>
    <h1>Settings 222</h1>
    <!-- <ul>
      <li v-for="room in rooms" :key="room.room_tag">{{ room.room_title }}</li>
    </ul> -->
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
  </div>
</template>
