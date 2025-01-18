"use client";

import CenteredLayout from "@/components/CenteredLayout";
import SortableTable from "@/components/SortableTable";
import { Autocomplete, Slider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {columns, yoeSliderMarks, ctcSliderMarks} from "../utils/data.constant"
export default function Home() {
    

    const router = useRouter();
    const searchParams = useSearchParams();

    const [minYoe, setMinYoe] = useState(() => Number(searchParams.get("minYoe")) || -1);
    const [maxYoe, setMaxYoe] = useState(() =>
        searchParams.get("maxYoe") === "Infinity" ? Infinity : Number(searchParams.get("maxYoe")) || Infinity
    );
    const [minCtc, setMinCtc] = useState(() => Number(searchParams.get("minCtc")) || -1);
    const [order, setOrder] = useState(() => searchParams.get("order") || "desc");
    const [orderBy, setOrderBy] = useState(() => searchParams.get("orderBy") || "createdAt");
    const [page, setPage] = useState(() => Number(searchParams.get("page")) || 0);

    const [total, setTotal] = useState(0);
    const [rows, setRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [location, setLocation] = useState([]);
    const [company, setCompany] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [ctcRange, setCtcRange] = useState([]);
    const [yoeRange, setYoeRange] = useState([]);

    const updateInUrl = () => {
        const query = {
            minCtc,
            minYoe,
            maxYoe: maxYoe === Infinity ? "Infinity" : maxYoe, // Handle Infinity
            order,
            orderBy,
            page,
            rowsPerPage,
        };

        const queryString = Object.keys(query)
            .map((key) => `${key}=${encodeURIComponent(query[key])}`)
            .join("&");

        router.push(`?${queryString}`, undefined, { shallow: true });
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `/api?skip=${page * rowsPerPage}&limit=${rowsPerPage}&sortBy=${orderBy}&sort=${
                        order === "asc" ? 1 : -1
                    }&minCtc=${minCtc}&minYoe=${minYoe}&maxYoe=${maxYoe}&_company=${selectedCompanies.map((e)=>e._id).join(",")}&_location=${selectedLocations.map((e)=>e._id).join(",")}`
                );
                const data = await response.json();
                const rowsData = data.data.data.map((offer) => {
                    return {
                        id: offer._id,
                        company: offer._company.name,
                        location: offer._location.name || "N/A",
                        date: new Date(offer.createdAt * 1000).toLocaleDateString(),
                        role: offer.offeredRole,
                        offeredRole: offer.offeredRole,
                        yoe: offer.yoe == -1 ? "N/A" : offer.yoe,
                        ctc: offer.ctc == -1 ? "N/A" : offer.ctc,
                        base: offer.base == -1 ? "N/A" : offer.base,
                        hike:
                            offer.prevCtc == -1 || offer.ctc == -1
                                ? "N/A"
                                : `${Math.round(((offer.ctc - offer.prevCtc) / offer.prevCtc) * 100)}%`,
                        link: offer.link,
                    };
                });
                setTotal(data.data.total);
                setRows([...rowsData]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        updateInUrl();
        fetchData();
    }, [page, rowsPerPage, order, orderBy, minCtc, minYoe, maxYoe, selectedCompanies, selectedLocations]);

    useEffect(() => {

        async function getLocation() {
            const locationData = await (await fetch("/api/location")).json();
            setLocation(locationData.data.data);
        }
        async function getCompany() {
            const companyData = await (await fetch("/api/company")).json();
            setCompany(companyData.data.data);
        }
        async function getManifest() {
            const {data} = await (await fetch("/api/manifest")).json();
            setYoeRange([data.minYoe, data.maxYoe])
            setCtcRange([data.minTotalCompensation, data.maxTotalCompensation])
        }

        getLocation()
        getCompany()
        getManifest()
    }, []);


    return (
        <CenteredLayout>
            <Autocomplete
                multiple
                id="tags-outlined-locations"
                options={location}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                onChange={(event, value) => {
                    setSelectedLocations(value);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Location" placeholder="Select location" />
                )}
            />
            <Autocomplete
                style={{ marginTop: '10px', marginBottom: '10px' }}
                multiple
                id="tags-outlined-companies"
                options={company}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                onChange={(event, value) => {
                    setSelectedCompanies(value);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Company" placeholder="Select company" />
                )}
            />
            <Slider
                marks={ctcSliderMarks}
                size="small"
                defaultValue={ctcRange[0]}
                value={minCtc}
                min={ctcRange[0]}
                max={ctcRange[1]}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={(e) => {
                    setMinCtc(e.target.value);
                }}
                valueLabelFormat={(value) => {
                    if (value === -1) {
                        return "N/A";
                    }
                    return value;
                }}
            />
            <Slider
                marks={yoeSliderMarks}
                size="small"
                getAriaLabel={() => "YOE range"}
                value={[minYoe, maxYoe]}
                min={yoeRange[0]}
                max={yoeRange[1]}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={(e) => {
                    setMinYoe(e.target.value[0]);
                    setMaxYoe(e.target.value[1]);
                }}
                valueLabelFormat={(value) => {
                    if (value === -1) {
                        return "N/A";
                    }
                    return value;
                }}
            />
            <SortableTable
                total={total}
                columns={columns}
                rows={rows}
                tableName="Compensation"
                order={order}
                orderBy={orderBy}
                page={page}
                rowsPerPage={rowsPerPage}
                setOrderBy={setOrderBy}
                setOrder={setOrder}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
            />
        </CenteredLayout>
    );
}
