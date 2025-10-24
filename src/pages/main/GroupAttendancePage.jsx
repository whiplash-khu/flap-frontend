import React, { useState, useEffect, useMemo, useCallback } from "react";
import GroupDetailLayout from "../../components/layout/GroupDetailLayout";
import axios from "axios"; 
import { useParams } from 'react-router-dom';
import "./GroupAttendancePage.css";

const API_BASE_URL = "http://localhost:5173/";
const ACCESS_TOKEN = "Bearer 엑세스토큰";

const CURRENT_USER_ID = "user123"; //임시
// 임시 구성원 목록 데이터
const mockMembers = [
  { id: "user1", name: "너구리" },
  { id: "user2", name: "피카츄" },
  { id: "user3", name: "이름이" },
];

const mockSchedules = [
  { id: 1, title: "하이디라오에 가요", date: "2025/06/24" },
  { id: 2, title: "하이디라오에 가요", date: "2025/07/01" },
  { id: 3, title: "하이디라오에 가요", date: "2025/07/08" },
];

function GroupAttendancePage() {
    const { groupId } = useParams(); 
    const currentGroupId = groupId || 1; 
    const isAdmin = true; 

    const [scheduleList, setScheduleList] = useState([]); 
    const [attendanceList, setAttendanceList] = useState([]); 
    const [userAttendanceSummary, setUserAttendanceSummary] = useState({ attend: 0, absent: 0, late: 0 }); 
    const [scheduleIndex, setScheduleIndex] = useState(0); 
    const [isLoading, setIsLoading] = useState(true);

    const currentSchedule = useMemo(() => {
        return scheduleList[scheduleIndex] || { 
            id: null, 
            title: "일정 정보 없음", 
            endAt: "날짜 미정"
        };
    }, [scheduleList, scheduleIndex]);

 
    const totalUserAttendance = userAttendanceSummary.attend + userAttendanceSummary.absent + userAttendanceSummary.late;
    const attendanceRate =
        totalUserAttendance > 0 ? Math.round((userAttendanceSummary.attend / totalUserAttendance) * 100) : 0;
    

    const fetchSchedules = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/groups/${currentGroupId}/schedules`, 
                { headers: { Authorization: ACCESS_TOKEN } }
            );
            if (response.data.data && response.data.data.length > 0) {
                setScheduleList(response.data.data);
            }
        } catch (error) {
            console.error("일정 목록 로딩 실패:", error.response || error);
        }
    };
    
    const fetchUserAttendanceSummary = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/groups/${currentGroupId}/users/${CURRENT_USER_ID}/attendance`,
                { headers: { Authorization: ACCESS_TOKEN } }
            );

          
            if (response.data.data && response.data.data.counts) {
                setUserAttendanceSummary(response.data.data.counts);
            }

        } catch (error) {
            console.error("사용자 출석 통계 로딩 실패:", error.response || error);
            setUserAttendanceSummary({ attend: 0, absent: 0, late: 0 });
        }
    }


    const fetchScheduleAttendance = useCallback(async (scheduleId) => {
        if (!scheduleId) return;

        try {
            const response = await axios.get(
         
                `${API_BASE_URL}/groups/${currentGroupId}/schedules/${scheduleId}/attendances`,
                { headers: { Authorization: ACCESS_TOKEN } }
            );

            const fetchedAttendances = response.data.data;
            
        
            const members = fetchedAttendances.map(a => ({
                id: a.user.id,
                name: a.user.name,
                attendanceId: a.id, 
                status: a.status === 'PRESENT' ? '출석' : a.status === 'LATE' ? '지각' : '결석' 
            }));
            
            setAttendanceList(members);
            
        } catch (error) {
            console.error(`출석 현황 로딩 실패 (Schedule ID: ${scheduleId}):`, error.response || error);
            setAttendanceList([]);
        }
    }, [currentGroupId]); 

    
    useEffect(() => {
        setIsLoading(true);
        fetchSchedules();
        fetchUserAttendanceSummary(); 
        setIsLoading(false);
    }, [currentGroupId]);


    useEffect(() => {
        if (isAdmin && currentSchedule.id) {

            fetchScheduleAttendance(currentSchedule.id);
        }
    }, [currentSchedule.id, fetchScheduleAttendance, isAdmin]); 
    
    const handlePrevSchedule = () =>
        setScheduleIndex((prevIndex) => Math.max(0, prevIndex - 1));

    const handleNextSchedule = () =>
        setScheduleIndex((prevIndex) =>
            Math.min(scheduleList.length - 1, prevIndex + 1)
        );


    const handleStatusChange = async (memberId, attendanceId, newStatus) => {
        const scheduleId = currentSchedule.id;
        if (!scheduleId || !attendanceId) return;

 
        const statusMap = { '출석': 'PRESENT', '지각': 'LATE', '결석': 'ABSENT' };
        const backendStatus = statusMap[newStatus];

        setAttendanceList(prevList => prevList.map(m => 
            m.id === memberId ? { ...m, status: newStatus } : m
        ));

        try {
            await axios.patch(
                `${API_BASE_URL}/groups/${currentGroupId}/schedules/${scheduleId}/attendances/${attendanceId}`,
                { status: backendStatus }, 
                { headers: { Authorization: ACCESS_TOKEN } }
            );
            
            console.log(`출석 상태 업데이트 성공: ${memberId} -> ${newStatus}`);
            
            fetchScheduleAttendance(scheduleId); 

        } catch (error) {
            console.error(`출석 상태 수정 실패:`, error.response || error);
            alert(`출석 상태 업데이트에 실패했습니다. (${error.response?.status || "네트워크 오류"})`);
            
            fetchScheduleAttendance(scheduleId); 
        }
    };


    // 관리자 뷰
    const adminView = (
        <div className="admin-attendance-view">
            {isLoading && <div className="loading-text">일정 정보 로딩 중...</div>}
            
            <div className="date-nav-header">
                <button onClick={handlePrevSchedule} disabled={scheduleIndex === 0}>
                    &lt;
                </button>
                <div className="date-display">
                    <h4>{currentSchedule.title}</h4>
                    <span>{currentSchedule.endAt ? currentSchedule.endAt.split('T')[0] : '날짜 미정'}</span>
                </div>
                <button
                    onClick={handleNextSchedule}
                    disabled={scheduleIndex === scheduleList.length - 1}
                >
                    &gt;
                </button>
            </div>

            <div className="member-attendance-list">
                {attendanceList.length === 0 && scheduleList.length > 0 && !isLoading ? (
                    <div className="empty-state">출석 대상 멤버가 없거나 로딩 중입니다.</div>
                ) : (
                    attendanceList.map((member) => (
                        <div key={member.id} className="member-row">
                            <span>{member.name}</span>
                            <select
                                className="status-select"
                                value={member.status}
                                onChange={(e) => 
                                    handleStatusChange(
                                        member.id, 
                                        member.attendanceId,
                                        e.target.value
                                    )
                                }
                            >
                                <option value="" disabled>선택</option>
                                <option>출석</option>
                                <option>결석</option>
                                <option>지각</option>
                            </select>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    // 일반 사용자 뷰
    const userView = (
        <div className="attendance-container">
            <h4>출석현황</h4>
            <div className="chart-container">
                <div className="pie-chart" style={{ "--p": attendanceRate }}>
                    {attendanceRate}%<span>출석했어요!</span>
                </div>
            </div>
            <div className="attendance-summary">
                <div className="summary-item present">
                    <span className="label">출석</span>
                    <span className="count">{userAttendanceSummary.attend}</span>
                </div>
                <div className="summary-item absent">
                    <span className="label">결석</span>
                    <span className="count">{userAttendanceSummary.absent}</span>
                </div>
                 <div className="summary-item late">
                    <span className="label">지각</span>
                    <span className="count">{userAttendanceSummary.late}</span>
                </div>
            </div>
            <button className="details-link">자세히 보기 &gt;</button>
        </div>
    );

    return (
        <GroupDetailLayout groupName="스트리트 푸드 파이터">
            {isAdmin ? adminView : userView}
        </GroupDetailLayout>
    );
}

export default GroupAttendancePage;