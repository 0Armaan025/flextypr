"use client";
import { usePathname } from "next/navigation";

const RoomSubPage = () => {

    const code = usePathname().split("/")[2];

    return (
        <div>{code}</div>
    );
}

export default RoomSubPage;