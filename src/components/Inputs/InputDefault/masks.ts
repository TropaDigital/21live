import React, { FormEvent } from "react";

export function currency(e: React.FormEvent<HTMLInputElement>) {
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1.$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

  e.currentTarget.value = value;
  return e;
}

export function dateTimeMask(e: FormEvent<HTMLInputElement>) {
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1:$2');
  // value = value.slice(0, 5);

  e.currentTarget.value = value;
  return e;
}