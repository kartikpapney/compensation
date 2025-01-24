export const columns = [
    {
        id: "company",
        numeric: false,
        disablePadding: false,
        text: ["Company"],
        sortBy: "createdAt",
        label: [
            {
                id: "location",
                text: "City",
            },
            {
                id: "date",
                text: "Date",
            },
        ],
        mobile: true,
        align: "left",
        link: true,
    },
    {
        id: "role",
        numeric: false,
        disablePadding: false,
        label: [],
        text: ["Role"],
        mobile: false,
        align: "right",
        link: false,
    },
    {
        id: "yoe",
        numeric: false,
        disablePadding: false,
        text: ["Yoe"],
        sortBy: "yoe",
        mobile: false,
        label: [],
        align: "right",
        link: false,
    },
    {
        id: "ctc",
        numeric: true,
        disablePadding: false,
        text: ["Total (LPA)"],
        label: [
            {
                id: "base",
                text: "Base (LPA)",
            },
        ],
        sortBy: "ctc",
        mobile: true,
        align: "right",
        link: false,
    },
    {
        id: "hike",
        numeric: false,
        disablePadding: false,
        text: ["Hike"],
        mobile: false,
        label: [],
        align: "right",
        link: false,
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
        label: "2 yrs",
    },
    {
        value: 5,
        label: "5 yrs",
    },
    {
        value: 15,
        label: "15 yrs",
    },
    { value: 20, label: "N/A" },
];
