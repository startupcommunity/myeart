<template>
    <div class="lg:py-28 bg-mobile-newsletter md:bg-newsletter bg-cover bg-no-repeat bg-center">
        <div class="container py-6 sm:py-0">
            <h2 class="font-black text-xl lg:text-3xl leading-10 text-white text-center">
                El newsletter para grandes artistas
            </h2>
            <div class="flex justify-center items-center">
                <div class="input-group w-full lg:w-1/2 py-8">
                    <input
                        type="text"
                        class="form-control h-14"
                        aria-label="Text input with dropdown button"
                    />
                    <div class="input-group-append">
                        <button class="btn btn-dark px-5 text-gray-200">SUSCRÍBETE</button>
                    </div>
                </div>
            </div>
            <h5 class="text-white font-light tracking-wider text-sm text-center uppercase">100% arte, 0% spam, lo prometemos.</h5>
        </div>
    </div>
</template>
<script>
export default {
    name: "NewLetter",
};
</script>
