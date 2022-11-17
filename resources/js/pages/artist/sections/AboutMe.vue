<template>
    <section class="bg-gray-100">
        <div>
            <div class="flex flex-wrap">
                <div class="w-full md:w-1/2">
                    <div class="p-20">
                        <div class="w-full border-b border-zinc-800 pb-3">
                            <h3
                                class="uppercase text-primary font-bold text-2xl tracking-widest"
                            >
                                sobre mi
                            </h3>
                        </div>
                        <div class="w-full pt-3">
                            <h4
                                class="font-bold text-2xl text-justify text-zinc-900"
                            >
                                {{ profile?.bio_title ?? "---" }}
                            </h4>
                            <p class="font-normal text-base text-zinc-500">
                                {{ profile?.bio_content ?? "---" }}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    class="w-full md:w-1/2 bg-profile-about-me bg-no-repeat bg-cover h-96 md:min-h-[40rem]"
                ></div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: "AboutMe",
    props: {
        profile: {
            type: Object,
            default: () => {},
        },
    },
};
</script>
