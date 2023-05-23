declare const fs: any;
declare const S3: any;
declare var AWS: any;
declare const bucket = "wt-vp";
declare const region = "ap-northeast-1";
declare const accessKeyId = "AKIAZSUATQL7CVQDORE3";
declare const secretAccessKey = "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";
declare const endpoint = "s3://arn:aws:s3:ap-northeast-1:658473452286:accesspoint/wt-vp/assets/";
declare const awsS3BaseUrl = "https://wt-vp.s3.ap-northeast-1.amazonaws.com/";
declare function uploadFile(file: any, path?: string, name?: string): Promise<{
    isSuccess: boolean;
    url: string;
    message?: undefined;
} | {
    isSuccess: boolean;
    message: string;
    url?: undefined;
}>;
declare function getAllFile(): Promise<{
    isSuccess: boolean;
    message: string;
} | undefined>;
declare function deleteFile(path: string): Promise<{
    isSuccess: boolean;
    deletePromise: any;
    message?: undefined;
} | {
    isSuccess: boolean;
    message: string;
    deletePromise?: undefined;
}>;
declare function makeName(length: number): string;
