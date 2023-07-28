<template>
    <section class="fixed bottom-0 z-[999] right-0 sm:right-80">
        <div class="container">
            <div class="flex flex-row-reverse gap-3 items-end">
                <Chat v-for="chat in globalChats" :key="chat.id" :chat="chat" />
            </div>
        </div>
    </section>
</template>

<script>
import Chat from "./components/Chat.vue";
import useChat from "./mixins/useChat";
export default {
    name: "SectionChat",
    components: { Chat },
    mixins: [useChat],
};
</script>
