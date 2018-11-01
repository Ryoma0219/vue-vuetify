<template>
  <div id="wrapper">
    <div class="text">オススメの動画</div>
    <div style="text-align: center">
    </div>
    <div style="margin-top: 20px">
      <iframe id="player"
              type="text/html"
              width="90%"
              height="400px"
              :src="perfectURL"
              frameborder="0">
      </iframe>
    </div>
    <v-btn color="info" @click="changeURL()">CHANGE</v-btn>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'next-page',
  data () {
    return {
      hoshino: this.$store.state.message,
      youtubeURL: 'MFx0_xtzKpI'
    }
  },
  methods: {
    async changeURL () {
      // api呼び出し
      axios
        .get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyDv5ECiCZM7bP8pGZUt83MUG9X_DHNVQ8M&playlistId=PLzph190g2lCSa6KexqrejOCXbwUttO_sp&maxResults=50')
        .then(
          response => {
            this.youtubeURL = response.data.items[Math.floor(Math.random() * response.data.items.length)].snippet.resourceId.videoId
          }
        )
    }
  },
  computed: {
    perfectURL () {
      return `https://www.youtube.com/embed/${this.youtubeURL}?enablejsapi=1&origin=http://example.com`
    }
  }
}
</script>
<style scoped>
  .text {
    margin-bottom: 10px;
    font-size: 20px;
  }

  .img-card {
    max-width: 20rem;
    color: #a0a0a0;
  }
</style>
