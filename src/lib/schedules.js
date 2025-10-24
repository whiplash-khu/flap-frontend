import { api } from "./api";

export function createSchedule(groupId, payload) {
  return api.post(`/groups/${groupId}/schedules`, payload);
}

export const deleteSchedule = (groupId, scheduleId) =>
  api.delete(`/groups/${groupId}/schedules/${scheduleId}`);