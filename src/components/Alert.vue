<template>
  <transition-group
    class="ui alert-container"
    tag="div"
    name="message-list"
  >
    <div
      v-for="message in messages"
      :key="message.index"
      class="ui icon message alert-content"
      :class="message.level"
    >
      <i
        :class="message.icon"
        class="icon"
      ></i>
      <i class="close icon" @click="closeMessage(message)"></i>
      <div class="content">
        <div class="header">
          {{ message.header }}
        </div>
        <p>{{ message.content }}</p>
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'AlertSingletion',
  data: () => ({
    messages: [],
    now_id: 0
  }),
  methods: {
    addMessage (level, header, content, timeout=8000) {
      const level_icon = {
        success: ['checkmark', 'box'],
        info: ['info', 'circle'],
        warning: ['warning', 'sign'],
        error: ['remove', 'circle']
      }

      const message = {
        icon: level_icon[level],
        header: header,
        content: content,
        level: level,
        index: this.now_id ++
      }

      this.messages.push(message)

      if (timeout !== 0) {
        setTimeout(() => {
          this.closeMessage(message)
        }, timeout)
      }
    },
    closeMessage (message) {
      const index = this.messages.indexOf(message)
      if (index !== -1) {
        this.messages.splice(index, 1)
      }
    }
  }
}
</script>

<style>
.alert-content {
  transition: all 1s;
}

.message-list-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.message-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.message-list-leave-active {
  position: absolute;
}

.ui.alert-container {
  top: 4.2em;
  right: 1.2em;
  position: fixed;
  z-index: 2000;
  width: inherit;
}

.ui.alert-content {
  display: flex;
  width: 100%;
  align-items: center;
}
</style>
