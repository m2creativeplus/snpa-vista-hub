/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as clients from "../clients.js";
import type * as inventory from "../inventory.js";
import type * as isbn from "../isbn.js";
import type * as ministries from "../ministries.js";
import type * as printJobs from "../printJobs.js";
import type * as products from "../products.js";
import type * as qualityControl from "../qualityControl.js";
import type * as requisitions from "../requisitions.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  clients: typeof clients;
  inventory: typeof inventory;
  isbn: typeof isbn;
  ministries: typeof ministries;
  printJobs: typeof printJobs;
  products: typeof products;
  qualityControl: typeof qualityControl;
  requisitions: typeof requisitions;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
