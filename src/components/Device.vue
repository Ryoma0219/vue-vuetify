<template>
  <div id="app">
    暇があったら
  </div>
</template>

<script>
export default {
  name: 'next-page',
  data () {
    return {
      items: [
        { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        }
      ]
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    ryoma () {
      this.$store.commit('setMessage', 'hoshinode-su')
    },
    saveDevice (deviceName) {
      this.$router.push('result')
      this.$store.commit('setDevice', deviceName)
    }
  }
}
</script>
<style scoped>
</style>
