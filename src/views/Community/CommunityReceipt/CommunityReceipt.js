import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchReceipt } from "../../../composables/fetch/useFetchReceipt";

const Communityreceipt = () => {
    const { data: receipt, mutate: fetchReceipt, isLoading } = useFetchReceipt();
    const { id: commuID } = useParams();
    useEffect(() => {
        fetchReceipt({ commuID });
    }, [fetchReceipt, commuID]);

    useEffect(() => {
        if (!receipt) return;
        console.log(receipt?.data[0].sections);
    }, [receipt]);

    return (
        !isLoading && (
            <div className="flex w-full flex-col">
                {receipt?.data?.[0]?.sections.map(section => (
                    <div className="">
                        <div className="">{section.section}</div>
                        <div className="">
                            {section.records_by_section.map(eachsec => (
                                <div className="">
                                    <div className="">{eachsec?.owner_id?.firstname}</div>
                                    {eachsec.records_by_student.map(record => (
                                        <div className="">{record.attend_date}</div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )
    );
};

const Receipt = () => {
    return <div className="flex flex-col "></div>;
};

export default Communityreceipt;
