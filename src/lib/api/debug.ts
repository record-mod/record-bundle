import { version, hash } from "record-build-info";

export const debugInfo = {
    record: {
        version,
        hash,
        loader: "unknown",
    },
};
