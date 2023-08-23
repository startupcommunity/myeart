/**
 * Gestiona los textos/string de la app
 *
 * @autor  Luis Annunziato: luisannunziato@gmail.com
 * @link https://luisan.dev
 */

/**
 * Pago exitoso
 */
export const SUCCESS_STRIPE_PAYOUT =
    "Se ha enviado la solicitud de retiro de fondos, su dinero estará disponible en su banco en los próximos 3 a 7 días hábiles";

/**
 * Pago fallido
 */
export const FAIL_STRIPE_PAYOUT =
    "Ha ocurrido un error al procesar su solicitud de retiro de fondos, por favor intente nuevamente";

/**
 * No posee método de cobro
 */
export const NO_CHARGING_METHOD = "No posee ningún método de cobro registrado";

/**
 * Agregar método de cobro
 */
export const ADD_CHARGING_METHOD = "Agregar método de cobro";

/**
 * Retirar fondos de stripe
 */
export const WITHDRAW_STRIPE_FUNDS = "Retirar fondos";

/**
 * Enviar fondos a cuenta bancaria - {params}
 */
export const SEND_FUNDS_TO_BANK_ACCOUNT = (first, last) =>
    `Enviar fondos a la cuenta bancaria ${first}********${last}`;

/**
 * Notificacion correcta
 */
export const SUCCESS_TITLE_NOTY = "¡Exitoso!";

/**
 * Notificacion informática
 */
export const INFO_TITLE_NOTY = "¡Aviso!";

/**
 * Volver
 */
export const BACK = "Volver";
