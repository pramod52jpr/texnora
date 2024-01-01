import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginSession() {
    const navigate = useNavigate();
    const [allAdminData, setAllAdminData] = useState([]);
    async function fetchAllAdminData() {
        const token = process.env.REACT_APP_TOKEN;
        const adminApi = process.env.REACT_APP_ADMIN_API;
        await fetch(adminApi, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            const id = localStorage.getItem("id");
            setAllAdminData(res.data);
            if (id === null) {
                navigate("/admin");
                console.log("first");
            } else {
                const user = res.data.filter(ele => ele.id === parseInt(id));
                if (user.length === 0) {
                    navigate("/admin");
                }
            }
        }).catch((e) => {
            console.log("the error is " + e);
        })
    }
    useEffect(() => {
        fetchAllAdminData();
    }, []);
    return null;
}
