import typia from "typia";

import { Num } from "@SRC/util/type/num";

export namespace IPage {
    export interface IPaginated<T> {
        data: T[];
        page: Num.Int64;
    }

    export interface ISearch {
        /**
         * @default 1
         */
        page?: Num.Int64 & typia.tags.Minimum<1>;
        /**
         * @default 10
         */
        size?: Num.Int64 & typia.tags.Minimum<10> & typia.tags.Maximum<50>;
    }
}
