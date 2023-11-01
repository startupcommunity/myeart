<template>
    <section class="bg-gray-100">
        <div class="container">
            <div class="md:-mr-60 md:-my-3 py-7 py-md-0">
                <div class="flex flex-wrap">
                    <div class="w-full md:w-1/2 order-2 order-md-1">
                        <div class="md:py-20 md:pr-10">
                            <div class="w-full border-b border-zinc-800 pb-md-5 pt-5 pt-md-0">
                                <h3
                                    class="uppercase text-primary font-bold text-lg md:text-2xl tracking-widest"
                                >
                                    sobre mi
                                </h3>
                            </div>
                            <div class="w-full pt-2 pt-md-5">
                                <h4
                                    class="font-bold text-base md:text-2xl text-justify text-zinc-900 pb-5"
                                >
                                    {{ profile?.bio_title ?? "---" }}
                                </h4>
                                <p class="font-normal text-sm md:text-base text-zinc-500">
                                    {{ profile?.bio_content ?? "---" }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        class="w-full md:w-1/2 bg-profile-about-me bg-no-repeat bg-cover h-96 md:min-h-[40rem] order-1 order-md-2"
                    ></div>
                </div>
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
