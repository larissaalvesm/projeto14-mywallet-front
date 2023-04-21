import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NewTransactionPage() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {

        if (!token) {
            navigate("/");
        }
    }, [])

}  