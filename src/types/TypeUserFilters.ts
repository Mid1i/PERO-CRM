import type { IFilters } from "@/interfaces/IFilters";


export type TypeUserFilters = { [K in keyof IFilters]: IFilters[K] extends Array<infer U> ? U : IFilters[K] };