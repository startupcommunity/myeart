<template>
    <div class="search-section py-10">
        <div class="container text-center">
            <h2 class="font-extrabold text-white text-lg lg:text-3xl xl:text-4xl">
                El newsletter para grandes artistas
            </h2>
            <div class="hero-btns d-flex justify-content-center">
                <div class="input-group">
                    <input
                        type="text"
                        class="form-control h-14"
                        aria-label="Text input with dropdown button"
                    />
                    <div class="input-group-append">
                        <button class="btn btn-dark px-5">SUSCRÍBETE</button>
                    </div>
                </div>
            </div>
            <h5 class="mt-5 text-white font-light tracking-wider">100% arte, 0% spam, lo prometemos.</h5>
        </div>
    </div>
</template>
<script>
export default {
    name: "NewLetter",
};
</script>
