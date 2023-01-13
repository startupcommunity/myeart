<template>
<!-- <div> -->
  <li class="menu-items-sub">
    <div class="header-icons">
        <a
            class="mobile-hide search-bar-icon uppercase hover:no-underline"
            href="#"
            @click="markAsRead"
        >
          <div class="position-relative">
            <span class="badge badge-super rounded bg-danger" v-if="user.unread_notifications.length > 0">
              <span class="visually-hidden">unread messages</span>
            </span>
            <i class="fas fa-bell"></i>
          </div>
        </a>
    </div>
    <ul class="sub-menu-notification"  v-if="user.unread_notifications.length > 0">
      <div class="p-3">
        <h2 class="text-center">NOTIFICACIONES</h2>
      </div>
      <table class="table-notifications">
        <tr v-for="notification in user.unread_notifications" :key="notification.id">
          <td class="px-2" style="width:10%">
            <img :src="notification.data.user_profile_photo" class="rounded" >
          </td>
          <td class="px-2" style="width:50%">
            <p class="user-name">
              {{notification.data.user_username}}
            </p>
            <p class="message">
              {{notification.data.message}}
            </p>
          </td>
          <td style="width:30%">
            <timeago class="time" :datetime="notification.data.created_at" :auto-update="60"></timeago>
          </td>
          <td class="px-2" style="width:10%">
            <FollowArtistButton
            @click="markAsRead(notification.id)"
            v-if="notification.data.type == 'new-follower'"
            :artist="notification.data.user"
            />
            <button class="btn btn-primary btn-sm text-xxs px-4 uppercase btn-block"
            v-else
            @click="actionButton(notification.data.url, notification.id)"
            >
            {{setNamebutton(notification.data.type)}}
            </button>
          </td>
        </tr>
      </table>        
    </ul>
</li>
</template>

<script>
import VueTimeago from 'vue-timeago'
import { mapGetters } from "vuex";
import FollowArtistButton from "../../artwork/components/FollowArtistButton.vue";
Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'es_ES', 
})
export default {
  name:'Notifications',
  components: { FollowArtistButton },
  props: [
      'user'
  ],
  data() {
    return {
        artist: {
            profile: {},
            social_network: {},
        },
    };
  },
  mounted() {
    console.log('unread')
    console.log(JSON.stringify(this.user.unread_notifications))
    window.Echo.channel('notification-channel')
    .listen('NotificationEvent', (e) => {
      console.log('ok')
      this.axios
      .get(this.ep.user.getArtist + e.data.user_id)
      .then((res) => {
        if (res.status !== 200) return false;
          console.log('res')
          console.log(res)
          this.artist = res.data;
          console.log('info del artista')
          console.log(this.artist)
      })
      .catch((resp) => this.manageError(resp))
      .finally(() => (this.globalLoading = false));


      if(e.data.notifiable_id == this.user.id) {
        this.user.unread_notifications.unshift({
          data : {
            user_id : e.data.user_id,
            user_profile_photo: this.artist.profile_photo ? this.artist.profile_photo : '/img/avatar.png',
            user_username : this.artist.username,
            type : e.data.type,
            message : e.data.message,
            url : e.data.url,
            created_at : new Date()
          }
        })
      }
    });
  },
  methods: {
    actionButton(url, id) {
      this.markAsRead(id)
      if (this.$route.path !== url) this.$router.push(url)
    },
    setNamebutton(type) {
      if(type != 'new-follower') {
        return 'Ir'
      }
    },
    markAsRead(id) {
      this.axios
        .get(this.ep.notifications.markAsRead+id)
        .then((resp) => {
          index = this.user.unread_notifications.indexOf({id: id})
          this.user.unread_notifications.splice(index, 1)
        })
        .catch((error) => this.showRequestErrors(error))
    }
  }
}
</script>

<style>
.dashboard nav.main-menu ul ul.sub-menu-notification {
  width: 500px !important;
  color: #000;

  position: absolute;
  background-color: #fff;
  padding: .5em;
  left: -300px;
  top: 50px;
  border: 1px solid;
  border-radius: 3px;
  transition: 0.3s;
  opacity: 0;
  visibility: hidden;
  box-shadow: 0 0 20px #555555;
}

.user-name {
  font-weight: 600;
  font-size: 12px !important;
  line-height: 133.9%;
  color: #1D1D1C;
}

.message {
  font-weight: 400;
  font-size: 9px;
  line-height: 133.9%;
}

.time {
  font-size: 8px;
  color: #000;
  font-weight: 900;
}

.visually-hidden {
  position: absolute!important;
  width: 1px!important;
  height: 1px!important;
  padding: 0!important;
  margin: -1px!important;
  overflow: hidden!important;
  clip: rect(0,0,0,0)!important;
  white-space: nowrap!important;
  border: 0!important;
}
</style>