<template>
    <section class="fixed right-0 bottom-0 z-[999]">
        <div class="container">
            <div class="flex flex-row-reverse gap-3 items-end">
                <Chat
                    v-for="(chat, index) in globalChats"
                    :key="index"
                    :chat="chat"
                />
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
