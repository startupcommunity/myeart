<template>
<!-- <div> -->
  <li class="menu-items-sub">
    <div class="header-icons">
        <a
            class="mobile-hide search-bar-icon uppercase hover:no-underline"
            href="#"
        >
          <div class="position-relative">
            <span class="badge badge-super rounded bg-danger" v-if="notifications.length > 0">
              <span class="visually-hidden">unread messages</span>
            </span>
            <i class="fas fa-bell"></i>
          </div>
        </a>
    </div>
    <ul class="sub-menu large"  v-if="notifications.length > 0">
      <div class="bg-white">
        <table class="table-notifications">
          <tr v-for="notification in notifications" :key="notification.id">
            <td>
             <img :src="notification.data.user_profile_photo" class="rounded border" >
            </td>
            <td>
              <p class="user-name">
                {{notification.data.user_username}}
              </p>
              <p class="message">
                {{notification.data.message}}
              </p>
            </td>
            <td>
              <timeago class="time" :datetime="notification.data.created_at" :auto-update="60"></timeago>
            </td>
            <td>
              <button class="btn btn-primary btn-sm" v-if="notification.data.type != 'new-follower'"
              @click="actionButton(notification.data.url, notification.data.type)"
              >
              {{setNamebutton(notification.data.type)}}
             </button>
            </td>
          </tr>
        </table>        
      </div>
    </ul>
</li>
<!-- <v-row justify="center">
  <v-dialog v-model="showModal" persistent width="800">
      <v-card class="bg-gray-one mt-12">
          <v-card-title class="hidden sm:block">
              <div class="flex justify-end">
                  <button
                      type="button"
                      @click="$emit('close-modal-edit-front-photo')"
                  >
                      <i class="fa fa-times text-primary"></i>
                  </button>
              </div>
          </v-card-title>
          <v-card-text>
              <AnkaCropper
                  :options="ankaOptions"
                  @cropper-error="errorCropper"
                  @cropper-saved="savedCropper"
                  :key="ankaKey"
              />
          </v-card-text>
          <v-card-actions class="bg-white">
              <div class="flex flex-wrap w-full">
                  <div class="w-full md:w-3/6">
                      <v-btn
                          class="text-primary"
                          depressed
                          block
                          large
                          text
                          @click="clickBtnSaved()"
                      >
                          Cambiar imagen
                      </v-btn>
                  </div>
                  <div class="w-full md:w-3/6">
                      <v-btn
                          class="text-dark"
                          block
                          large
                          depressed
                          text
                          @click="
                              $emit('close-modal-edit-front-photo')
                          "
                      >
                          Cancelar
                      </v-btn>
                  </div>
              </div>
          </v-card-actions>
      </v-card>
  </v-dialog>
</v-row> -->

<!-- </div> -->

</template>

<script>
import VueTimeago from 'vue-timeago'
import { mapGetters } from "vuex";
Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'es', 
})
export default {
  name:'Notifications',
  props: [
      'notifications'
  ],
  mounted() {
    window.Echo.channel('notification-channel')
      .listen('NotificationEvent', (e) => {
        console.log(e)
        this.notifications.unshift({
        data : {
          user_id : e.data.user_id,
          user_profile_photo: e.data.user_profile_photo,
          user_username : e.data.user_username,
          type : e.data.type,
          message : e.data.message,
          url : e.data.url,
          created_at : new Date()
        }
      })
    });
  },
  computed: {
      /**
       * Acceder a los getters necesarios
       * user profile
       */
      ...mapGetters({
          user: "getProfile",
      }),
  },
  methods: {
    actionButton(url, type) {
      if(type == 'new-follower') {
        this.followArtist
      } else {
        router.push(url)
      }
    },
    setNamebutton(type) {
      if(type == 'new-follower') {
        return 'Seguir'
      } else {
        return 'Ir'
      }
    }
  }
}
</script>

<style>
.bg-white {
  background-color: #fff;
}
.large {
  width: 400px !important;
}
.user-name {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 133.9%;
  text-align: center;
  color: #1D1D1C;
}

.message {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 133.9%;
  color: #1D1D1C;

  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
}

.time {
  font-size: 12px;
  color: #000;
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