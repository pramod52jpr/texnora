import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function LoginSession() {
    const navigate = useNavigate();
    const [allAdmins, setAllAdmins] = useState([]);
    async function fetchAllAdmins() {
        const token = process.env.REACT_APP_TOKEN;
        const adminApi = process.env.REACT_APP_ADMIN_API;
        await fetch(adminApi, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            setAllAdmins(res.data);
        }).catch((e) => {
            console.log("the error is " + e);
        })
    }
    useEffect(() => {
        fetchAllAdmins().then(() => {
            const id = localStorage.getItem("id");
            if (id === null) {
                navigate("/admin");
                console.log("first");
            } else {
                const user = allAdmins.filter(ele => ele.id === parseInt(id));
                if (user.length === 0) {
                    navigate("/admin");
                }
            }
        });
    }, []);
    return null;
}
