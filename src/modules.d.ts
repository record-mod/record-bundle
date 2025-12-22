declare module "record-build-info" {
    const version: string;
    const hash: string;
}

declare module "*.png" {
    const str: string;
    export default str;
}
