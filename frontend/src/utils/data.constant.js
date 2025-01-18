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
        value: 10,
        label: "10 LPA",
    },
    {
        value: 40,
        label: "40 LPA",
    },
    {
        value: 100,
        label: "100 LPA",
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
