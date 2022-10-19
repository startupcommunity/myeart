<template>
    <div
        class="flex flex-row justify-between items-center bg-white px-2 sm:px-4"
    >
        <div class="flex-auto w-4/5 sm:w-[90%]">
            <div
                class="flex flex-wrap sm:justify-center items-center text-start sm:text-center text-dark"
            >
                <img src="/img/shipping.png" alt="shipping" />
                <div>
                    <b class="text-[10px] sm:text-lg text-">
                        ENVÍOS GRATIS A TODO EL MUNDO
                    </b>
                </div>
            </div>
        </div>
        <div class="text-end text-primary flex-auto w-1/5 sm:w-[10%]">
            <b class="text-xs sm:text-lg">ESPAÑOL</b>
        </div>
    </div>
</template>
<script>
export default {
    name: "PreHeader",
};
</script>
