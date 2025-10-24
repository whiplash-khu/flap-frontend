import React, { useState, useEffect, useMemo } from "react";
import GroupDetailLayout from "../../components/layout/GroupDetailLayout";
import axios from "axios"; 
import { useParams } from 'react-router-dom'; 
import "./GroupFeePage.css";

const API_BASE_URL = "http://localhost:5173/";
const ACCESS_TOKEN = "Bearer 엑세스토큰"; 

const BANK_CODES = {
    2: "KDB산업은행", 3: "IBK기업은행", 4: "KB국민은행", 7: "수협은행",
    11: "NH농협은행", 20: "우리은행", 23: "SC제일은행", 27: "대구은행",
    31: "부산은행", 32: "경남은행", 34: "광주은행", 35: "제주은행",
    37: "전북은행", 39: "경남은행", 45: "MG새마을금고", 48: "신협",
    50: "저축은행", 64: "산림조합", 71: "우체국", 81: "하나은행",
    88: "신한은행", 89: "케이뱅크", 90: "카카오뱅크", 92: "토스뱅크",
    103: "SBI저축은행",
};


function GroupFeePage() {
    const { groupId } = useParams(); 
    const currentGroupId = groupId || 1; // groupId가 없을 경우 임시 값 1 사용

    const isAdmin = true; 

    const [feeData, setFeeData] = useState({});     
    const [scheduleList, setScheduleList] = useState([]); 
    const [submissionList, setSubmissionList] = useState([]);
    const [scheduleIndex, setScheduleIndex] = useState(0); 
    const [isLoading, setIsLoading] = useState(true); 

    const currentSchedule = useMemo(() => {
        return scheduleList[scheduleIndex] || { 
            id: null, 
            name: "회비 정보 없음", 
            endAt: "날짜 미정",
            amount: 0,
            account: "계좌 정보 없음"
        };
    }, [scheduleList, scheduleIndex]);

    const fetchFeeSchedules = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${API_BASE_URL}/groups/${currentGroupId}/fees`, 
                { headers: { Authorization: ACCESS_TOKEN } }
            );

            const data = response.data.data;
            if (data && data.length > 0) {
                setScheduleList(data);
                
            
                const latestFee = data[0]; 
                
                setFeeData({
                    total: latestFee.amount,
                    account: `${BANK_CODES[latestFee.bank] || latestFee.bank} ${latestFee.account}`,
                });
            } else {
                setScheduleList([]);
            }
        } catch (error) {
            console.error("회비 일정 로딩 실패:", error.response || error);
            setScheduleList([]);
        } finally {
            setIsLoading(false);
        }
    };
    

    const fetchSubmissions = async (feeId) => {
        if (!feeId) return;

        try {
            const response = await axios.get(
                `${API_BASE_URL}/groups/${currentGroupId}/fees/${feeId}/submissions`,
                { headers: { Authorization: ACCESS_TOKEN } }
            );

           
            const fetchedSubmissions = response.data.data;

            const members = fetchedSubmissions.map(sub => ({
                id: sub.user.id,
                name: sub.user.name,
                submissionId: sub.id, 
                status: sub.createdAt ? "완납" : "미납" 
            }));

            setSubmissionList(members); 
            
        } catch (error) {
            console.error(`납부 현황 로딩 실패 (Fee ID: ${feeId}):`, error.response || error);
            setSubmissionList([]);
        }
    };


    useEffect(() => {
        fetchFeeSchedules();
    }, [currentGroupId]);


    useEffect(() => {
        if (currentSchedule.id) {
            fetchSubmissions(currentSchedule.id);
        }
    }, [currentSchedule.id, currentGroupId]); 
    

    const handlePrevSchedule = () =>
        setScheduleIndex((prev) => Math.max(0, prev - 1));

    const handleNextSchedule = () =>
        setScheduleIndex((prev) => Math.min(scheduleList.length - 1, prev + 1));
        
    const handleCopyAccount = () => {
        if (feeData.account) {
            navigator.clipboard
                .writeText(feeData.account)
                .then(() => alert("계좌번호가 복사되었습니다."))
                .catch(() => alert("계좌번호 복사에 실패했습니다."));
        } else {
            alert("복사할 계좌 정보가 없습니다.");
        }
    };

    const handleStatusChange = async (memberId, currentStatus, newStatus, submissionId) => {
        const feeId = currentSchedule.id;
        if (!feeId || currentStatus === newStatus) return;
        
        setSubmissionList(prevList => prevList.map(m => 
            m.id === memberId ? { ...m, status: newStatus } : m
        ));

        try {
            if (newStatus === "완납" && currentStatus === "미납") {
            
                const response = await axios.post(
                    `${API_BASE_URL}/groups/${currentGroupId}/fees/${feeId}/submissions`,
                    { userId: memberId }, 
                    { headers: { Authorization: ACCESS_TOKEN } }
                );
                
                console.log("납부 기록 생성 성공:", response.data);
                
            } else if (newStatus === "미납" && currentStatus === "완납" && submissionId) {
               
                await axios.delete(
                    `${API_BASE_URL}/groups/${currentGroupId}/fees/${feeId}/submissions/${submissionId}`,
                    { headers: { Authorization: ACCESS_TOKEN } }
                );
                
                console.log("납부 기록 삭제 성공 (미납 처리)");
            }

          
            fetchSubmissions(feeId); 

        } catch (error) {
            console.error(`납부 상태 수정 실패 (${newStatus}):`, error.response || error);
            alert(`납부 상태 업데이트에 실패했습니다. (${error.response?.status || "네트워크 오류"})`);
            
           
            fetchSubmissions(feeId); 
        }
    };

    const adminView = (
        <div className="fee-admin-view">
            {isLoading && <div className="loading-text">회비 정보 로딩 중...</div>}
            
            <div className="date-nav-header">
                <button onClick={handlePrevSchedule} disabled={scheduleIndex === 0}>
                    &lt;
                </button>
                <div className="date-display">
                    <h4>{currentSchedule.name}</h4>
                    <span>{currentSchedule.endAt ? currentSchedule.endAt.split('T')[0] : '날짜 미정'}</span>
                </div>
                <button
                    onClick={handleNextSchedule}
                    disabled={scheduleIndex === scheduleList.length - 1}
                >
                    &gt;
                </button>
            </div>

            <div className="member-list">
                {submissionList.length === 0 && !isLoading ? (
                    <div className="empty-state">납부 대상 멤버가 없습니다.</div>
                ) : (
                    submissionList.map((member) => ( 
                        <div key={member.id} className="member-row">
                            <span>{member.name}</span>
                            <select
                                className="status-select"
                                value={member.status}
                                onChange={(e) => 
                                    handleStatusChange(
                                        member.id, 
                                        member.status, 
                                        e.target.value, 
                                        member.submissionId
                                    )
                                }
                            >
                                <option>미납</option>
                                <option>완납</option>
                            </select>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    const userView = (
        <div className="fee-container">
            <div className="fee-box total-fee-box">
                <span className="label">회비</span>
                <span className="amount">{feeData.total ? feeData.total.toLocaleString() : '0'}원</span>
            </div>
            <div className="fee-box account-box">
                <span className="label">정산계좌</span>
                <div className="account-info">
                    <span className="account-number">{feeData.account || '계좌 정보 없음'}</span>
                    <button onClick={handleCopyAccount}>복사</button>
                </div>
            </div>
        </div>
    );

    return (
        <GroupDetailLayout groupName="스트리트 푸드 파이터">
            {isAdmin ? adminView : userView}
        </GroupDetailLayout>
    );
}

export default GroupFeePage;