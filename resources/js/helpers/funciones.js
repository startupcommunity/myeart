function errorMessageHelpers(vue, field) {
    let msg = "";
    if (!field.$dirty) return msg;
    if (field.hasOwnProperty("required") && field.required == false) {
        return vue.$t("validation.required");
    }
    if (
        field.hasOwnProperty("requiredSelect") &&
        field.requiredSelect == false
    ) {
        return vue.$t("validation.required");
    }
    Object.keys(field).forEach((e) => {
        if (e.indexOf("$") == -1 && field[e] == false && e != "required") {
            if (["minLength"].includes(e)) {
                msg =
                    vue.$t("validation.min") +
                    " " +
                    field.$params.minLength.min +
                    " " +
                    vue.$t("validation.chars");
            } else if (["maxLength"].includes(e)) {
                msg =
                    vue.$t("validation.max") +
                    " " +
                    field.$params.maxLength.max +
                    " " +
                    vue.$t("validation.chars");
            } else if (["onlyMayusText"].includes(e)) {
                msg = vue.$t("validation.alpha");
            } else if (["onlyMayusTextEspecial"].includes(e)) {
                msg = vue.$t("validation.onlyMayusTextEspecial");
            } else if (["numeric"].includes(e)) {
                msg = vue.$t("validation.onlyNumber");
            } else if (["minValue"].includes(e)) {
                msg =
                    vue.$t("validation.minValueIs") +
                    " " +
                    field.$params.minValue.min;
            } else if (["maxValue"].includes(e)) {
                msg =
                    vue.$t("validation.maxValueIs") +
                    " " +
                    field.$params.maxValue.max;
            } else if (["SoloDecimales"].includes(e)) {
                msg = vue.$t("validation.onlyNumber");
            } else if (["validationSeal"].includes(e)) {
                msg = vue.$t("validation.validationSeal");
            } else if (["nameLength"].includes(e)) {
                msg = vue.$t("validation.nameLength");
            } else if (["TimeValidate"].includes(e)) {
                msg = vue.$t("validation.RangeValidate");
            } else if (["RangeValidate"].includes(e)) {
                msg = vue.$t("validation.RangeValidate");
            } else {
                msg = vue.$t("validation." + e);
            }
        }
    });
    return msg;
}

//nota: esta funcion debe ser incluida en los methods de la intancia de vue para evitar error
function errorMessage(field) {
    return errorMessageHelpers(this, field);
}

function hasError(field) {
    return field.$dirty ? !field.$error : null;
}

export { errorMessageHelpers, errorMessage, hasError };
