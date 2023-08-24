/**
 * Gestiona los textos/string de la app
 *
 * @autor  Luis Annunziato: luisannunziato@gmail.com
 * @link https://luisan.dev
 */

// pago exitoso
export const SUCCESS_STRIPE_PAYOUT =
    "Se ha enviado la solicitud de retiro de fondos, su dinero estará disponible en su banco en los próximos 3 a 7 días hábiles";

// pago fallido
export const FAIL_STRIPE_PAYOUT =
    "Ha ocurrido un error al procesar su solicitud de retiro de fondos, por favor intente nuevamente";

// No posee método de cobro
export const NO_CHARGING_METHOD = "No posee ningún método de cobro registrado";

// Agregar método de cobro
export const ADD_CHARGING_METHOD = "Agregar método de cobro";

// Retirar fondos de stripe
export const WITHDRAW_STRIPE_FUNDS = "Retirar fondos";

// Enviar fondos a cuenta bancaria - {params}
export const SEND_FUNDS_TO_BANK_ACCOUNT = (first, last) =>
    `Enviar fondos a la cuenta bancaria ${first}********${last}`;

// Notificacion correcta
export const SUCCESS_TITLE_NOTY = "¡Exitoso!";

// Notificacion informática
export const INFO_TITLE_NOTY = "¡Aviso!";

// Volver
export const BACK = "Volver";

// Cancelar
export const CANCEL = "Cancelar";

// Obra guardada como borrador
export const DRAFT_ARTWORK = "Obra guardada como borrador";

// Obra guardada como borrador
export const PUBLISH_ARTWORK = "Obra publicada con éxito";

// ¿Esta seguro de publicar esta obra?
export const CONFIRM_PUBLISH_ARTWORK = "¿Esta seguro de publicar esta obra?";

// ¿Esta seguro de guardar esta obra como borrador?
export const CONFIRM_DRAFT_ARTWORK =
    "¿Esta seguro de guardar esta obra como borrador?";

// Si, Publicar
export const YES_PUBLISH = "Si, Publicar";

// "Si, Guardar"
export const YES_DRAFT = "Si, Guardar";

// "Por favor, revisa los campos, algunos son requeridos"
export const REQUIRED_FIELDS =
    "Por favor, revisa los campos, algunos son requeridos";

// "Uno o mas archivos son inválidos, verifique!"
export const INVALID_FILES = "Uno o mas archivos son inválidos, verifique!";

// Solo puede cargar un máximo de ${MAX_FILES_ALLOWED} imágenes
export const ONLY_MAX_FILES_ALLOWED = (max) =>
    `Solo puede cargar un máximo de ${max} imágenes`;

// No se ha encontrado el recurso solicitado {código de error}
export const NOT_FOUND_RESOURCE = (code) =>
    `No se ha encontrado el recurso solicitado - código de error ${code}`;

// Tarjeta
export const CARD = "Tarjeta";
// Cuenta bancaria
export const BANK_ACCOUNT = "Cuenta bancaria";
// Débito SEPA
export const SEPA_DEBIT = "Débito SEPA";
// Desconocido
export const UNKNOWN = "Desconocido";
// pendiente
export const PENDING = "Pendiente";
// pagado
export const PAID = "Pagado";
// fallido
export const FAILED = "Fallido";
