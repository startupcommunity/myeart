<template>
    <div class="search-section">
        <div class="container text-center">
            <h2 style="font-size: 48px">El newsletter para grandes artistas</h2>
            <div class="hero-btns d-flex justify-content-center">
                <div class="input-group">
                    <input
                        type="text"
                        style="height: 60px; border-radius: 0px; opacity: 0.5"
                        class="form-control"
                        aria-label="Text input with dropdown button"
                    />
                    <div class="input-group-append">
                        <button
                            style="padding-left: 20px; padding-right: 20px"
                            class="btn btn-dark"
                            type="button"
                        >
                            SUSCRÍBETE
                        </button>
                    </div>
                </div>
            </div>
            <h5 style="margin-top: 20px">100% arte, 0% spam, lo prometemos.</h5>
        </div>
    </div>
</template>
<script>
export default {
  name: 'NewLetter'
};
</script>
