import { api } from './api';
import { useEffect } from "react";

export const fetchFollows = async (setFollows) => {
    try{
        const res = await api.get('/follows',{withCredentials:true,withXSRFToken:true});
        const ids = res.data?.users?.map((f) => f.id);
        setFollows(ids);
    }catch(err){
        console.log(err?.response?.data);
    }
}

export const toggleFollowAction = async (id,follows,setFollows,type='all',setStatistics,statistics) => {
    let previousFollows = [...follows];
    setFollows((prev) => {
        previousFollows = prev;

        if (prev.includes(id)) {
            if (type === 'profile'){
                setStatistics(prev => ({ ...prev, followers: statistics.followings - 1 }));
            }
            return prev.filter(f => f !== id);
        } else {
            if (type === 'profile'){
                setStatistics(prev => ({ ...prev, followers: statistics.followings + 1 }));
            }
            return [...prev, id];
        }
    })
    try {
        const res = await api.post('/follows', { followingID: id }, { withCredentials: true, withXSRFToken: true });
        if (res.data.status === "followed") {
            setFollows(prev => [...prev, id]);
            // setStatistics(prev => ({...prev,followings:statistics.followings+1}));
        }
    } catch (err) {
        setFollows(previousFollows);
        console.log(err.response?.data);
    }
}
