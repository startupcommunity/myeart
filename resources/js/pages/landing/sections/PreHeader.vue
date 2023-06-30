<template>
    <div
        class="flex flex-row justify-between items-center bg-white px-2 h-20 sm:px-4"
    >
        <div class="md:w-2/6 hidden sm:flex"></div>
        <div class="w-2/4 md:w-2/6 pt-7">
            <div
                class="flex sm:justify-center items-center text-start sm:text-center text-dark"
            >
                <img src="/img/shipping.png" alt="shipping" />
                <b class="text-[10px] sm:text-lg">
                    ENVÍOS GRATIS A TODO EL MUNDO
                </b>
            </div>
        </div>
        <div class="w-2/4 md:w-2/6 pt-10">
            <p class="text-end text-primary">
                <span class="text-xs sm:text-lg font-bold">ESPAÑOL</span>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: "PreHeader",
};
</script>
