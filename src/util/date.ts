import { isNumber, isString, isUndefined } from "@fxts/core";

import { Regex } from "./type/regex";

export namespace DateUtil {
    export function toEpoch(): number;
    export function toEpoch(date: Date): number;
    export function toEpoch(iso: Regex.DateTime): number;
    export function toEpoch(input?: Date | Regex.DateTime): number {
        const date = isUndefined(input)
            ? new Date()
            : isString(input)
              ? new Date(input)
              : input;
        return Math.floor(date.getTime() / 1000);
    }
    export function toISO(): Regex.DateTime;
    export function toISO(epoch: number): Regex.DateTime;
    export function toISO(date: Date): Regex.DateTime;
    export function toISO(input?: number | Date): Regex.DateTime {
        const date = isUndefined(input)
            ? new Date()
            : isNumber(input)
              ? new Date(input * 1000)
              : input;
        return date.toISOString();
    }
    export function toDate(): Date;
    export function toDate(iso: Regex.DateTime): Date;
    export function toDate(epoch: number): Date;
    export function toDate(input?: number | Regex.DateTime): Date {
        return isUndefined(input)
            ? new Date()
            : isString(input)
              ? new Date(input)
              : new Date(input * 1000);
    }

    export const sec = (sec: number, now?: Date): Date =>
        new Date((now ?? new Date()).getTime() + sec * 1000);
    export const minute = (minute: number, now?: Date): Date =>
        sec(minute * 60, now);
    export const hour = (hour: number, now?: Date): Date =>
        minute(hour * 60, now);
    export const day = (day: number, now?: Date): Date => hour(day * 24, now);
}
