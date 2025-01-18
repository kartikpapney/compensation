export const columns = [
    {
        id: "company",
        numeric: false,
        disablePadding: false,
        text: ["Company"],
        sortBy: "createdAt",
        label: ["City", "Date"],
    },
    {
        id: "role",
        numeric: false,
        disablePadding: false,
        text: ["Role"],
    },
    {
        id: "yoe",
        numeric: false,
        disablePadding: false,
        text: ["Yoe"],
        sortBy: "yoe",
    },
    {
        id: "ctc",
        numeric: true,
        disablePadding: false,
        text: ["Total"],
        label: ["Base"],
        sortBy: "ctc",
    },
    {
        id: "hike",
        numeric: false,
        disablePadding: false,
        text: ["Hike"],
    },
];
export const ctcSliderMarks = [
    { value: -1, label: "N/A" },
    {
        value: 25,
        label: "25 LPA",
    },
    {
        value: 77,
        label: "50 LPA",
    },
    {
        value: 150,
        label: "1.5 Cr",
    },
];
export const yoeSliderMarks = [
    { value: -1, label: "N/A" },
    {
        value: 2,
        label: "2 YOE",
    },
    {
        value: 5,
        label: "5 YOE",
    },
    {
        value: 15,
        label: "15 YOE",
    },
    { value: 20, label: "N/A" },
];
