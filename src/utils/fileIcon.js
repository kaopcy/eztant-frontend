import {
    faFileWord,
    faFileExcel,
    faFilePdf,
    faFilePowerpoint,
    faFileAudio,
    faFileImage,
    faFileText,
    faFile,
    faFileVideo,
} from "@fortawesome/free-solid-svg-icons";

const formatMap = [
    {
        format: ["jpg", "png", "gif", "svg", "psd"],
        icon: faFileImage,
    },
    {
        format: ["csv", "xlsx", "xls"],
        icon: faFileExcel,
    },
    {
        format: ["doc", "docx"],
        icon: faFileWord,
    },
    {
        format: ["au", "wav", "mp3", "mp4"],
        icon: faFileAudio,
    },
    {
        format: ["pdf"],
        icon: faFilePdf,
    },
    {
        format: ["ppt", "pptx"],
        icon: faFilePowerpoint,
    },
    {
        format: ["txt"],
        icon: faFileText,
    },
    {
        format: ["mov", "avi"],
        icon: faFileVideo,
    },
];

export const fileIcon = filename => {
    if (!filename || filename.length <= 0) return;
    const type = filename.split(".").slice(-1)[0].toLowerCase();
    const format = formatMap.find((format) => format.format.includes(type));
    if(!format) return faFile
    return format.icon
};
